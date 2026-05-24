import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProduct, getFeaturedProducts } from '@/lib/shopify'
import { ProductView } from '@/components/product/ProductView'
import { ProductCard } from '@/components/product/ProductCard'

export const revalidate = 3600

interface Props {
  params:       Promise<{ handle: string }>
  searchParams: Promise<Record<string, string>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Producto no encontrado' }

  const image = product.images[0]
  return {
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.altText ?? product.title }]
        : [],
    },
  }
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = await params
  const initialSearchParams = await searchParams
  const [product, related] = await Promise.all([
    getProduct(handle),
    getFeaturedProducts(4),
  ])

  if (!product) notFound()

  const relatedProducts = related.filter((p) => p.handle !== handle).slice(0, 4)

  return (
    <div className="py-8 lg:py-12">
      <div className="container-zen">

        {/* Galería + Info con estado compartido */}
        <ProductView product={product} initialSearchParams={initialSearchParams} />

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-zen-200">
            <h2 className="text-2xl font-bold text-zen-900 mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
