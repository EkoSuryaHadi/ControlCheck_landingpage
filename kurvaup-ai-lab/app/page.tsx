import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  DatabaseZap,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { products } from '@/data/products'
import { HomeProductCard } from '@/components/HomeProductCard'

const categories = [
  { name: 'Project Control', icon: BarChart3, description: 'Planning, monitoring, forecasting and schedule intelligence.' },
  { name: 'Cost Intelligence', icon: BrainCircuit, description: 'EVM, forecasting, cost trends and management insight.' },
  { name: 'QA/QC & Assurance', icon: ShieldCheck, description: 'Inspection, NCR, quality risk and project assurance.' },
  { name: 'Risk Management', icon: CheckCircle2, description: 'Structured risk analysis, scenarios and action signals.' },
  { name: 'Data & Analytics', icon: DatabaseZap, description: 'Turn operational data into decisions and predictions.' },
  { name: 'AI Agents & Automation', icon: Bot, description: 'Automate repetitive professional workflows with AI.' },
]

const process = [
  { no: '01', title: 'Discover', body: 'Find an AI tool that matches a real challenge in your work.' },
  { no: '02', title: 'Try Free', body: 'Use selected products during our early-access validation period.' },
  { no: '03', title: 'Give Feedback', body: 'Tell us what works, what does not, and what you need next.' },
  { no: '04', title: 'We Improve', body: 'Real usage signals guide which products we invest in and scale.' },
]

export default function Home() {
  const featured = products.find((p) => p.slug === 'controlcheck-ai') || products[0]
  const showcase = products.filter((p) => p.slug !== featured?.slug).slice(0, 5)

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/5">
        <div className="pointer-events-none absolute left-[12%] top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="pointer-events-none absolute right-[8%] top-24 h-80 w-80 rounded-full bg-glow/10 blur-[120px]" />

        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-glow/15 bg-glow/[.06] px-3 py-1.5 text-xs font-semibold tracking-[.13em] text-glow">
              <Sparkles size={13} /> KURVAUP AI PRODUCT LAB
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-.045em] md:text-6xl lg:text-7xl">
              AI tools built for <span className="text-glow">real work.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
              Explore practical AI products for project control, engineering, operations, analytics and business. Built early, tested with real users, and improved from real usage.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary gap-2">Explore AI Products <ArrowRight size={18} /></Link>
              <Link href="/submit-idea" className="btn-secondary">Submit a Problem</Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/8 bg-white/[.025] px-2 py-4">
              <div className="px-4"><p className="text-2xl font-semibold">{products.length}</p><p className="mt-1 text-xs text-white/35">Products in lab</p></div>
              <div className="px-4"><p className="text-2xl font-semibold">Free</p><p className="mt-1 text-xs text-white/35">Early access</p></div>
              <div className="px-4"><p className="text-2xl font-semibold">Real</p><p className="mt-1 text-xs text-white/35">Usage validation</p></div>
            </div>
          </div>

          {featured && (
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-8 rounded-full bg-glow/10 blur-[80px]" />
              <div className="relative overflow-hidden rounded-[30px] border border-glow/20 bg-[#0a1523]/95 p-5 shadow-[0_35px_100px_rgba(0,0,0,.45)]">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <div><p className="text-xs uppercase tracking-[.16em] text-white/35">Featured product</p><h2 className="mt-1 text-xl font-semibold">{featured.name}</h2></div>
                  <span className="rounded-full border border-glow/20 bg-glow/10 px-3 py-1 text-xs font-semibold text-glow">LIVE BETA</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[['Project Health','86%'],['Early Signals','34'],['Alerts','12']].map(([label,value]) => <div key={label} className="rounded-xl border border-white/6 bg-white/[.035] p-3"><p className="text-[10px] uppercase tracking-wider text-white/30">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>)}
                </div>

                <div className="mt-3 rounded-2xl border border-white/7 bg-gradient-to-b from-glow/[.075] to-white/[.015] p-4">
                  <div className="flex items-center justify-between"><div><p className="text-xs text-white/35">Project performance signal</p><p className="mt-1 text-sm font-medium">Trend & variance overview</p></div><span className="text-xs text-glow">Updated</span></div>
                  <div className="mt-5 flex h-44 items-end gap-2">
                    {[35,46,41,58,53,69,64,78,72,86,80,93].map((h,i)=><div key={i} className="flex-1 rounded-t-md border-t border-glow/20 bg-gradient-to-t from-glow/5 to-glow/25" style={{height:`${h}%`}} />)}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3"><p className="max-w-sm text-sm leading-6 text-white/48">{featured.summary}</p><Link href={`/products/${featured.slug}`} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-glow">Explore <ChevronRight size={16}/></Link></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-xs font-semibold tracking-[.2em] text-glow">PRODUCT CATALOG</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Explore what we are building.</h2><p className="mt-4 max-w-2xl leading-7 text-white/50">Selected AI products are released early so professionals can test them in real workflows before we decide what to scale.</p></div>
          <Link href="/products" className="btn-secondary gap-2">View all products <ArrowRight size={16}/></Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured && <HomeProductCard product={featured} featured />}
          {showcase.map((product) => <HomeProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <section id="categories" className="border-y border-white/5 bg-white/[.012]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.2em] text-glow">BUILT AROUND WORKFLOWS</p><h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">AI where professionals actually need it.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(({name,icon:Icon,description}) => <div key={name} className="group rounded-2xl border border-white/7 bg-white/[.025] p-5 transition hover:border-glow/20 hover:bg-white/[.04]"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-glow/15 bg-glow/[.07] text-glow"><Icon size={19}/></div><h3 className="mt-5 font-semibold">{name}</h3><p className="mt-2 text-sm leading-6 text-white/42">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28"><p className="text-xs font-semibold tracking-[.2em] text-glow">OUR VALIDATION LOOP</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Build less on assumptions.</h2><p className="mt-4 max-w-lg leading-7 text-white/50">KurvaUp AI Lab treats every product as a measurable experiment. Usage, retention and feedback determine what deserves deeper investment.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {process.map((step) => <div key={step.no} className="rounded-2xl border border-white/7 bg-white/[.02] p-6"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-glow">{step.no}</span><Workflow size={17} className="text-white/20"/></div><h3 className="mt-8 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{step.body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[32px] border border-glow/15 bg-gradient-to-br from-[#0c1928] via-[#0a1422] to-[#0b2526] p-8 md:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-glow/10 blur-[90px]" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div><MessageSquare className="text-glow"/><p className="mt-6 text-xs font-semibold tracking-[.2em] text-glow">BUILD WITH US</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">Have a repetitive task or workflow AI could solve?</h2><p className="mt-4 max-w-2xl leading-7 text-white/50">Tell us the problem. Your challenge could become the next experiment inside KurvaUp AI Lab.</p></div>
            <Link href="/submit-idea" className="btn-primary gap-2">Submit an Idea <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-end">
          <div><p className="text-lg font-semibold">KurvaUp <span className="text-glow">AI Lab</span></p><p className="mt-3 max-w-xl text-sm leading-6 text-white/38">A practical AI product lab focused on building, validating and improving tools for real-world professional work.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/42"><Link href="/products">Products</Link><Link href="/about">About</Link><Link href="/feedback">Feedback</Link><Link href="/submit-idea">Submit Idea</Link></div>
        </div>
        <div className="border-t border-white/5"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/28 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 KurvaUp AI Lab</span><span>Explore · Experiment · Improve</span></div></div>
      </section>
    </main>
  )
}
