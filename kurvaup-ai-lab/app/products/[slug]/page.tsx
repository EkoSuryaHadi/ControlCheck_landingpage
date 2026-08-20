'use client'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { products } from '@/data/products'
import { trackEvent } from '@/lib/analytics'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  useEffect(() => {
    if (product) trackEvent('product_view', { product: product.slug, path: `/products/${product.slug}` })
  }, [product])
  if (!product) return notFound()
  return <main className="mx-auto max-w-6xl px-6 py-16"><span className="badge">{product.category}</span><h1 className="mt-5 text-5xl font-semibold">{product.name}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">{product.summary}</p><div className="mt-8 flex gap-3"><a href={product.appUrl} onClick={()=>trackEvent('try_free_click',{product:product.slug})} className="btn-primary">Try Free</a><a href="/feedback" className="btn-secondary">Give Feedback</a></div><section className="mt-14 grid gap-5 md:grid-cols-3"><div className="card p-6 md:col-span-2"><p className="text-sm text-glow">THE PROBLEM</p><p className="mt-3 text-lg leading-8 text-white/70">{product.problem}</p></div><div className="card p-6"><p className="text-sm text-glow">STATUS</p><p className="mt-3 text-2xl font-semibold">{product.status}</p></div></section><section className="mt-5 grid gap-5 md:grid-cols-2"><div className="card p-6"><h2 className="text-xl font-semibold">Key Features</h2><ul className="mt-4 space-y-3 text-white/60">{product.features.map(f=><li key={f}>• {f}</li>)}</ul></div><div className="card p-6"><h2 className="text-xl font-semibold">Who It's For</h2><ul className="mt-4 space-y-3 text-white/60">{product.users.map(u=><li key={u}>• {u}</li>)}</ul></div></section></main>
}
