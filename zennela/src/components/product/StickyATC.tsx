'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingBag, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import type { Product, ProductVariant } from '@/types/shopify'
import { formatPrice } from '@/lib/utils'

interface StickyATCProps {
  product: Product
  selectedVariant: ProductVariant | undefined
  triggerRef: React.RefObject<HTMLElement>
}

export function StickyATC({ product, selectedVariant, triggerRef }: StickyATCProps) {
  const { addItem, isLoading } = useCart()
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (triggerRef.current) observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [triggerRef])

  const handleAdd = async () => {
    if (!selectedVariant || added) return
    await addItem(selectedVariant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isAvailable = selectedVariant?.availableForSale ?? false

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-zen-200 bg-zen-50/95 backdrop-blur-md px-4 py-3 shadow-lg md:hidden"
        >
          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            {product.images[0] && (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-zen-100">
                <Image
                  src={product.images[0].url}
                  alt={product.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-zen-800">{product.title}</p>
              <p className="text-sm font-bold text-zen-900">
                {selectedVariant ? formatPrice(selectedVariant.price) : ''}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              disabled={!isAvailable || isLoading || added}
              className="flex items-center gap-2 rounded-full bg-zen-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zen-800 transition-colors btn-press disabled:opacity-50"
            >
              {added ? (
                <><Check size={14} /> Añadido</>
              ) : (
                <><ShoppingBag size={14} /> Comprar</>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
