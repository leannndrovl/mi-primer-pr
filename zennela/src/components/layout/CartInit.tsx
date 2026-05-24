'use client'

import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'

export function CartInit() {
  const { initCart } = useCart()

  useEffect(() => {
    initCart()
  }, [initCart])

  return null
}
