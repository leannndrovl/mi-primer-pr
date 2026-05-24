'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Minimize2, Volume2, Hand, Award } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Clic mecanicamente perfecto',
    desc: 'Cada pulsación ofrece el tacto y sonido exacto que libera tensión y mejora el enfoque.',
    color: '#F9C4D4',
    bg: '#FEF0F5',
  },
  {
    icon: Shield,
    title: 'Materiales premium',
    desc: 'ABS de alta densidad y base transparente. Construido para durar años en tu llavero.',
    color: '#D4B8F0',
    bg: '#F0E8FC',
  },
  {
    icon: Minimize2,
    title: 'Diseño ultra compacto',
    desc: 'Cabe perfectamente en el bolsillo. Siempre al alcance sin molestar.',
    color: '#B8E0D4',
    bg: '#E8F8F4',
  },
  {
    icon: Volume2,
    title: 'Sonido satisfactorio',
    desc: 'El clic mecánico que libera estrés con cada pulsación. Adictivo en el buen sentido.',
    color: '#B8D8F0',
    bg: '#E4F2FC',
  },
  {
    icon: Hand,
    title: 'Colores que enamoran',
    desc: 'Tonos pastel cuidadosamente elegidos. Un accesorio bonito que todo el mundo querrá tener.',
    color: '#F8F0C8',
    bg: '#FDFAEE',
  },
  {
    icon: Award,
    title: 'Calidad garantizada',
    desc: 'Más de 2,800 clientes satisfechos avalan este producto. Su valoración media de 4.8/5 habla por sí sola.',
    color: '#F9C4D4',
    bg: '#FEF0F5',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #F5EEFF 0%, #FDFAFF 100%)' }}>
      <div className="container-zen">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-zen-500 mb-3">
            Por qué Zennela
          </p>
          <h2 className="text-3xl font-bold text-zen-900 sm:text-4xl text-balance">
            No es un llavero cualquiera
          </h2>
          <p className="mt-4 text-zen-500 max-w-lg mx-auto text-balance">
            Cada detalle ha sido pensado para que sea bonito, satisfactorio y único.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group rounded-2xl border border-zen-200 bg-white p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="text-base font-semibold text-zen-800 mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-zen-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
