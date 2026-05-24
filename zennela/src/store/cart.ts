'use client'

import { create } from 'zustand'
import type { Cart } from '@/types/shopify'

const CART_ID_KEY = 'zennela_cart_id'

interface CartStore {
  cart: Cart | null
  cartId: string | null
  isOpen: boolean
  isLoading: boolean

  setCart: (cart: Cart) => void
  setCartId: (id: string) => void
  setOpen: (open: boolean) => void
  openCart: () => void
  closeCart: () => void
  setLoading: (loading: boolean) => void
  clearCart: () => void
  getPersistedCartId: () => string | null
  persistCartId: (id: string) => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  cartId: null,
  isOpen: false,
  isLoading: false,

  setCart: (cart) => set({ cart }),
  setCartId: (cartId) => set({ cartId }),
  setOpen: (isOpen) => set({ isOpen }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setLoading: (isLoading) => set({ isLoading }),
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_ID_KEY)
    }
    set({ cart: null, cartId: null })
  },

  getPersistedCartId: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CART_ID_KEY)
  },

  persistCartId: (id: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_ID_KEY, id)
    }
  },
}))
