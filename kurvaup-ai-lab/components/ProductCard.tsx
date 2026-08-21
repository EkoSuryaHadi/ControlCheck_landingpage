import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Product } from '@/data/products'

export function ProductCard({ product }: { product: Product }) {
  const isFeatured = product.status === 'Featured'

  return (
    <article className="card group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-glow/30 hover:shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-glow/[.05] via-transparent to-blue-500/[.04] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="badge">{product.category}</span>
          <span className={isFeatured ? 'inline-flex items-center gap-1 text-xs font-semibold text-glow' : 'text-xs text-white/45'}>
            {isFeatured && <Sparkles size={13} />}
            {product.status}
          </span>
        </div>

        <div className="mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.08] via-white/[.025] to-glow/[.08] p-4">
          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink/80 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2 w-20 rounded-full bg-glow/70" />
                <div className="mt-2 h-1.5 w-12 rounded-full bg-white/10" />
              </div>
              <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/[.04]" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-white/5 bg-white/[.035] p-2">
                  <div className="h-1.5 w-8 rounded bg-white/10" />
                  <div className="mt-2 h-3 w-12 rounded bg-white/15" />
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-1 items-end gap-1.5 rounded-xl border border-white/5 bg-white/[.02] p-3">
              {[32, 50, 42, 67, 58, 80, 72, 90].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-glow/20" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/55">{product.summary}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-xs text-white/30">Explore product</span>
          <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-glow transition group-hover:gap-3">
            View Product <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
