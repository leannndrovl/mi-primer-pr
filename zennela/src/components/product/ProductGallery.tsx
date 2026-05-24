'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { ShopifyImage } from '@/types/shopify'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: ShopifyImage[]
  title:  string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  if (images.length === 0) {
    return <div className="aspect-square w-full rounded-2xl bg-zen-100" />
  }

  return (
    <>
      {/* Layout: col-reverse en móvil (thumbs debajo), row en desktop (thumbs izquierda) */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">

        {/* ── Thumbnails ── */}
        {images.length > 1 && (
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible sm:overflow-y-auto sm:max-h-[520px] no-scrollbar sm:w-[76px] flex-shrink-0 pb-1 sm:pb-0 px-0.5 py-0.5">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={cn(
                  'relative flex-shrink-0 rounded-xl transition-all duration-200 p-[2px]',
                  'h-16 w-16 sm:h-[72px] sm:w-[72px]',
                  i === active
                    ? 'bg-zen-800'
                    : 'bg-transparent opacity-40 hover:opacity-70'
                )}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-[9px]">
                  <Image
                    src={img.url}
                    alt={img.altText ?? `${title} ${i + 1}`}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── Imagen principal ── */}
        <div
          className="relative flex-1 aspect-square overflow-hidden rounded-2xl bg-zen-50 cursor-zoom-in group"
          onClick={() => setZoomed(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <Image
                src={images[active].url}
                alt={images[active].altText ?? title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zen-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>

          {/* Contador de imagen (móvil) */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-zen-600 sm:hidden">
              {active + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 cursor-zoom-out p-4"
            onClick={() => setZoomed(false)}
          >
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 z-[10000] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92,    opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].url}
                alt={images[active].altText ?? title}
                width={900}
                height={900}
                sizes="88vw"
                className="object-contain max-h-[88vh] max-w-[88vw] w-auto h-auto rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
