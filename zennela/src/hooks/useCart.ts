'use client'

import { useCallback } from 'react'
import { useCartStore } from '@/store/cart'
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from '@/lib/shopify'

export function useCart() {
  const {
    cart,
    cartId,
    isOpen,
    isLoading,
    setCart,
    setCartId,
    openCart,
    closeCart,
    setLoading,
    clearCart,
    getPersistedCartId,
    persistCartId,
  } = useCartStore()

  const initCart = useCallback(async () => {
    const storedId = getPersistedCartId()
    if (!storedId) return

    try {
      const existing = await getCart(storedId)
      if (existing) {
        setCart(existing)
        setCartId(existing.id)
      } else {
        clearCart()
      }
    } catch {
      clearCart()
    }
  }, [getPersistedCartId, setCart, setCartId, clearCart])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true)
      try {
        let currentCartId = cartId ?? getPersistedCartId()

        if (!currentCartId) {
          const newCart = await createCart(merchandiseId, quantity)
          setCart(newCart)
          setCartId(newCart.id)
          persistCartId(newCart.id)
          openCart()
          return newCart
        }

        const updated = await addToCart(currentCartId, [{ merchandiseId, quantity }])
        setCart(updated)
        openCart()
        return updated
      } catch (err) {
        console.error('Failed to add item to cart:', err)
      } finally {
        setLoading(false)
      }
    },
    [cartId, getPersistedCartId, setCart, setCartId, persistCartId, openCart, setLoading]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return
      setLoading(true)
      try {
        if (quantity === 0) {
          const updated = await removeFromCart(cartId, [lineId])
          setCart(updated)
          return updated
        }
        const updated = await updateCart(cartId, [{ id: lineId, quantity }])
        setCart(updated)
        return updated
      } catch (err) {
        console.error('Failed to update cart:', err)
      } finally {
        setLoading(false)
      }
    },
    [cartId, setCart, setLoading]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return
      setLoading(true)
      try {
        const updated = await removeFromCart(cartId, [lineId])
        setCart(updated)
        return updated
      } catch (err) {
        console.error('Failed to remove cart item:', err)
      } finally {
        setLoading(false)
      }
    },
    [cartId, setCart, setLoading]
  )

  const totalItems = cart?.totalQuantity ?? 0
  const subtotal = cart?.cost.subtotalAmount ?? null
  const checkoutUrl = cart?.checkoutUrl ?? '#'

  return {
    cart,
    isOpen,
    isLoading,
    totalItems,
    subtotal,
    checkoutUrl,
    initCart,
    addItem,
    updateItem,
    removeItem,
    openCart,
    closeCart,
    clearCart,
  }
}
