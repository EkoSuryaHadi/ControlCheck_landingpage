'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import type { Product } from '@/data/products'
import { trackEvent } from '@/lib/analytics'
import { getProductMedia } from '@/data/productMedia'

function statusLabel(status: Product['status']) {
  if (status === 'Featured') return 'Live Beta'
  if (status === 'Beta') return 'Beta Access'
  return 'Coming Soon'
}

function ProductPreview({ product }: { product: Product }) {
  const media = getProductMedia(product.slug)

  if (media.screenshot) {
    return (
      <div className="relative overflow-hidden rounded-[28px] border border-glow/18 bg-gradient-to-br from-[#0c1929] via-[#081522] to-[#0d2527] p-3 shadow-[0_35px_100px_rgba(0,0,0,.42)] md:p-4">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-glow/10 blur-[70px]" />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]/95">
          <img src={media.screenshot} alt={`${product.name} application screenshot`} className="block h-auto w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111f]/25 via-transparent to-transparent" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-glow/18 bg-gradient-to-br from-[#0c1929] via-[#081522] to-[#0d2527] p-4 shadow-[0_35px_100px_rgba(0,0,0,.42)] md:p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-glow/10 blur-[70px]" />
      <div className="relative rounded-2xl border border-white/8 bg-[#07111f]/95 p-4 md:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-white/7 pb-4">
          <div>
            <div className="h-2 w-24 rounded-full bg-glow/70" />
            <div className="mt-2 h-1.5 w-16 rounded-full bg-white/10" />
          </div>
          <span className="rounded-lg border border-glow/15 bg-glow/[.08] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-glow">AI INSIGHT</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[['HEALTH','86%'],['SIGNALS','34'],['ALERTS','12']].map(([label,value]) => (
            <div key={label} className="rounded-xl border border-white/6 bg-white/[.03] p-3">
              <p className="text-[9px] tracking-wider text-white/28">{label}</p>
              <p className="mt-2 text-lg font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-white/6 bg-white/[.025] p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] uppercase tracking-wider text-white/30">Performance trend</p><p className="mt-1 text-sm font-medium">{product.name}</p></div>
            <span className="text-[10px] text-glow">Live signal</span>
          </div>
          <div className="mt-5 flex h-40 items-end gap-2">
            {[31,48,42,62,55,72,67,81,76,89,84,94].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-sm border-t border-glow/20 bg-gradient-to-t from-glow/[.04] to-glow/25" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <div className="rounded-xl border border-white/6 bg-white/[.025] p-3"><div className="h-1.5 w-28 rounded bg-white/10"/><div className="mt-3 h-1.5 w-4/5 rounded bg-white/5"/><div className="mt-2 h-1.5 w-3/5 rounded bg-white/5"/></div>
          <div className="flex w-24 items-center justify-center rounded-xl border border-glow/10 bg-glow/[.06] text-glow"><BarChart3 size={24}/></div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  useEffect(() => {
    trackEvent('product_view', { product: product.slug, path: `/products/${product.slug}` })
  }, [product.slug])

  function handleTryFree() {
    trackEvent('try_free_click', { product: product.slug, path: `/products/${product.slug}` })
  }

  const media = getProductMedia(product.slug)
  const resolvedAppUrl = media.demoUrl || product.appUrl
  const appIsReady = Boolean(resolvedAppUrl && resolvedAppUrl !== '#')

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/5">
        <div className="pointer-events-none absolute left-[8%] top-12 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-[10%] top-12 h-72 w-72 rounded-full bg-glow/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-10 lg:pb-20 lg:pt-14">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"><ArrowLeft size={16}/> Back to products</Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge">{product.category}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-glow/15 bg-glow/[.06] px-3 py-1 text-xs font-semibold text-glow"><CircleDot size={12}/>{statusLabel(product.status)}</span>
              </div>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-.045em] md:text-6xl">{product.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">{product.summary}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {appIsReady ? (
                  <a href={resolvedAppUrl} target="_blank" rel="noreferrer" onClick={handleTryFree} className="btn-primary gap-2">Try Free <ArrowUpRight size={17}/></a>
                ) : (
                  <button type="button" onClick={handleTryFree} className="btn-primary gap-2 opacity-80">Early Access <Sparkles size={16}/></button>
                )}
                <Link href={`/feedback?product=${product.slug}`} className="btn-secondary gap-2">Give Feedback <MessageSquare size={16}/></Link>
              </div>

              <div className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/8 bg-white/[.025] px-2 py-4">
                <div className="px-4"><ShieldCheck size={17} className="text-glow"/><p className="mt-2 text-xs text-white/35">Validation stage</p></div>
                <div className="px-4"><Users size={17} className="text-glow"/><p className="mt-2 text-xs text-white/35">Built for professionals</p></div>
                <div className="px-4"><Zap size={17} className="text-glow"/><p className="mt-2 text-xs text-white/35">Practical AI workflow</p></div>
              </div>
            </div>

            <ProductPreview product={product}/>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/7 bg-white/[.02] p-7 md:p-8">
            <p className="text-xs font-semibold tracking-[.2em] text-glow">THE PROBLEM</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Why this product exists.</h2>
            <p className="mt-5 text-base leading-8 text-white/55">{product.problem}</p>
          </div>

          <div className="rounded-3xl border border-glow/12 bg-gradient-to-br from-glow/[.05] to-white/[.015] p-7 md:p-8">
            <p className="text-xs font-semibold tracking-[.2em] text-glow">THE APPROACH</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Turn fragmented work into actionable signals.</h2>
            <p className="mt-5 text-base leading-8 text-white/55">{product.name} is designed to reduce manual checking, surface important patterns earlier, and help professionals move from raw project information to clearer decisions.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[.012]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold tracking-[.2em] text-glow">KEY CAPABILITIES</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">Built around the work that matters.</h2>
              <p className="mt-4 leading-7 text-white/48">Focused capabilities, not AI for the sake of AI. Each feature is intended to support a real professional workflow.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <div key={feature} className="rounded-2xl border border-white/7 bg-white/[.025] p-5 transition hover:border-glow/20">
                  <div className="flex items-center justify-between"><span className="text-sm font-semibold text-glow">0{index + 1}</span><CheckCircle2 size={17} className="text-white/20"/></div>
                  <h3 className="mt-7 text-lg font-semibold">{feature}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/40">Designed to make review, analysis and decision-making faster and more consistent.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/7 bg-white/[.02] p-7">
            <Users className="text-glow"/>
            <p className="mt-6 text-xs font-semibold tracking-[.2em] text-glow">WHO IT'S FOR</p>
            <div className="mt-5 flex flex-wrap gap-3">{product.users.map((user) => <span key={user} className="rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-sm text-white/65">{user}</span>)}</div>
          </div>

          <div className="rounded-3xl border border-white/7 bg-white/[.02] p-7">
            <Workflow className="text-glow"/>
            <p className="mt-6 text-xs font-semibold tracking-[.2em] text-glow">VALIDATION MODEL</p>
            <div className="mt-5 space-y-4">{[['Try the product','Use it in a real workflow.'],['Share feedback','Tell us what creates value and what is missing.'],['We measure usage','Adoption, engagement and retention guide the roadmap.']].map(([title,body],index)=><div key={title} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-glow/15 bg-glow/[.06] text-xs font-semibold text-glow">{index + 1}</span><div><p className="font-medium">{title}</p><p className="mt-1 text-sm leading-6 text-white/40">{body}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/5 bg-white/[.012]">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold tracking-[.2em] text-glow">RELATED PRODUCTS</p><h2 className="mt-3 text-3xl font-semibold">Explore more from the lab.</h2></div><Link href="/products" className="hidden items-center gap-2 text-sm text-glow sm:inline-flex">All products <ArrowRight size={16}/></Link></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">{related.map((item)=><Link key={item.slug} href={`/products/${item.slug}`} className="group rounded-2xl border border-white/7 bg-white/[.02] p-5 transition hover:border-glow/20"><div className="flex items-center justify-between"><span className="badge">{item.category}</span><ChevronRight size={17} className="text-white/25 transition group-hover:translate-x-1 group-hover:text-glow"/></div><h3 className="mt-5 text-xl font-semibold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-white/45">{item.summary}</p></Link>)}</div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[30px] border border-glow/15 bg-gradient-to-br from-[#0d1b2b] via-[#091522] to-[#0c2526] p-8 md:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-glow/10 blur-[80px]"/>
          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div><p className="text-xs font-semibold tracking-[.2em] text-glow">EARLY ACCESS</p><h2 className="mt-3 text-3xl font-semibold">Help shape {product.name}.</h2><p className="mt-3 max-w-2xl leading-7 text-white/48">Try the product, use it against a real problem, and tell us where it should go next.</p></div>
            <div className="flex shrink-0 flex-wrap gap-3">{appIsReady ? <a href={resolvedAppUrl} target="_blank" rel="noreferrer" onClick={handleTryFree} className="btn-primary gap-2">Try Free <ArrowUpRight size={16}/></a> : <Link href={`/feedback?product=${product.slug}`} className="btn-primary gap-2">Join Early Access <ArrowRight size={16}/></Link>}<Link href={`/feedback?product=${product.slug}`} className="btn-secondary">Give Feedback</Link></div>
          </div>
        </div>
      </section>
    </main>
  )
}
