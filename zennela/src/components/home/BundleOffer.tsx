'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag, ArrowRight } from 'lucide-react'

const BUNDLES = [
  {
    qty: 1,
    label: '1 llavero',
    discount: 0,
    badge: null,
    highlight: false,
  },
  {
    qty: 2,
    label: '2 llaveros',
    discount: 10,
    badge: 'Popular',
    highlight: false,
  },
  {
    qty: 3,
    label: '3 llaveros',
    discount: 20,
    badge: '🔥 Mejor valor',
    highlight: true,
  },
]

export function BundleOffer() {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #FEF0F5 0%, #F0E8FC 50%, #E4F2FC 100%)' }}>
      <div className="container-zen">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zen-200 px-4 py-1.5 text-sm font-medium text-zen-700 mb-4">
            <Tag size={13} />
            Oferta por volumen
          </div>
          <h2 className="text-3xl font-bold text-zen-900 text-balance">
            Cuantos más, mayor ahorro
          </h2>
          <p className="mt-3 text-zen-500 max-w-md mx-auto">
            Descuentos automáticos aplicados en el carrito. Sin cupones, sin complicaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
          {BUNDLES.map(({ qty, label, discount, badge, highlight }, i) => (
            <motion.div
              key={qty}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 p-6 text-center transition-all duration-200 ${
                highlight
                  ? 'border-gold-500 bg-white shadow-lg shadow-gold-500/10 scale-[1.03]'
                  : 'border-zen-200 bg-white'
              }`}
            >
              {badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${
                  highlight
                    ? 'bg-zen-900 text-white'
                    : 'bg-zen-200 text-zen-600'
                }`}>
                  {badge}
                </span>
              )}

              <p className="text-sm font-medium text-zen-500 mb-2">{label}</p>

              {discount > 0 ? (
                <>
                  <p className="text-4xl font-black text-zen-900">-{discount}%</p>
                  <p className="mt-1 text-sm text-zen-500">descuento total</p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-black text-zen-300">—</p>
                  <p className="mt-1 text-sm text-zen-400">precio regular</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 rounded-full bg-zen-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-zen-800 transition-colors btn-press shadow-md shadow-zen-900/20"
          >
            Aprovechar oferta <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
