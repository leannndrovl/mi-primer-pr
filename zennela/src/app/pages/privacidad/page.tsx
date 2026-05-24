import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Zennela',
  description: 'Información sobre el tratamiento de tus datos personales en Zennela.',
}

export default function PrivacidadPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-zen-400 mb-10">Última actualización: mayo de 2026</p>

        <div className="prose prose-zen max-w-none space-y-8 text-zen-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:
            </p>
            <ul className="mt-3 space-y-1 list-none pl-0">
              <li><strong className="text-zen-700">Marca comercial:</strong> Zennela</li>
              <li><strong className="text-zen-700">Sitio web:</strong> zennela.com</li>
              <li><strong className="text-zen-700">Contacto:</strong> <a href="/pages/contacto" className="text-zen-800 underline">Formulario de contacto</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos cuando realizas una compra o contactas con nosotros:</p>
            <ul className="mt-3 space-y-1 pl-5 list-disc">
              <li>Nombre y apellidos</li>
              <li>Dirección de entrega</li>
              <li>Correo electrónico</li>
              <li>Teléfono (si se facilita)</li>
              <li>Datos de pago (gestionados de forma segura por Shopify Payments — no almacenamos datos de tarjeta)</li>
              <li>Datos de navegación (mediante cookies técnicas y analíticas)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul className="mt-3 space-y-1 pl-5 list-disc">
              <li>Gestionar y tramitar tu pedido</li>
              <li>Comunicarnos contigo sobre el estado de tu compra</li>
              <li>Cumplir con las obligaciones legales y fiscales</li>
              <li>Mejorar nuestra tienda y experiencia de usuario (datos anónimos de navegación)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">4. Base legal del tratamiento</h2>
            <p>
              El tratamiento de tus datos se basa en la ejecución del contrato de compraventa (art. 6.1.b RGPD)
              y en el cumplimiento de obligaciones legales (art. 6.1.c RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">5. Conservación de datos</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para gestionar tu pedido y durante los plazos
              legales exigidos por la normativa fiscal y mercantil española (generalmente 5 años).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">6. Cesión de datos a terceros</h2>
            <p>
              Tus datos pueden ser compartidos con proveedores necesarios para completar tu pedido
              (servicios de transporte y logística). No vendemos ni cedemos tus datos a terceros
              con fines comerciales.
            </p>
            <p className="mt-2">
              La plataforma de pagos y gestión de pedidos es <strong className="text-zen-700">Shopify Inc.</strong>,
              que cumple con el RGPD y cuenta con las garantías adecuadas para la transferencia internacional de datos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">7. Tus derechos</h2>
            <p>De acuerdo con el RGPD y la LOPDGDD, tienes derecho a:</p>
            <ul className="mt-3 space-y-1 pl-5 list-disc">
              <li><strong className="text-zen-700">Acceso:</strong> conocer qué datos tenemos sobre ti</li>
              <li><strong className="text-zen-700">Rectificación:</strong> corregir datos inexactos</li>
              <li><strong className="text-zen-700">Supresión:</strong> solicitar la eliminación de tus datos</li>
              <li><strong className="text-zen-700">Oposición:</strong> oponerte al tratamiento en determinadas circunstancias</li>
              <li><strong className="text-zen-700">Portabilidad:</strong> recibir tus datos en formato estructurado</li>
              <li><strong className="text-zen-700">Limitación:</strong> solicitar la restricción del tratamiento</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos,{' '}
              <a href="/pages/contacto" className="text-zen-800 underline">
                contáctanos a través de nuestra página de contacto
              </a>.
              También puedes presentar una reclamación ante la{' '}
              <strong className="text-zen-700">Agencia Española de Protección de Datos (AEPD)</strong> en{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-zen-800 underline">
                www.aepd.es
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">8. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales
              frente a accesos no autorizados, pérdida o divulgación. Nuestro sitio utiliza
              cifrado SSL/TLS en todas las comunicaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">9. Contacto</h2>
            <p>
              Para cualquier consulta sobre esta política de privacidad,{' '}
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
