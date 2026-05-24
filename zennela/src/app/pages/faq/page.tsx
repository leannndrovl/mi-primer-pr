import type { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes — Zennela',
  description: 'Resolvemos las dudas más comunes sobre los productos y pedidos de Zennela.',
}

const FAQS = [
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'El plazo de entrega varía según el destino. Una vez procesado el pago, recibirás un email de confirmación. Cuando tu pedido sea enviado, te notificaremos con el número de seguimiento para que puedas rastrearlo en todo momento.',
  },
  {
    q: '¿El envío es gratuito?',
    a: 'Sí, el envío es completamente gratuito en todos los pedidos superiores a 25€. Para pedidos de menor importe, el coste de envío se calculará automáticamente al finalizar la compra según tu dirección de entrega.',
  },
  {
    q: '¿A qué países enviáis?',
    a: 'Realizamos envíos a España y a otros países de Europa. El coste y el plazo exacto se muestran al finalizar la compra según tu dirección.',
  },
  {
    q: '¿Puedo cancelar mi pedido?',
    a: 'Puedes cancelar tu pedido siempre que no haya sido enviado todavía. Contáctanos lo antes posible en leandrovaldivia1409@gmail.com indicando tu número de pedido y te ayudaremos a gestionarlo.',
  },
  {
    q: '¿Qué métodos de pago aceptáis?',
    a: 'Aceptamos tarjeta de crédito/débito (Visa, Mastercard), PayPal y Bizum. Todos los pagos están gestionados de forma segura a través de Shopify con cifrado SSL.',
  },
  {
    q: '¿Cómo puedo rastrear mi pedido?',
    a: 'Una vez enviado tu pedido, recibirás un email con el número de seguimiento. Con ese número podrás rastrear el estado de tu envío en todo momento a través del sitio web de la empresa de transporte.',
  },
  {
    q: '¿Qué hago si recibo un producto defectuoso?',
    a: 'Si recibes un producto defectuoso o diferente al pedido, contáctanos en un plazo de 48 horas desde la recepción en leandrovaldivia1409@gmail.com, adjuntando fotos del producto y tu número de pedido. Gestionaremos una solución lo antes posible.',
  },
  {
    q: '¿El llavero hace ruido al usarlo?',
    a: 'El ZenClick está diseñado para producir el clic satisfactorio característico que lo hace tan adictivo, pero con un nivel de sonido controlado para que puedas usarlo en cualquier entorno sin molestar a nadie.',
  },
  {
    q: '¿De qué material está fabricado?',
    a: 'Nuestros llaveros están fabricados en ABS de alta densidad, un material resistente, ligero y duradero que garantiza miles de clics sin desgaste.',
  },
  {
    q: '¿Cuántos modelos hay disponibles?',
    a: 'Actualmente disponemos de 4 modelos en colores pastel: rosa, lavanda, menta y azul. Cada uno está disponible en la página del producto y puedes elegir el que más se adapte a tu estilo.',
  },
]

export default function FaqPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Preguntas frecuentes</h1>
        <p className="text-zen-500 mb-10">Todo lo que necesitas saber antes de comprar.</p>

        <div className="divide-y divide-zen-100">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                <span className="font-semibold text-zen-800 group-open:text-zen-900">{q}</span>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 text-zen-400 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm text-zen-500 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-zen-200 bg-zen-50 p-6 text-center">
          <p className="text-zen-600 mb-1 font-medium">¿No encuentras lo que buscas?</p>
          <p className="text-sm text-zen-500 mb-4">Escríbenos y te respondemos en menos de 24 horas.</p>
          <a
            href="mailto:leandrovaldivia1409@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-zen-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zen-800 transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>
    </div>
  )
}
