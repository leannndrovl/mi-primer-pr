import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Money, Product, ProductVariant } from '@/types/shopify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: money.amount.includes('.00') ? 0 : 2,
  }).format(parseFloat(money.amount))
}

export function formatPriceRaw(amount: string, currencyCode: string): string {
  return formatPrice({ amount, currencyCode })
}

export function hasDiscount(variant: ProductVariant): boolean {
  if (!variant.compareAtPrice) return false
  return parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)
}

export function discountPercent(variant: ProductVariant): number {
  if (!hasDiscount(variant)) return 0
  const original = parseFloat(variant.compareAtPrice!.amount)
  const current = parseFloat(variant.price.amount)
  return Math.round(((original - current) / original) * 100)
}

export function getFirstAvailableVariant(product: Product): ProductVariant | undefined {
  return product.variants.find((v) => v.availableForSale) ?? product.variants[0]
}

export function buildVariantTitle(selectedOptions: Record<string, string>): string {
  return Object.values(selectedOptions).join(' / ')
}

export function findVariantByOptions(
  product: Product,
  selectedOptions: Record<string, string>
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    )
  )
}

export function isOnlyDefaultVariant(product: Product): boolean {
  return (
    product.variants.length === 1 &&
    product.variants[0].title === 'Default Title'
  )
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export const FREE_SHIPPING_THRESHOLD = 25
