import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/data/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group p-6 transition hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 flex items-center justify-between">
        <span className="badge">{product.category}</span>
        <span className={product.status === 'Featured' ? 'text-xs font-semibold text-glow' : 'text-xs text-white/50'}>{product.status}</span>
      </div>
      <div className="mb-5 aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[.03] to-glow/10 p-5">
        <div className="h-full rounded-xl border border-white/10 bg-ink/70 p-4">
          <div className="mb-4 h-2 w-24 rounded bg-glow/70" />
          <div className="grid grid-cols-3 gap-2"><div className="h-12 rounded bg-white/5"/><div className="h-12 rounded bg-white/5"/><div className="h-12 rounded bg-white/5"/></div>
          <div className="mt-3 h-16 rounded bg-white/5" />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="mt-3 min-h-20 text-sm leading-6 text-white/60">{product.summary}</p>
      <Link href={`/products/${product.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-glow">View Product <ArrowUpRight size={16}/></Link>
    </article>
  )
}
