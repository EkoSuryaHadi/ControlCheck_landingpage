import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { products } from '@/data/products'
import { LogoutButton } from '@/components/LogoutButton'

export const dynamic = 'force-dynamic'

type AnalyticsEvent = {
  event_name: string
  product_slug: string | null
  visitor_id: string | null
  session_id: string | null
  created_at: string
}

type FeedbackRow = {
  id: string
  product_slug: string | null
  name: string | null
  rating: number | null
  message: string
  created_at: string
}

function pct(n: number, d: number) {
  return d ? Math.round((n / d) * 100) : 0
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function shortDate(key: string) {
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' }).format(new Date(`${key}T00:00:00Z`))
}

function signalFor(score: number) {
  if (score >= 75) return { label: 'Monetization candidate', tone: 'positive' }
  if (score >= 50) return { label: 'Continue validation', tone: 'neutral' }
  return { label: 'Review positioning', tone: 'warning' }
}

function TrendChart({ data }: { data: Array<{ label: string; value: number }> }) {
  const width = 760
  const height = 220
  const padX = 16
  const padY = 18
  const max = Math.max(1, ...data.map((d) => d.value))
  const points = data.map((d, i) => {
    const x = data.length === 1 ? width / 2 : padX + (i / (data.length - 1)) * (width - padX * 2)
    const y = height - padY - (d.value / max) * (height - padY * 2)
    return { ...d, x, y }
  })
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = points.length ? `${path} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z` : ''

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full" role="img" aria-label="Daily usage trend">
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(57 214 200)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="rgb(57 214 200)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={padX} y1={height - padY - f * (height - padY * 2)} x2={width - padX} y2={height - padY - f * (height - padY * 2)} stroke="rgba(255,255,255,.08)" strokeWidth="1" />
        ))}
        {area && <path d={area} fill="url(#trend-fill)" />}
        {path && <path d={path} fill="none" stroke="rgb(57 214 200)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
        {points.map((p) => <circle key={p.label} cx={p.x} cy={p.y} r="3.5" fill="#07111f" stroke="rgb(57 214 200)" strokeWidth="2" />)}
      </svg>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-white/35">
        {data.filter((_, i) => i % 2 === 0).slice(0, 7).map((d) => <span key={d.label}>{d.label}</span>)}
      </div>
    </div>
  )
}

