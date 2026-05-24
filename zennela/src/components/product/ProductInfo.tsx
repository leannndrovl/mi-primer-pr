'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Star, Users } from 'lucide-react'
import type { Product, ProductVariant } from '@/types/shopify'
import {
  formatPrice,
  hasDiscount,
  discountPercent,
  findVariantByOptions,
  isOnlyDefaultVariant,
} from '@/lib/utils'
import { VariantSelector } from './VariantSelector'
import { AddToCart } from './AddToCart'
import { TrustBadges } from './TrustBadges'

interface ProductInfoProps {
  product: Product
  selectedOptions: Record<string, string>
  setSelectedOptions: (fn: (prev: Record<string, string>) => Record<string, string>) => void
  selectedVariant: ProductVariant | undefined
}

export function ProductInfo({
  product,
  selectedOptions,
  setSelectedOptions,
  selectedVariant,
}: ProductInfoProps) {

  // Calcula qué combinaciones de opciones no tienen variante disponible
  const unavailableOptions = useMemo(() => {
    const set = new Set<string>()
    for (const option of product.options) {
      for (const value of option.values) {
        const testOptions = { ...selectedOptions, [option.name]: value }
        const variant = findVariantByOptions(product, testOptions)
        if (!variant || !variant.availableForSale) {
          set.add(`${option.name}-${value}`)
        }
      }
    }
    return set
  }, [product, selectedOptions])

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAtPrice = selectedVariant?.compareAtPrice ?? null
  const showDiscount = selectedVariant ? hasDiscount(selectedVariant) : false
  const discount = selectedVariant ? discountPercent(selectedVariant) : 0
  const isAvailable = selectedVariant?.availableForSale ?? false
  const qty = selectedVariant?.quantityAvailable
  const isLowStock = qty !== undefined && qty > 0 && qty <= 8

  // Simula viewers en tiempo real (CRO)
  const [viewers] = useState(() => Math.floor(Math.random() * 12) + 4)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-zen-400">
        <Link href="/" className="hover:text-zen-700 transition-colors">Inicio</Link>
        <span className="mx-1.5">/</span>
        <Link href="/collections/all" className="hover:text-zen-700 transition-colors">Tienda</Link>
        <span className="mx-1.5">/</span>
        <span className="text-zen-600">{product.title}</span>
      </nav>

      {/* Título y valoración */}
      <div>
        <h1 className="text-2xl font-bold text-zen-900 leading-tight text-balance">
          {product.title}
        </h1>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-zen-400 text-zen-400" />
            ))}
            <span className="ml-1 text-xs font-medium text-zen-600">4.8</span>
          </div>
          <span className="text-xs text-zen-400">·</span>
          <span className="text-xs text-zen-500">495 reseñas verificadas</span>
        </div>
      </div>

      {/* Precio */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-zen-900">
          {formatPrice(price)}
        </span>
        {showDiscount && compareAtPrice && (
          <>
            <span className="text-lg text-zen-400 line-through">
              {formatPrice(compareAtPrice)}
            </span>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Social proof — viewers en tiempo real */}
      <div className="flex items-center gap-4 rounded-xl bg-zen-100 px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs text-zen-600">
          <Users size={13} className="text-zen-500" />
          <span>
            <span className="font-semibold text-zen-800">{viewers} personas</span>{' '}
            están viendo este producto ahora
          </span>
        </div>
        {isLowStock && qty && (
          <>
            <span className="h-3 w-px bg-zen-300" />
            <div className="flex items-center gap-1.5 text-xs text-orange-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-dot" />
              Solo quedan <span className="font-semibold">{qty}</span>
            </div>
          </>
        )}
      </div>

      {/* Selector de variantes */}
      {!isOnlyDefaultVariant(product) && (
        <VariantSelector
          options={product.options}
          selectedOptions={selectedOptions}
          onChange={(name, value) =>
            setSelectedOptions((prev) => ({ ...prev, [name]: value }))
          }
          unavailableOptions={unavailableOptions}
        />
      )}

      {/* Variante activa mostrada */}
      {selectedVariant && !isOnlyDefaultVariant(product) && (
        <p className="text-sm text-zen-500">
          Seleccionado:{' '}
          <span className="font-semibold text-zen-800">{selectedVariant.title}</span>
        </p>
      )}

      {/* Añadir al carrito */}
      <AddToCart
        variantId={selectedVariant?.id}
        availableForSale={isAvailable}
      />

      {/* Trust badges */}
      <TrustBadges />

      {/* Descripción */}
      {product.descriptionHtml && (
        <details className="border-t border-zen-200 pt-5">
          <summary className="cursor-pointer select-none text-sm font-medium text-zen-700 hover:text-zen-900 transition-colors">
            Descripción del producto
          </summary>
          <div
            className="prose prose-sm mt-3 max-w-none text-zen-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </details>
      )}
    </div>
  )
}
