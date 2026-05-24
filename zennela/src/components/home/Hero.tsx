'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import type { Product } from '@/types/shopify'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

// Posición, rotación y velocidad de flotación para cada una de las 4 tarjetas
const CARD_CONFIG = [
  { rotate: -7,  floatY: [0, -12, 0], duration: 4.0, delay: 0.0, top: '2%',  left: '2%',  size: 160 },
  { rotate:  6,  floatY: [0, -15, 0], duration: 4.8, delay: 0.5, top: '4%',  left: '52%', size: 148 },
  { rotate: -4,  floatY: [0, -10, 0], duration: 3.8, delay: 0.3, top: '52%', left: '0%',  size: 148 },
  { rotate:  8,  floatY: [0, -13, 0], duration: 5.0, delay: 0.8, top: '50%', left: '50%', size: 160 },
]

const GLOW_COLORS  = ['#F9C4D4', '#D4B8F0', '#B8E0D4', '#B8D8F0']

interface HeroProps {
  product: Product | null
}

export function Hero({ product }: HeroProps) {
  const variants = product?.variants.slice(0, 4) ?? []
  const productHandle = product?.handle ?? '#'

  // Usa la imagen propia de cada variante; elimina el prefijo "Zennela™ " del nombre
  const variantCards = Array.from({ length: 4 }, (_, i) => {
    const variant = variants[i]
    const variantParam = variant?.selectedOptions
      .map((o) => `${encodeURIComponent(o.name)}=${encodeURIComponent(o.value)}`)
      .join('&') ?? ''
    return {
      image: variant?.image ?? product?.images[i] ?? null,
      label: (variant?.title ?? `Modelo ${i + 1}`).replace(/^Zennela™\s*/i, ''),
      href: variantParam ? `/products/${productHandle}?${variantParam}` : `/products/${productHandle}`,
    }
  })

  return (
    <section className="relative overflow-hidden bg-zen-50 pt-12 pb-20 lg:pt-20 lg:pb-28">

      {/* Pastel background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pastel-pink   opacity-30 blur-3xl" />
        <div className="absolute top-10  right-0    h-80 w-80 rounded-full bg-pastel-blue  opacity-25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3  h-64 w-64 rounded-full bg-pastel-mint  opacity-20 blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 h-56 w-56 rounded-full bg-pastel-cream opacity-30 blur-3xl" />
      </div>

      <div className="container-zen relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT: copy ── */}
          <div className="text-center lg:text-left">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-pastel-purple bg-pastel-purple/20 px-3.5 py-1.5 text-xs font-medium text-zen-700 mb-6"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-zen-500 animate-pulse-dot" />
              Más de 2,800 clientes satisfechos
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-black leading-tight tracking-tight text-zen-900 sm:text-5xl lg:text-6xl text-balance"
            >
              El clic que{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F9C4D4, #D4B8F0, #B8D8F0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                enamora
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-lg font-semibold leading-snug text-zen-800 max-w-sm mx-auto lg:mx-0"
            >
              Lo ves y lo quieres.
              <br />
              Lo tocas y lo necesitas.
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-3 text-sm italic leading-relaxed text-zen-400 max-w-[22rem] mx-auto lg:mx-0"
            >
              El llavero que nadie sabe que necesita,
              <br />
              hasta que lo tiene en la mano.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href={`/products/${productHandle}`}
                className="inline-flex items-center gap-2 rounded-full bg-zen-900 px-7 py-3.5 text-sm font-semibold text-white hover:bg-zen-800 transition-colors btn-press shadow-md shadow-zen-900/10"
              >
                Ver los 4 modelos <ArrowRight size={15} />
              </Link>
              <Link href="/#reviews" className="text-sm font-medium text-zen-600 hover:text-zen-900 transition-colors">
                Leer reseñas
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex -space-x-2">
                {['#F9C4D4','#D4B8F0','#B8E0D4','#B8D8F0','#F8F0C8'].map((color, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-zen-700" style={{ backgroundColor: color }}>
                    {['A','M','J','L','P'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-zen-400 text-zen-400" />
                  ))}
                </div>
                <p className="text-xs text-zen-500">
                  <span className="font-semibold text-zen-700">4.8/5</span> · 495 reseñas verificadas
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 4 variantes flotando ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
            style={{ height: '420px' }}
          >
            {/* Glow central */}
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto h-56 w-56 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #F9C4D4 0%, #D4B8F0 50%, #B8D8F0 100%)' }}
            />

            {/* Las 4 tarjetas */}
            {variantCards.map(({ image: img, label: variantLabel, href }, i) => {
              const cfg = CARD_CONFIG[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1, y: cfg.floatY }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
                    scale:   { duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.16,1,0.3,1] },
                    y: { duration: cfg.duration, repeat: Infinity, ease: 'easeInOut', delay: cfg.delay },
                  }}
                  className="absolute"
                  style={{ top: cfg.top, left: cfg.left, rotate: `${cfg.rotate}deg` }}
                >
                  <Link href={href} className="group block">
                    {/* Tarjeta */}
                    <div
                      className="relative overflow-hidden rounded-2xl bg-white transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1"
                      style={{
                        width: cfg.size,
                        height: cfg.size,
                        boxShadow: `0 16px 40px ${GLOW_COLORS[i]}66, 0 4px 12px ${GLOW_COLORS[i]}44`,
                      }}
                    >
                      {img ? (
                        <Image
                          src={img.url}
                          alt={img.altText ?? variantLabel}
                          fill
                          sizes="160px"
                          className="object-cover"
                          priority={i === 0}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center" style={{ background: `${GLOW_COLORS[i]}33` }}>
                          <span className="text-xs text-zen-400">{variantLabel}</span>
                        </div>
                      )}
                    </div>
                    {/* Etiqueta de variante */}
                    <div
                      className="mt-2 mx-auto w-fit rounded-full px-3 py-1 text-[11px] font-semibold text-zen-700"
                      style={{ backgroundColor: `${GLOW_COLORS[i]}55` }}
                    >
                      {variantLabel}
                    </div>
                  </Link>
                </motion.div>
              )
            })}

            {/* Floating sold badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="absolute -top-3 right-0 z-20 rounded-2xl border border-zen-100 px-4 py-3 shadow-lg shadow-zen-200/40"
              style={{ background: 'linear-gradient(135deg, #FEF0F5 0%, #F0E8FC 100%)' }}
            >
              <p className="text-xl font-black text-zen-900">5.200+</p>
              <p className="text-[11px] font-medium text-zen-500">vendidos este mes</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
