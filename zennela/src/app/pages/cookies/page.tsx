import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies — Zennela',
  description: 'Información sobre el uso de cookies en zennela.com.',
}

export default function CookiesPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Política de Cookies</h1>
        <p className="text-sm text-zen-400 mb-10">Última actualización: mayo de 2026</p>

        <div className="space-y-8 text-zen-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
              un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Cookies que utilizamos</h2>

            <div className="space-y-4 mt-3">
              <div className="rounded-xl border border-zen-200 p-4">
                <h3 className="font-semibold text-zen-800 mb-1">Cookies técnicas (necesarias)</h3>
                <p className="text-sm">
                  Imprescindibles para el funcionamiento de la tienda. Gestionan tu carrito de compra
                  y sesión. No requieren tu consentimiento al ser estrictamente necesarias.
                </p>
                <p className="text-xs text-zen-400 mt-2">Proveedor: Shopify · Duración: sesión / 1 año</p>
              </div>

              <div className="rounded-xl border border-zen-200 p-4">
                <h3 className="font-semibold text-zen-800 mb-1">Cookies de preferencias</h3>
                <p className="text-sm">
                  Recuerdan tus preferencias de navegación como el idioma o los productos que has visto.
                </p>
                <p className="text-xs text-zen-400 mt-2">Proveedor: Zennela · Duración: 30 días</p>
              </div>

              <div className="rounded-xl border border-zen-200 p-4">
                <h3 className="font-semibold text-zen-800 mb-1">Cookies analíticas</h3>
                <p className="text-sm">
                  Nos ayudan a entender cómo los visitantes usan nuestra web para poder mejorarla.
                  Los datos son completamente anónimos.
                </p>
                <p className="text-xs text-zen-400 mt-2">Proveedor: Vercel Analytics · Duración: 90 días</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Cómo gestionar las cookies</h2>
            <p>
              Puedes configurar tu navegador para rechazar o eliminar las cookies en cualquier momento.
              Ten en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento de la tienda.
            </p>
            <ul className="mt-3 space-y-1 pl-5 list-disc text-sm">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-zen-800 underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-zen-800 underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-zen-800 underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-zen-800 underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zen-800 mb-3">Más información</h2>
            <p>
              Para cualquier consulta sobre nuestra política de cookies,{' '}
              <a href="/pages/contacto" className="text-zen-800 underline">
                contáctanos a través de nuestra página de contacto
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
