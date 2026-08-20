import Link from 'next/link'
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, MessageSquare, Sparkles, Wrench } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

const categories = [
  ['Project Control', BarChart3], ['Cost Intelligence', BrainCircuit], ['QA/QC & Assurance', CheckCircle2],
  ['HSE & Operations', Wrench], ['Data & Analytics', BarChart3], ['AI Agents & Automation', Sparkles]
] as const

export default function Home() {
  const featured = products.slice(0, 6)
  return (
    <main>
      <section className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="badge mb-6">EXPERIMENTAL PRODUCT ECOSYSTEM</span>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-.04em] md:text-7xl">AI Tools Built for <span className="text-glow">Real Work.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Explore practical AI-powered products for projects, engineering, operations, data, and business. Built, tested, and improved with real users.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/products" className="btn-primary">Explore AI Products <ArrowRight size={18}/></Link><Link href="/submit-idea" className="btn-secondary">Submit an Idea</Link></div>
          <div className="mt-10 flex gap-7 text-sm text-white/45"><span>6 products in validation</span><span>Free early access</span><span>Built for professionals</span></div>
        </div>
        <div className="relative">
          <div className="absolute inset-10 rounded-full bg-glow/10 blur-3xl" />
          <div className="card relative p-5 shadow-glow">
            <div className="mb-4 flex items-center justify-between"><div><p className="text-xs text-white/40">Featured Product</p><h3 className="mt-1 text-xl font-semibold">ControlCheck AI</h3></div><span className="badge text-glow">LIVE BETA</span></div>
            <div className="grid grid-cols-3 gap-3"><div className="rounded-xl bg-white/5 p-4"><p className="text-xs text-white/40">Project Health</p><p className="mt-2 text-2xl font-semibold">86%</p></div><div className="rounded-xl bg-white/5 p-4"><p className="text-xs text-white/40">Alerts</p><p className="mt-2 text-2xl font-semibold">12</p></div><div className="rounded-xl bg-white/5 p-4"><p className="text-xs text-white/40">Signals</p><p className="mt-2 text-2xl font-semibold">34</p></div></div>
            <div className="mt-3 h-48 rounded-2xl border border-white/10 bg-gradient-to-b from-glow/10 to-white/[.02] p-5"><div className="flex h-full items-end gap-2">{[30,55,44,68,62,82,76,92].map((h,i)=><div key={i} className="flex-1 rounded-t bg-white/10" style={{height:`${h}%`}} />)}</div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20"><div className="mb-9 flex items-end justify-between"><div><p className="text-sm font-semibold text-glow">PRODUCTS</p><h2 className="mt-2 text-4xl font-semibold tracking-tight">Explore our AI products</h2><p className="mt-3 text-white/55">From project controls and cost intelligence to quality, risk, and automation.</p></div><Link href="/products" className="hidden text-sm font-semibold text-glow md:block">View all products →</Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map(p => <ProductCard key={p.slug} product={p}/>)}</div></section>

      <section id="categories" className="border-y border-white/5 bg-white/[.015]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-sm font-semibold text-glow">CATEGORIES</p><h2 className="mt-2 text-4xl font-semibold">Built around real workflows</h2><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{categories.map(([name,Icon])=><div key={name} className="card flex items-center gap-4 p-5"><div className="rounded-xl bg-glow/10 p-3 text-glow"><Icon size={20}/></div><span className="font-medium">{name}</span></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold text-glow">HOW IT WORKS</p><h2 className="mt-2 text-4xl font-semibold">Try. Use. Tell us what you think.</h2><p className="mt-4 max-w-xl text-white/55">We release selected products early, learn from real usage, and invest further in the products people actually find useful.</p></div><div className="grid gap-4 sm:grid-cols-2">{[['01','Discover'],['02','Try Free'],['03','Give Feedback'],['04','We Improve']].map(([n,t])=><div key={n} className="card p-5"><span className="text-sm text-glow">{n}</span><h3 className="mt-3 text-lg font-semibold">{t}</h3></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 pb-24"><div className="card overflow-hidden p-8 md:p-12"><div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><MessageSquare className="mb-5 text-glow"/><h2 className="text-3xl font-semibold">Have a problem AI could solve?</h2><p className="mt-3 max-w-2xl text-white/55">Tell us about a repetitive task, workflow, reporting problem, or operational challenge. It might become our next experiment.</p></div><Link href="/submit-idea" className="btn-primary">Submit an Idea</Link></div></div></section>

      <footer className="border-t border-white/5"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between"><span>© 2026 KurvaUp AI Lab</span><span>Explore. Experiment. Improve.</span></div></footer>
    </main>
  )
}
