import { getFeaturedProducts } from '@/lib/shopify'
import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Features } from '@/components/home/Features'
import { BundleOffer } from '@/components/home/BundleOffer'
import { Testimonials } from '@/components/home/Testimonials'

export const revalidate = 3600

export default async function HomePage() {
  const products = await getFeaturedProducts(8)
  const mainProduct = products[0] ?? null

  return (
    <>
      <Hero product={mainProduct} />
      <Marquee />
      <FeaturedProducts products={products} mainProduct={mainProduct} />
      <Features />
      <BundleOffer />
      <Testimonials />
    </>
  )
}
