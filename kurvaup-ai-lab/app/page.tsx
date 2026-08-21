import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

const categories = [
  ['Project Control', 'Planning, progress, schedule & performance', BarChart3],
  ['Cost Intelligence', 'Forecasting, EVM & financial visibility', BrainCircuit],
  ['QA/QC & Assurance', 'Quality, inspection & assurance intelligence', CheckCircle2],
  ['HSE & Operations', 'Operational visibility & safety intelligence', ShieldCheck],
  ['Data & Analytics', 'Dashboards, prediction & decision support', Wrench],
  ['AI Agents & Automation', 'Automate repetitive professional workflows', Zap],
] as const

const steps = [
  ['01', 'Discover', 'Find an AI product relevant to your workflow.'],
  ['02', 'Try Free', 'Use selected products during early access.'],
  ['03', 'Give Feedback', 'Tell us what works, what does not, and what is missing.'],
  ['04', 'We Improve', 'Usage signals help decide what gets developed further.'],
]

export default function Home() {
  const featured = products.find((p) => p.status === 'Featured') || products[0]
  const showcase = products.slice(0, 6)

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(57,214,200,.12),transparent_25%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,.12),transparent_24%)]" />
        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div>
            <span className="badge mb-6 border-glow/20 bg-glow/[.06] text-glow">KURVAUP AI PRODUCT LAB</span>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.05em] md:text-7xl">
              Practical AI tools for <span className="text-glow">real work.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
              Explore AI-powered products for project control, engineering, operations, analytics, and business workflows—released early, tested with real users, and improved from real usage.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Explore AI Products <ArrowRight size={18} />
              </Link>
              <Link href="/submit-idea" className="btn-secondary">
                Submit a Problem
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/42">
              <span>Free early access</span>
              <span>Built with real-user feedback</span>
              <span>Focused on practical outcomes</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-10 rounded-full bg-glow/10 blur-3xl" />
            <div className="card relative overflow-hidden p-5 shadow-glow md:p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-glow/[.05] via-transparent to-blue-500/[.06]" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[.18em] text-white/35">Featured Product</p>
                    <h3 className="mt-2 text-2xl font-semibold">{featured?.name || 'ControlCheck AI'}</h3>
                  </div>
                  <span className="badge border-glow/20 bg-glow/10 text-glow">LIVE BETA</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/5 bg-white/[.035] p-4">
                    <p className="text-[11px] text-white/35">Project Health</p>
                    <p className="mt-2 text-2xl font-semibold">86%</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[.035] p-4">
                    <p className="text-[11px] text-white/35">Early Signals</p>
                    <p className="mt-2 text-2xl font-semibold">34</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[.035] p-4">
                    <p className="text-[11px] text-white/35">Alerts</p>
                    <p className="mt-2 text-2xl font-semibold">12</p>
                  </div>
                </div>

                <div className="mt-4 h-56 rounded-2xl border border-white/10 bg-gradient-to-b from-glow/[.08] to-white/[.02] p-5">
                  <div className="flex h-full items-end gap-2">
                    {[28, 45, 38, 62, 54, 76, 68, 88, 80, 94].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-glow/20" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                {featured && (
                  <Link href={`/products/${featured.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-glow">
                    Explore {featured.name} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-glow">PRODUCT CATALOG</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Explore what we are building</h2>
            <p className="mt-4 max-w-2xl text-white/52">Selected AI products currently in validation across project, cost, risk, quality, and engineering workflows.</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-glow">View all products →</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {showcase.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </section>

      <section id="categories" className="border-y border-white/5 bg-white/[.012]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-xs font-semibold tracking-[.2em] text-glow">FOCUS AREAS</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Built around real professional workflows</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(([name, description, Icon]) => (
              <div key={name} className="card group p-5 transition hover:border-glow/20">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-glow/10 bg-glow/[.08] p-3 text-glow"><Icon size={20} /></div>
                  <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/42">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-glow">VALIDATION LOOP</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Build less on assumptions.</h2>
            <p className="mt-4 max-w-xl text-white/52">KurvaUp AI Lab releases useful tools early, observes real adoption, listens to users, and invests further in products that create real value.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([number, title, description]) => (
              <div key={number} className="card p-5">
                <span className="text-xs font-semibold tracking-[.18em] text-glow">{number}</span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/42">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="card relative overflow-hidden p-8 md:p-12">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-glow/10 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 inline-flex rounded-xl border border-glow/10 bg-glow/[.07] p-3 text-glow"><MessageSquare size={22} /></div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Have a problem AI could solve?</h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/50">Tell us about a repetitive task, workflow, reporting pain point, or operational challenge. It could become our next product experiment.</p>
            </div>
            <Link href="/submit-idea" className="btn-primary">Submit an Idea <Sparkles size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-white/[.01]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-glow">KURVAUP AI LAB</p>
            <h2 className="mt-3 text-2xl font-semibold">We do not just talk about AI. We build things people can use.</h2>
          </div>
          <div className="text-sm text-white/38">Explore · Experiment · Improve</div>
        </div>
      </section>
    </main>
  )
}
