'use client'

import { useState, useMemo } from 'react'
import type { Product, ProductVariant, ShopifyImage } from '@/types/shopify'
import { getFirstAvailableVariant, findVariantByOptions } from '@/lib/utils'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'

interface ProductViewProps {
  product:              Product
  initialSearchParams?: Record<string, string>
}

export function ProductView({ product, initialSearchParams }: ProductViewProps) {
  const defaultVariant = getFirstAvailableVariant(product)

  // Estado compartido entre galería y selector.
  // Si vienen searchParams (e.g. ?Color=Zennela™%20ZenCross), arranca en esa variante.
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (initialSearchParams && Object.keys(initialSearchParams).length > 0) {
      const fromUrl: Record<string, string> = Object.fromEntries(
        (defaultVariant?.selectedOptions ?? []).map((o) => [
          o.name,
          initialSearchParams[o.name] ?? o.value,
        ])
      )
      if (findVariantByOptions(product, fromUrl)) return fromUrl
    }
    return Object.fromEntries(
      defaultVariant?.selectedOptions.map((o) => [o.name, o.value]) ?? []
    )
  })

  const selectedVariant: ProductVariant | undefined = useMemo(
    () => findVariantByOptions(product, selectedOptions) ?? defaultVariant,
    [product, selectedOptions, defaultVariant]
  )

  // Solo muestra la imagen de la variante seleccionada
  const galleryImages = useMemo((): ShopifyImage[] => {
    const variantImg = selectedVariant?.image ?? null
    if (!variantImg) return product.images.slice(0, 1)
    return [variantImg]
  }, [selectedVariant, product.images])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Galería — siempre muestra la imagen de la variante activa */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery
          images={galleryImages}
          title={product.title}
        />
      </div>

      {/* Info con selector de variantes */}
      <div>
        <ProductInfo
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  )
}
