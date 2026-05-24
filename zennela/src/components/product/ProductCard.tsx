'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/shopify'
import {
  formatPrice,
  discountPercent,
  getFirstAvailableVariant,
  hasDiscount,
} from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [hoveredImage, setHoveredImage] = useState(0)

  const firstVariant = getFirstAvailableVariant(product)
  const isAvailable = product.variants.some((v) => v.availableForSale)
  const showDiscount = firstVariant && hasDiscount(firstVariant)
  const discount = firstVariant ? discountPercent(firstVariant) : 0
  const isBestseller = product.tags.includes('bestseller')
  const isNew = product.tags.includes('new') || product.tags.includes('nuevo')
  const isLimited =
    firstVariant?.quantityAvailable !== undefined &&
    firstVariant.quantityAvailable > 0 &&
    firstVariant.quantityAvailable <= 5

  const images = product.images.slice(0, 2)
  const displayImage = images[hoveredImage] ?? images[0]

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!firstVariant || added) return

    await addItem(firstVariant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col"
    >
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image container */}
        <div
          className="relative aspect-square overflow-hidden rounded-2xl bg-zen-100"
          onMouseEnter={() => images.length > 1 && setHoveredImage(1)}
          onMouseLeave={() => setHoveredImage(0)}
        >
          {displayImage ? (
            <Image
              src={displayImage.url}
              alt={displayImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover img-zoom"
              priority={priority}
            />
          ) : (
            <div className="h-full w-full bg-zen-200 flex items-center justify-center">
              <ShoppingBag size={32} className="text-zen-400" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {!isAvailable && <Badge variant="soldout" />}
            {isAvailable && isBestseller && <Badge variant="bestseller" />}
            {isAvailable && isNew && !isBestseller && <Badge variant="new" />}
            {isAvailable && isLimited && <Badge variant="limited" />}
            {isAvailable && showDiscount && (
              <Badge variant="sale" label={`-${discount}%`} />
            )}
          </div>

          {/* Quick add — appears on hover */}
          {isAvailable && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-zen-900/90 backdrop-blur-sm px-4 py-2.5 text-xs font-semibold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-zen-800 btn-press whitespace-nowrap"
              aria-label={`Añadir ${product.title} al carrito`}
            >
              {added ? (
                <>
                  <Check size={12} />
                  Añadido
                </>
              ) : (
                <>
                  <ShoppingBag size={12} />
                  Añadir al carrito
                </>
              )}
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <h3 className="text-sm font-medium text-zen-800 group-hover:text-zen-900 transition-colors line-clamp-2">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-zen-900">
              {formatPrice(product.priceRange.minVariantPrice)}
            </span>
            {showDiscount && firstVariant?.compareAtPrice && (
              <span className="text-xs text-zen-400 line-through">
                {formatPrice(firstVariant.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock warning */}
          {isLimited && firstVariant?.quantityAvailable && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-orange-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-dot" />
              Solo quedan {firstVariant.quantityAvailable}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
