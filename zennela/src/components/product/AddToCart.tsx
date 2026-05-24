'use client'

import { useState } from 'react'
import { ShoppingBag, Check, Minus, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

interface AddToCartProps {
  variantId: string | undefined
  availableForSale: boolean
  className?: string
}

export function AddToCart({ variantId, availableForSale, className }: AddToCartProps) {
  const { addItem, isLoading } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = async () => {
    if (!variantId || !availableForSale || added) return
    await addItem(variantId, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (!availableForSale) {
    return (
      <button
        disabled
        className={cn(
          'w-full rounded-full border-2 border-zen-200 py-4 text-sm font-medium text-zen-400 cursor-not-allowed',
          className
        )}
      >
        Agotado — Notificarme cuando llegue
      </button>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Quantity + Add row */}
      <div className="flex gap-3">
        {/* Quantity picker */}
        <div className="flex items-center rounded-full border border-zen-200 bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-zen-600 hover:bg-zen-50 transition-colors btn-press"
            aria-label="Reducir cantidad"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-zen-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-zen-600 hover:bg-zen-50 transition-colors btn-press"
            aria-label="Aumentar cantidad"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={isLoading || added}
          className={cn(
            'flex flex-1 items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-all duration-200 btn-press',
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-zen-900 text-white hover:bg-zen-800',
            (isLoading || !variantId) && 'opacity-70 cursor-not-allowed'
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <Check size={15} /> ¡Añadido!
              </motion.span>
            ) : isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Añadiendo…
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={15} /> Añadir al carrito
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Bundle hint */}
      <p className="text-center text-xs text-zen-500">
        Compra 3 o más y{' '}
        <span className="font-semibold text-gold-600">ahorra un 20% automáticamente</span>
      </p>
    </div>
  )
}