export default async function AdminDashboard() {
  const auth = createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user) redirect('/login')

  const allowed = (process.env.ADMIN_EMAILS || '').split(',').map((v) => v.trim().toLowerCase()).filter(Boolean)
  if (allowed.length && !allowed.includes((user.email || '').toLowerCase())) redirect('/')

  const db = createAdminClient()
  const now = new Date()
  const since30 = new Date(now.getTime() - 30 * 86400000)
  const since14 = new Date(now.getTime() - 13 * 86400000)
  const since7 = new Date(now.getTime() - 7 * 86400000)
  const sincePrevious7 = new Date(now.getTime() - 14 * 86400000)

  const eventResult = db
    ? await db.from('analytics_events').select('event_name,product_slug,visitor_id,session_id,created_at').gte('created_at', since30.toISOString()).order('created_at', { ascending: true }).limit(20000)
    : { data: [] as AnalyticsEvent[] }

  const feedbackResult = db
    ? await db.from('feedback').select('id,product_slug,name,rating,message,created_at').order('created_at', { ascending: false }).limit(8)
    : { data: [] as FeedbackRow[] }

  const feedbackCountResult = db
    ? await db.from('feedback').select('*', { count: 'exact', head: true }).gte('created_at', since30.toISOString())
    : { count: 0 }

  const events = (eventResult.data ?? []) as AnalyticsEvent[]
  const recentFeedback = (feedbackResult.data ?? []) as FeedbackRow[]
  const feedbackCount = feedbackCountResult.count ?? 0

  const visitors = new Set(events.map((e) => e.visitor_id).filter(Boolean)).size
  const sessions = new Set(events.map((e) => e.session_id).filter(Boolean)).size
  const pageViews = events.filter((e) => e.event_name === 'page_view').length
  const productViews = events.filter((e) => e.event_name === 'product_view').length
  const tryClicks = events.filter((e) => e.event_name === 'try_free_click').length
  const conversion = pct(tryClicks, productViews)

  const sessionsByVisitor = new Map<string, Set<string>>()
  for (const event of events) {
    if (!event.visitor_id || !event.session_id) continue
    if (!sessionsByVisitor.has(event.visitor_id)) sessionsByVisitor.set(event.visitor_id, new Set())
    sessionsByVisitor.get(event.visitor_id)?.add(event.session_id)
  }
  const returningUsers = [...sessionsByVisitor.values()].filter((set) => set.size > 1).length
  const retentionRate = pct(returningUsers, Math.max(1, sessionsByVisitor.size))

  const dailyData = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(since14.getTime() + index * 86400000)
    const key = dateKey(date)
    const value = events.filter((e) => dateKey(new Date(e.created_at)) === key && ['page_view', 'product_view', 'try_free_click'].includes(e.event_name)).length
    return { key, label: shortDate(key), value }
  })

  const current7Events = events.filter((e) => new Date(e.created_at) >= since7).length
  const previous7Events = events.filter((e) => {
    const date = new Date(e.created_at)
    return date >= sincePrevious7 && date < since7
  }).length
  const growthRate = previous7Events ? Math.round(((current7Events - previous7Events) / previous7Events) * 100) : current7Events ? 100 : 0

  const ranking = products.map((product) => {
    const pe = events.filter((e) => e.product_slug === product.slug)
    const views = pe.filter((e) => e.event_name === 'product_view').length
    const tries = pe.filter((e) => e.event_name === 'try_free_click').length
    const uniqueVisitors = new Set(pe.map((e) => e.visitor_id).filter(Boolean)).size
    const productSessionsByVisitor = new Map<string, Set<string>>()
    pe.forEach((e) => {
      if (!e.visitor_id || !e.session_id) return
      if (!productSessionsByVisitor.has(e.visitor_id)) productSessionsByVisitor.set(e.visitor_id, new Set())
      productSessionsByVisitor.get(e.visitor_id)?.add(e.session_id)
    })
    const returning = [...productSessionsByVisitor.values()].filter((set) => set.size > 1).length
    const productRetention = pct(returning, Math.max(1, productSessionsByVisitor.size))

    const productFeedback = recentFeedback.filter((f) => f.product_slug === product.slug && f.rating)
    const avgRating = productFeedback.length ? productFeedback.reduce((sum, f) => sum + (f.rating ?? 0), 0) / productFeedback.length : 0
    const feedbackQuality = productFeedback.length ? (avgRating / 5) * 100 : 50

    const current = pe.filter((e) => new Date(e.created_at) >= since7).length
    const previous = pe.filter((e) => {
      const date = new Date(e.created_at)
      return date >= sincePrevious7 && date < since7
    }).length
    const productGrowth = previous ? clamp(50 + ((current - previous) / previous) * 50) : current ? 70 : 50

    const adoption = clamp(uniqueVisitors * 4)
    const engagement = clamp(pct(tries, views))
    const retentionScore = productSessionsByVisitor.size ? productRetention : 50
    const pvs = Math.round(adoption * 0.30 + engagement * 0.25 + retentionScore * 0.20 + feedbackQuality * 0.15 + productGrowth * 0.10)

    return {
      product,
      views,
      tries,
      uniqueVisitors,
      conversion: pct(tries, views),
      retention: productRetention,
      pvs,
      signal: signalFor(pvs),
    }
  }).sort((a, b) => b.pvs - a.pvs)

  const bestProduct = ranking[0]
  const funnel = [
    { label: 'Site Views', value: pageViews || productViews },
    { label: 'Product Views', value: productViews },
    { label: 'Try Free', value: tryClicks },
  ]
  const funnelMax = Math.max(1, ...funnel.map((f) => f.value))

  const kpis = [
    { label: 'Unique Users', value: visitors, sub: `${returningUsers} returning` },
    { label: 'Sessions', value: sessions, sub: `${retentionRate}% retention` },
    { label: 'Product Views', value: productViews, sub: `${pageViews} page views` },
    { label: 'Try Free', value: tryClicks, sub: `${conversion}% conversion` },
    { label: 'Feedback', value: feedbackCount, sub: 'last 30 days' },
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-glow shadow-[0_0_18px_rgba(57,214,200,.85)]"/><p className="text-xs font-semibold tracking-[.24em] text-glow">ADMIN ANALYTICS · V2</p></div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight lg:text-5xl">Product Validation Dashboard</h1>
          <p className="mt-2 text-white/50">Last 30 days · {user.email}</p>
        </div>
        <div className="flex gap-3"><a href="/" className="btn-secondary">View Site</a><LogoutButton/></div>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <div className="card p-5" key={kpi.label}>
            <p className="text-xs uppercase tracking-[.16em] text-white/40">{kpi.label}</p>
            <p className="mt-2 text-3xl font-semibold">{kpi.value.toLocaleString()}</p>
            <p className="mt-2 text-xs text-white/35">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_.85fr]">
        <div className="card p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="text-xs uppercase tracking-[.16em] text-white/35">Usage trend</p><h2 className="mt-1 text-xl font-semibold">Daily engagement</h2></div>
            <div className="rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-right"><p className="text-xs text-white/35">7-day growth</p><p className={`text-sm font-semibold ${growthRate >= 0 ? 'text-glow' : 'text-orange-300'}`}>{growthRate >= 0 ? '+' : ''}{growthRate}%</p></div>
          </div>
          <div className="mt-5"><TrendChart data={dailyData.map((d) => ({ label: d.label, value: d.value }))}/></div>
        </div>

        <div className="card p-5 lg:p-6">
          <p className="text-xs uppercase tracking-[.16em] text-white/35">Validation signal</p>
          <h2 className="mt-1 text-xl font-semibold">Leading product</h2>
          {bestProduct ? (
            <div className="mt-6">
              <div className="flex items-end justify-between gap-4"><div><p className="text-lg font-semibold">{bestProduct.product.name}</p><p className="mt-1 text-sm text-white/40">{bestProduct.signal.label}</p></div><p className="text-4xl font-semibold text-glow">{bestProduct.pvs}<span className="text-lg text-white/25">/100</span></p></div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-glow" style={{ width: `${bestProduct.pvs}%` }}/></div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-xl bg-white/[.03] p-3"><p className="text-lg font-semibold">{bestProduct.uniqueVisitors}</p><p className="text-[10px] uppercase tracking-wider text-white/35">Users</p></div><div className="rounded-xl bg-white/[.03] p-3"><p className="text-lg font-semibold">{bestProduct.conversion}%</p><p className="text-[10px] uppercase tracking-wider text-white/35">Conversion</p></div><div className="rounded-xl bg-white/[.03] p-3"><p className="text-lg font-semibold">{bestProduct.retention}%</p><p className="text-[10px] uppercase tracking-wider text-white/35">Retention</p></div></div>
            </div>
          ) : <p className="mt-6 text-white/40">No product data yet.</p>}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-5 lg:p-6">
          <div><p className="text-xs uppercase tracking-[.16em] text-white/35">Conversion funnel</p><h2 className="mt-1 text-xl font-semibold">Discover → Evaluate → Try</h2></div>
          <div className="mt-6 space-y-5">
            {funnel.map((step, index) => (
              <div key={step.label}>
                <div className="mb-2 flex items-center justify-between text-sm"><span className="text-white/65">{index + 1}. {step.label}</span><span className="font-semibold">{step.value.toLocaleString()}</span></div>
                <div className="h-9 overflow-hidden rounded-xl bg-white/[.045]"><div className="flex h-full items-center rounded-xl border border-glow/10 bg-glow/15 px-3 text-xs font-medium text-glow" style={{ width: `${Math.max(step.value ? 18 : 0, (step.value / funnelMax) * 100)}%` }}>{index > 0 && funnel[index - 1].value ? `${pct(step.value, funnel[index - 1].value)}%` : ''}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 lg:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.16em] text-white/35">Voice of user</p><h2 className="mt-1 text-xl font-semibold">Latest feedback</h2></div><a href="/feedback" className="text-sm text-glow hover:underline">Open form</a></div>
          <div className="mt-5 space-y-3">
            {recentFeedback.length ? recentFeedback.slice(0, 5).map((feedback) => {
              const product = products.find((p) => p.slug === feedback.product_slug)
              return <div key={feedback.id} className="rounded-2xl border border-white/5 bg-white/[.025] p-4"><div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold text-glow">{product?.name || 'General feedback'}</p><span className="text-xs text-white/30">{feedback.rating ? `${feedback.rating}/5` : 'No rating'}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{feedback.message}</p><p className="mt-2 text-[11px] text-white/30">{feedback.name || 'Anonymous'} · {new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' }).format(new Date(feedback.created_at))}</p></div>
            }) : <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/35">No feedback has been submitted yet.</div>}
          </div>
        </div>
      </section>

      <section className="card mt-6 overflow-hidden">
        <div className="border-b border-white/10 p-5 lg:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-[.16em] text-white/35">Product portfolio</p><h2 className="mt-1 text-xl font-semibold">Performance & Product Validation Score</h2></div><p className="max-w-xl text-xs leading-5 text-white/35">PVS v2: 30% adoption · 25% Try Free conversion · 20% retention · 15% feedback rating · 10% 7-day growth.</p></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-white/[.015] text-[11px] uppercase tracking-wider text-white/35"><tr><th className="p-4">#</th><th className="p-4">Product</th><th className="p-4">Views</th><th className="p-4">Try Free</th><th className="p-4">Users</th><th className="p-4">Conversion</th><th className="p-4">Retention</th><th className="p-4">PVS</th><th className="p-4">Decision signal</th></tr></thead><tbody>{ranking.map((r, index) => <tr className="border-t border-white/5 transition hover:bg-white/[.02]" key={r.product.slug}><td className="p-4 text-white/25">{String(index + 1).padStart(2, '0')}</td><td className="p-4"><p className="font-medium">{r.product.name}</p><p className="mt-1 text-xs text-white/30">{r.product.category}</p></td><td className="p-4">{r.views}</td><td className="p-4">{r.tries}</td><td className="p-4">{r.uniqueVisitors}</td><td className="p-4">{r.conversion}%</td><td className="p-4">{r.retention}%</td><td className="p-4"><div className="flex items-center gap-3"><span className="min-w-14 font-semibold text-glow">{r.pvs}/100</span><div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-glow" style={{ width: `${r.pvs}%` }}/></div></div></td><td className="p-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${r.signal.tone === 'positive' ? 'border-glow/20 bg-glow/10 text-glow' : r.signal.tone === 'neutral' ? 'border-blue-300/15 bg-blue-300/5 text-blue-200' : 'border-orange-300/15 bg-orange-300/5 text-orange-200'}`}>{r.signal.label}</span></td></tr>)}</tbody></table></div>
      </section>
    </main>
  )
}
