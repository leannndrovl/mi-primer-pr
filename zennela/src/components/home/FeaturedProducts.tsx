import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/shopify'
import { ProductCard } from '@/components/product/ProductCard'
import { VariantCard } from '@/components/product/VariantCard'

interface FeaturedProductsProps {
  products:    Product[]
  mainProduct?: Product | null
}

export function FeaturedProducts({ products, mainProduct }: FeaturedProductsProps) {
  const useVariants = !!(mainProduct && mainProduct.variants.length > 1)
  const variants    = mainProduct?.variants.slice(0, 4) ?? []
  const ctaHref     = mainProduct ? `/products/${mainProduct.handle}` : '/collections/all'

  if (!useVariants && products.length === 0) {
    return (
      <section className="py-20">
        <div className="container-zen text-center">
          <p className="text-zen-400">Cargando productos…</p>
        </div>
      </section>
    )
  }

  return (
    <section id="productos" className="py-20">
      <div className="container-zen">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">
              Los más queridos
            </p>
            <h2 className="text-3xl font-bold text-zen-900 text-balance">
              Más vendidos
            </h2>
          </div>
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-zen-600 hover:text-zen-900 transition-colors group"
          >
            Ver todos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {useVariants
            ? variants.map((variant, i) => (
                <VariantCard
                  key={variant.id}
                  product={mainProduct!}
                  variant={variant}
                  index={i}
                  priority={i < 2}
                />
              ))
            : products.slice(0, 8).map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 4}
                />
              ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-zen-200 px-6 py-3 text-sm font-medium text-zen-700 hover:bg-zen-100 transition-colors btn-press"
          >
            Ver los 4 modelos <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
