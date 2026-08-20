import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
export default function ProductsPage(){return <main className="mx-auto max-w-7xl px-6 py-16"><p className="text-sm font-semibold text-glow">PRODUCT CATALOG</p><h1 className="mt-2 text-5xl font-semibold">Explore AI Products</h1><p className="mt-4 max-w-2xl text-white/55">Practical tools currently being tested with real-world users.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div></main>}
