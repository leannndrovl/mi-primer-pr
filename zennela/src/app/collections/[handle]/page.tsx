import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCollection, getProducts } from '@/lib/shopify'
import { ProductCard } from '@/components/product/ProductCard'
import { VariantCard } from '@/components/product/VariantCard'
import type { Product } from '@/types/shopify'

export const revalidate = 3600

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  if (handle === 'all') {
    return { title: 'Tienda — Todos los productos', description: 'Descubre toda la colección de llaveros click premium de Zennela.' }
  }
  const collection = await getCollection(handle)
  if (!collection) return { title: 'Colección no encontrada' }

  return {
    title: collection.title,
    description: collection.description || `Explora la colección ${collection.title} de Zennela.`,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params

  let title = 'Toda la colección'
  let description = 'Descubre todos nuestros llaveros click premium'
  let products: Product[] = []

  if (handle === 'all') {
    products = await getProducts({ first: 24 })
  } else {
    const collection = await getCollection(handle)
    if (!collection) notFound()
    title = collection.title
    description = collection.description
    products = collection.products
  }

  // Si solo hay 1 producto con múltiples variantes, mostramos una tarjeta por variante
  const mainProduct = products.length === 1 && products[0].variants.length > 1
    ? products[0]
    : null
  const useVariants = !!mainProduct
  const variants = mainProduct?.variants.slice(0, 4) ?? []
  const itemCount = useVariants ? variants.length : products.length

  return (
    <div className="py-8 lg:py-12">
      <div className="container-zen">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-zen-900">{title}</h1>
          {description && (
            <p className="mt-2 text-zen-500 max-w-2xl">{description}</p>
          )}
          <p className="mt-3 text-sm text-zen-400">
            {itemCount} {useVariants ? 'modelos disponibles' : `producto${itemCount !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Grid */}
        {itemCount > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {useVariants
              ? variants.map((variant, i) => (
                  <VariantCard
                    key={variant.id}
                    product={mainProduct!}
                    variant={variant}
                    index={i}
                    priority={i < 2}
                  />
                ))
              : products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={i < 4}
                  />
                ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-medium text-zen-600">No hay productos en esta colección</p>
            <p className="mt-2 text-sm text-zen-400">Vuelve pronto, estamos añadiendo novedades.</p>
          </div>
        )}
      </div>
    </div>
  )
}
