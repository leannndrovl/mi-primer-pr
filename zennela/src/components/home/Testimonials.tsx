'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'N***h',
    rating: 5,
    text: 'Perfecto. Es justo lo que quería, tal cual aparece en la imagen. Las teclas hacen un sonido increíble y da mucho gusto apretarlas, perfecto para llevarlo por ahí, buen tamaño para las manos. Muy recomendable, muchas gracias.',
    variant: 'Color: Rosa',
    date: '26 ENE 2026',
  },
  {
    name: 'Anónimo',
    rating: 5,
    text: 'A mi hijo le encanta. Tiene un agradable sonido al hacer clic, y los botones están bien asegurados. Está siempre dándole clic, es como un pequeño juguete antiestrés, y le encanta.',
    variant: 'Color: Lavanda',
    date: '16 MAR 2026',
  },
  {
    name: 'Anónimo',
    rating: 5,
    text: '¡Absolutamente increíble! Las teclas tienen un clic muy satisfactorio y se ajustan perfectamente a mi mano. Las teclas son desmontables, lo que te permite personalizarlas, lo cual es muy práctico y genial. ¡El llavero parece extremadamente resistente y de excelente calidad!',
    variant: 'Color: Azul',
    date: '11 FEB 2026',
  },
  {
    name: 'Anónimo',
    rating: 5,
    text: 'La artesanía es impecable, e incluso la parte del anillo es resistente. ¡Me gusta mucho! Incluso puedes cambiar las teclas. El sonido es agradable y la calidad de construcción sorprende.',
    variant: 'Color: Menta',
    date: '25 MAR 2026',
  },
  {
    name: 'Anónimo',
    rating: 5,
    text: 'Se siente muy suave al presionar, más que otras teclas que he probado. Una pasada de llavero por el precio que tiene, no hay necesidad de pensárselo dos veces.',
    variant: 'Color: Crema',
    date: '20 ABR 2026',
  },
  {
    name: 'e***r',
    rating: 5,
    text: 'Perfectamente satisfactorio y adorable. El sonido es excelente. Las teclas son reales y se pueden quitar para personalizarlo. Totalmente recomendable.',
    variant: 'Color: Rosa',
    date: '21 MAY 2026',
  },
]

// Pastel colors for avatar backgrounds
const AVATAR_COLORS = ['#F9C4D4', '#D4B8F0', '#B8D8F0', '#B8E0D4', '#F8F0C8', '#F9C4D4']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-zen-400 text-zen-400' : 'text-zen-200 fill-zen-200'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-zen-50">
      <div className="container-zen">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-zen-500 mb-3">
            Reseñas verificadas
          </p>
          <h2 className="text-3xl font-bold text-zen-900 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating rating={5} />
            <span className="text-sm font-semibold text-zen-700">4.8/5</span>
            <span className="text-sm text-zen-400">· 495 reseñas verificadas</span>
          </div>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {REVIEWS.map(({ name, rating, text, variant, date }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="break-inside-avoid rounded-2xl border border-zen-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-zen-700 flex-shrink-0"
                    style={{ backgroundColor: AVATAR_COLORS[i] }}
                  >
                    {name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zen-800">{name}</p>
                    <p className="text-xs text-zen-400">{variant}</p>
                  </div>
                </div>
                <span className="text-xs text-zen-400 flex-shrink-0 ml-2">{date}</span>
              </div>

              <StarRating rating={rating} />

              <p className="mt-2.5 text-sm leading-relaxed text-zen-600">&ldquo;{text}&rdquo;</p>

              <p className="mt-3 text-xs text-zen-400 border-t border-zen-100 pt-2.5 flex items-center gap-1">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 text-emerald-500 flex-shrink-0">
                  <path fillRule="evenodd" d="M12.354 4.354a.5.5 0 0 1 0 .707L6.707 10.707a.5.5 0 0 1-.707 0L3.646 8.354a.5.5 0 1 1 .708-.708L6.5 9.793l5.146-5.147a.5.5 0 0 1 .708 0z"/>
                </svg>
                Compra verificada
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
