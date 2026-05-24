import type { Metadata } from 'next'
import { Sparkles, Heart, Leaf, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Zennela — Zennela',
  description: 'Conoce la historia y los valores detrás de Zennela, la marca del llavero antiestrés más satisfactorio.',
}

const VALUES = [
  {
    icon: Sparkles,
    title: 'Diseño cuidado',
    desc: 'Cada detalle importa. Desde la forma hasta el peso, todo está pensado para que la experiencia sea perfecta.',
  },
  {
    icon: Heart,
    title: 'Hecho para ti',
    desc: 'Nació de la necesidad real de tener algo en las manos. Un objeto pequeño con un impacto grande en tu día a día.',
  },
  {
    icon: Leaf,
    title: 'Calidad duradera',
    desc: 'Materiales ABS de alta densidad para que aguante miles de clics sin desgaste. Compacto pero robusto.',
  },
  {
    icon: Star,
    title: 'Confianza real',
    desc: 'Más de 2.800 clientes satisfechos avalan nuestro producto. Una valoración media de 4.8/5 que nos enorgullece.',
  },
]

export default function SobreNosotrosPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">

        <h1 className="text-3xl font-bold text-zen-900 mb-2">Sobre Zennela</h1>
        <p className="text-zen-500 mb-10">La historia detrás del clic más satisfactorio.</p>

        {/* Hero text */}
        <div className="rounded-2xl bg-gradient-to-br from-pastel-pink/30 via-pastel-purple/20 to-pastel-blue/20 border border-zen-100 p-8 mb-10">
          <p className="text-lg text-zen-700 leading-relaxed mb-4">
            <strong className="text-zen-900">Zennela nació de una idea simple:</strong> crear algo pequeño que
            te acompañe en cualquier momento y lugar, y que cada vez que lo uses te haga sentir bien.
          </p>
          <p className="text-zen-600 leading-relaxed">
            El ZenClick es más que un llavero. Es ese objeto que metes en el bolsillo y del que no puedes
            dejar de hacer clic cuando estás en una reunión, esperando el autobús o simplemente necesitas
            un momento para ti. Satisfactorio, discreto y adictivo de la mejor manera posible.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-zen-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zen-50">
                <Icon size={18} className="text-zen-600" />
              </div>
              <h3 className="font-semibold text-zen-800 mb-1">{title}</h3>
              <p className="text-sm text-zen-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="space-y-6 text-zen-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Nuestra misión</h2>
            <p>
              Queremos que cada persona tenga acceso a ese pequeño lujo cotidiano que es tener algo
              bien diseñado entre las manos. No hace falta que sea caro ni complicado — solo tiene que
              funcionar, durar y hacer ese clic perfecto cada vez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">4 modelos, un mismo propósito</h2>
            <p>
              Disponemos de 4 modelos en colores pastel: rosa, lavanda, menta y azul. Cada uno diseñado
              para que encuentres el tuyo. Porque el detalle de elegir el color que más te representa
              también importa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">¿Tienes alguna pregunta?</h2>
            <p>
              Estaremos encantados de ayudarte. Escríbenos a{' '}
              <a href="mailto:leandrovaldivia1409@gmail.com" className="text-zen-800 underline">
                leandrovaldivia1409@gmail.com
              </a>{' '}
              y te responderemos en menos de 24 horas.
            </p>
          </section>
        </div>

      </div>
    </div>
  )
}
