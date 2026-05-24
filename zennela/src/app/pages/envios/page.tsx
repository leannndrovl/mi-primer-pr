import type { Metadata } from 'next'
import { Truck, Package, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Información de Envíos — Zennela',
  description: 'Todo lo que necesitas saber sobre los envíos de Zennela.',
}

const INFO = [
  {
    icon: Package,
    title: 'Procesamiento del pedido',
    desc: 'Una vez confirmado el pago, tu pedido entra en el sistema de preparación. Recibirás un email de confirmación con los detalles.',
  },
  {
    icon: Truck,
    title: 'Tiempo de entrega',
    desc: 'Los plazos de entrega varían según el destino y la disponibilidad. Te notificaremos por email cuando tu pedido sea enviado.',
  },
  {
    icon: MapPin,
    title: 'Zonas de envío',
    desc: 'Realizamos envíos a España y a otros países de Europa. El coste y el plazo exacto se muestran al finalizar la compra.',
  },
  {
    icon: Clock,
    title: 'Seguimiento',
    desc: 'Recibirás un número de seguimiento por email cuando tu pedido sea enviado para que puedas rastrearlo en todo momento.',
  },
]

export default function EnviosPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Información de envíos</h1>
        <p className="text-zen-500 mb-10">Todo lo que necesitas saber sobre cómo llega tu pedido.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
          {INFO.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-zen-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zen-50">
                <Icon size={18} className="text-zen-600" />
              </div>
              <h3 className="font-semibold text-zen-800 mb-1">{title}</h3>
              <p className="text-sm text-zen-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-zen-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Envío gratis</h2>
            <p>
              El envío es <strong className="text-zen-700">gratuito en todos los pedidos superiores a 25€</strong>.
              Para pedidos de menor importe, el coste de envío se calculará automáticamente
              al finalizar la compra según tu dirección de entrega.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Dirección de entrega</h2>
            <p>
              Es tu responsabilidad asegurarte de que la dirección de entrega introducida es correcta.
              No nos hacemos responsables de los retrasos o pérdidas causados por una dirección incorrecta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Problemas con tu envío</h2>
            <p>
              Si tu pedido tarda más de lo esperado o tienes cualquier problema con la entrega,
              contáctanos en{' '}
              <a href="mailto:leandrovaldivia1409@gmail.com" className="text-zen-800 underline">
                leandrovaldivia1409@gmail.com
              </a>{' '}
              indicando tu número de pedido y te ayudaremos lo antes posible.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
