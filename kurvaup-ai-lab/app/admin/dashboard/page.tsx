import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { products } from '@/data/products'
import { LogoutButton } from '@/components/LogoutButton'

export const dynamic = 'force-dynamic'

function pct(n:number,d:number){ return d ? Math.round(n/d*100) : 0 }

export default async function AdminDashboard() {
  const auth = createClient()
  const { data:{ user } } = await auth.auth.getUser()
  if (!user) redirect('/login')
  const allowed = (process.env.ADMIN_EMAILS || '').split(',').map(v=>v.trim().toLowerCase()).filter(Boolean)
  if (allowed.length && !allowed.includes((user.email||'').toLowerCase())) redirect('/')

  const db = createAdminClient()
  const { data:events=[] } = db ? await db.from('analytics_events').select('event_name,product_slug,visitor_id,session_id,created_at').gte('created_at', new Date(Date.now()-30*86400000).toISOString()).limit(10000) : { data:[] as any[] }
  const { count:feedbackCount=0 } = db ? await db.from('feedback').select('*',{count:'exact',head:true}) : { count:0 }

  const visitors = new Set(events.map((e:any)=>e.visitor_id).filter(Boolean)).size
  const sessions = new Set(events.map((e:any)=>e.session_id).filter(Boolean)).size
  const tryClicks = events.filter((e:any)=>e.event_name==='try_free_click').length
  const productViews = events.filter((e:any)=>e.event_name==='product_view').length

  const ranking = products.map(product => {
    const pe = events.filter((e:any)=>e.product_slug===product.slug)
    const views = pe.filter((e:any)=>e.event_name==='product_view').length
    const tries = pe.filter((e:any)=>e.event_name==='try_free_click').length
    const unique = new Set(pe.map((e:any)=>e.visitor_id).filter(Boolean)).size
    const adoption = Math.min(100, unique*4)
    const engagement = Math.min(100, pct(tries,views))
    const pvs = Math.round(adoption*.30 + engagement*.25 + 50*.20 + 50*.15 + 50*.10)
    return { product, views, tries, unique, pvs }
  }).sort((a,b)=>b.pvs-a.pvs)

  return <main className="mx-auto max-w-7xl px-6 py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-glow">ADMIN ANALYTICS</p><h1 className="mt-2 text-4xl font-semibold">Product Validation Dashboard</h1><p className="mt-2 text-white/50">Last 30 days · {user.email}</p></div><div className="flex gap-3"><a href="/" className="btn-secondary">View Site</a><LogoutButton/></div></div>
  <section className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Users',visitors],['Sessions',sessions],['Product Views',productViews],['Try Free Clicks',tryClicks],['Feedback',feedbackCount]].map(([k,v])=><div className="card p-5" key={String(k)}><p className="text-xs uppercase tracking-wider text-white/40">{k}</p><p className="mt-2 text-3xl font-semibold">{v}</p></div>)}</section>
  <section className="card mt-6 overflow-hidden"><div className="border-b border-white/10 p-5"><h2 className="text-xl font-semibold">Product Performance</h2><p className="mt-1 text-sm text-white/45">PVS v1 combines adoption and conversion with neutral baseline values for retention, feedback quality, and growth until enough historical data exists.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="text-white/40"><tr><th className="p-4">Product</th><th className="p-4">Views</th><th className="p-4">Try Free</th><th className="p-4">Users</th><th className="p-4">Conversion</th><th className="p-4">PVS</th><th className="p-4">Signal</th></tr></thead><tbody>{ranking.map(r=><tr className="border-t border-white/5" key={r.product.slug}><td className="p-4 font-medium">{r.product.name}</td><td className="p-4">{r.views}</td><td className="p-4">{r.tries}</td><td className="p-4">{r.unique}</td><td className="p-4">{pct(r.tries,r.views)}%</td><td className="p-4 font-semibold text-glow">{r.pvs}/100</td><td className="p-4 text-white/60">{r.pvs>=75?'Monetization candidate':r.pvs>=50?'Continue validation':'Review positioning'}</td></tr>)}</tbody></table></div></section></main>
}
