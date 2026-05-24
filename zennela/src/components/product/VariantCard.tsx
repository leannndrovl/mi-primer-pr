'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product, ProductVariant } from '@/types/shopify'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'

const COLORS    = ['#F9C4D4', '#D4B8F0', '#B8E0D4', '#B8D8F0']
const BG_COLORS = ['#FEF0F5', '#F0E8FC', '#E8F8F4', '#E4F2FC']

interface VariantCardProps {
  product:  Product
  variant:  ProductVariant
  index:    number
  priority?: boolean
}

export function VariantCard({ product, variant, index, priority = false }: VariantCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const color     = COLORS[index % COLORS.length]
  const bg        = BG_COLORS[index % BG_COLORS.length]
  const cleanName = variant.title.replace(/^Zennela™\s*/i, '')
  const image     = variant.image ?? product.images[index] ?? product.images[0]

  // Construye la URL con los params de variante para que el producto abra en la variante correcta
  const variantParams = variant.selectedOptions
    .map((o) => `${encodeURIComponent(o.name)}=${encodeURIComponent(o.value)}`)
    .join('&')
  const href = `/products/${product.handle}?${variantParams}`

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (added) return
    await addItem(variant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col"
    >
      <Link href={href} className="block">
        {/* Imagen */}
        <div
          className="relative aspect-square overflow-hidden rounded-2xl"
          style={{ backgroundColor: bg }}
        >
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? cleanName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover img-zoom"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag size={32} style={{ color }} />
            </div>
          )}

          {/* Punto de color */}
          <div className="absolute left-3 top-3">
            <div
              className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          </div>

          {/* Quick add */}
          {variant.availableForSale && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex translate-y-2 items-center gap-2 whitespace-nowrap rounded-full bg-zen-900/90 px-4 py-2.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-zen-800 group-hover:translate-y-0 group-hover:opacity-100 btn-press"
              aria-label={`Añadir ${cleanName} al carrito`}
            >
              {added ? (
                <><Check size={12} /> Añadido</>
              ) : (
                <><ShoppingBag size={12} /> Añadir al carrito</>
              )}
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 px-1">
          <span
            className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-zen-700"
            style={{ backgroundColor: bg }}
          >
            {cleanName}
          </span>
          <h3 className="text-sm font-medium text-zen-800 transition-colors group-hover:text-zen-900">
            Llavero Click Zennela
          </h3>
          <div className="mt-1">
            <span className="text-sm font-semibold text-zen-900">
              {formatPrice(variant.price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
