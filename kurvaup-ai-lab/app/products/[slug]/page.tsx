import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import { ProductDetailClient } from '@/components/ProductDetailClient'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug)
  if (!product) notFound()

  const related = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 2)

  return <ProductDetailClient product={product} related={related} />
}
