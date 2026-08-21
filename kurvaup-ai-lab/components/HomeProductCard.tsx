import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Product } from '@/data/products'

export function HomeProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl border bg-panel/80 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-glow/30 ${featured ? 'border-glow/20 shadow-glow' : 'border-line'}`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-glow/10 blur-3xl transition group-hover:bg-glow/20" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span className="badge">{product.category}</span>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${product.status === 'Featured' ? 'text-glow' : 'text-white/45'}`}>
            {product.status === 'Featured' && <Sparkles size={13} />}
            {product.status}
          </span>
        </div>

        <div className="mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#101d30] via-[#0b1524] to-[#10272b] p-4">
          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#07111f]/90 p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2 w-20 rounded-full bg-glow/70" />
                <div className="mt-2 h-1.5 w-12 rounded-full bg-white/10" />
              </div>
              <div className="h-6 w-12 rounded-lg border border-glow/20 bg-glow/10" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => <div key={i} className="rounded-lg border border-white/5 bg-white/[.035] p-2"><div className="h-1.5 w-8 rounded bg-white/15" /><div className="mt-2 h-4 w-10 rounded bg-white/8" /></div>)}
            </div>
            <div className="mt-3 flex flex-1 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[.025] p-3">
              {[32, 54, 42, 68, 58, 79, 72, 88, 82].map((h, i) => <div key={i} className="flex-1 rounded-t-sm bg-glow/20" style={{ height: `${h}%` }} />)}
            </div>
          </div>
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-white/55">{product.summary}</p>
        <div className="mt-5 flex items-center justify-between">
          <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-glow">
            View Product <ArrowUpRight size={16} />
          </Link>
          <span className="text-xs text-white/25">Early Access</span>
        </div>
      </div>
    </article>
  )
}
