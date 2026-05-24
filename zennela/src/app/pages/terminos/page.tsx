import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Zennela',
  description: 'Condiciones generales de venta de Zennela.',
}

export default function TerminosPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-zen-400 mb-10">Última actualización: mayo de 2026</p>

        <div className="space-y-8 text-zen-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">1. Información general</h2>
            <p>
              Estas condiciones regulan la compra de productos a través de <strong className="text-zen-700">zennela.com</strong>,
              operado bajo la marca comercial Zennela. Al realizar un pedido aceptas estas condiciones en su totalidad.
            </p>
            <p className="mt-2">
              Contacto: <a href="/pages/contacto" className="text-zen-800 underline">Formulario de contacto</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">2. Productos y precios</h2>
            <p>
              Todos los precios mostrados incluyen el IVA aplicable y están expresados en euros (€).
              Nos reservamos el derecho de modificar los precios en cualquier momento, si bien los cambios
              no afectarán a los pedidos ya confirmados.
            </p>
            <p className="mt-2">
              Las imágenes de los productos son orientativas. El color exacto puede variar ligeramente
              según la pantalla de cada dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">3. Proceso de compra</h2>
            <p>El proceso de compra consta de los siguientes pasos:</p>
            <ol className="mt-3 space-y-1 pl-5 list-decimal">
              <li>Selección del producto y variante</li>
              <li>Añadir al carrito</li>
              <li>Introducción de datos de envío</li>
              <li>Selección del método de pago y confirmación</li>
              <li>Recepción de email de confirmación del pedido</li>
            </ol>
            <p className="mt-3">
              El contrato de compraventa se perfecciona en el momento en que recibes el email de confirmación del pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">4. Métodos de pago</h2>
            <p>
              Aceptamos los siguientes métodos de pago, todos gestionados de forma segura a través de Shopify:
            </p>
            <ul className="mt-3 space-y-1 pl-5 list-disc">
              <li>Tarjeta de crédito / débito (Visa, Mastercard)</li>
              <li>PayPal</li>
              <li>Bizum</li>
            </ul>
            <p className="mt-2">
              Todos los pagos están protegidos con cifrado SSL. No almacenamos datos de tarjetas bancarias.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">5. Envíos</h2>
            <p>
              Realizamos envíos a España y a otros países de Europa. Los plazos de entrega son
              orientativos y pueden variar según el destino y la disponibilidad del producto.
              No nos hacemos responsables de retrasos causados por la empresa de transporte
              o por causas ajenas a nuestra voluntad.
            </p>
            <p className="mt-2">
              El envío es <strong className="text-zen-700">gratuito en pedidos superiores a 25€</strong>.
              Para pedidos de menor importe se aplicará el coste de envío correspondiente,
              que se mostrará antes de confirmar la compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">6. Cancelaciones</h2>
            <p>
              Puedes cancelar tu pedido siempre que no haya sido enviado todavía. Para solicitar
              la cancelación,{' '}
              <a href="/pages/contacto" className="text-zen-800 underline">
                contáctanos a través de nuestra página de contacto
              </a>{' '}
              indicando tu número de pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">7. Productos defectuosos o incorrectos</h2>
            <p>
              Si recibes un producto defectuoso o diferente al pedido, contacta con nosotros en un
              plazo de 48 horas desde la recepción{' '}
              <a href="/pages/contacto" className="text-zen-800 underline">
                a través de nuestra página de contacto
              </a>{' '}
              adjuntando fotos del producto y tu número de pedido. Gestionaremos una solución lo antes posible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">8. Garantía legal</h2>
            <p>
              Todos nuestros productos cuentan con la garantía legal de conformidad establecida
              en el Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">9. Propiedad intelectual</h2>
            <p>
              Todos los contenidos de esta web (textos, imágenes, diseño, logotipo) son propiedad
              de Zennela o de sus proveedores y están protegidos por las leyes de propiedad intelectual.
              Queda prohibida su reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">10. Legislación aplicable</h2>
            <p>
              Estas condiciones se rigen por la legislación española. Para cualquier controversia,
              las partes se someten a los juzgados y tribunales del domicilio del consumidor,
              de conformidad con la normativa de protección al consumidor vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">11. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estas condiciones,{' '}
              <a href="/pages/contacto" className="text-zen-800 underline">
                contáctanos a través de nuestra página de contacto
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
