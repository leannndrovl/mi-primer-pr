'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem, checkoutUrl, subtotal } =
    useCart()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  const subtotalAmount = subtotal ? parseFloat(subtotal.amount) : 0
  const shippingProgress = Math.min((subtotalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotalAmount, 0)
  const hasFreeShipping = subtotalAmount >= FREE_SHIPPING_THRESHOLD

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-zen-900/40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-zen-50 shadow-2xl"
            aria-label="Carrito de compra"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zen-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-zen-700" />
                <h2 className="font-semibold text-zen-900">
                  Mi Carrito
                  {cart && cart.totalQuantity > 0 && (
                    <span className="ml-2 text-sm font-normal text-zen-500">
                      ({cart.totalQuantity})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-1.5 text-zen-500 hover:bg-zen-100 hover:text-zen-800 transition-colors btn-press focus-zen"
                aria-label="Cerrar carrito"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="border-b border-zen-200 px-5 py-3">
              {hasFreeShipping ? (
                <p className="text-center text-sm font-medium text-emerald-600">
                  ✓ ¡Tienes envío gratis!
                </p>
              ) : (
                <p className="text-center text-xs text-zen-500 mb-1.5">
                  Añade{' '}
                  <span className="font-semibold text-zen-800">
                    {formatPrice({ amount: remaining.toFixed(2), currencyCode: subtotal?.currencyCode ?? 'EUR' })}
                  </span>{' '}
                  más para envío gratis
                </p>
              )}
              <div className="h-1.5 w-full rounded-full bg-zen-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gold-500 transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <ShoppingBag size={40} className="text-zen-300" />
                  <div>
                    <p className="font-medium text-zen-700">Tu carrito está vacío</p>
                    <p className="mt-1 text-sm text-zen-500">
                      Encuentra tu llavero perfecto
                    </p>
                  </div>
                  <Link
                    href="/collections/all"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 rounded-full bg-zen-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zen-800 transition-colors btn-press"
                  >
                    Ver tienda <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-zen-100">
                  <AnimatePresence initial={false}>
                    {cart.lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 py-4"
                      >
                        {/* Image */}
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zen-100">
                          {line.merchandise.image ? (
                            <Image
                              src={line.merchandise.image.url}
                              alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="h-full w-full bg-zen-200" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div>
                            <Link
                              href={`/products/${line.merchandise.product.handle}`}
                              onClick={closeCart}
                              className="block truncate text-sm font-medium text-zen-900 hover:text-gold-600 transition-colors"
                            >
                              {line.merchandise.product.title}
                            </Link>
                            {line.merchandise.title !== 'Default Title' && (
                              <p className="mt-0.5 text-xs text-zen-500">
                                {line.merchandise.title}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1 rounded-full border border-zen-200 bg-white">
                              <button
                                onClick={() =>
                                  updateItem(line.id, line.quantity - 1)
                                }
                                disabled={isLoading}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-zen-600 hover:bg-zen-100 transition-colors disabled:opacity-50 btn-press"
                                aria-label="Reducir cantidad"
                              >
                                {line.quantity === 1 ? (
                                  <Trash2 size={11} />
                                ) : (
                                  <Minus size={11} />
                                )}
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-zen-800">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateItem(line.id, line.quantity + 1)
                                }
                                disabled={isLoading}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-zen-600 hover:bg-zen-100 transition-colors disabled:opacity-50 btn-press"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <span className="text-sm font-semibold text-zen-900">
                              {formatPrice(line.cost.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="border-t border-zen-200 px-5 pb-6 pt-4 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zen-600">Subtotal</span>
                  <span className="font-semibold text-zen-900">
                    {subtotal ? formatPrice(subtotal) : '—'}
                  </span>
                </div>
                <p className="text-center text-xs text-zen-400">
                  Impuestos y envío calculados en el checkout
                </p>

                {/* CTA */}
                <a
                  href={checkoutUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-zen-900 py-4 text-sm font-semibold text-white hover:bg-zen-800 transition-colors btn-press"
                >
                  Finalizar compra
                  <ArrowRight size={15} />
                </a>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-zen-500 hover:text-zen-800 transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
