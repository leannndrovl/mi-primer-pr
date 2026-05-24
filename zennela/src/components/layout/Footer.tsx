import Link from 'next/link'

const LINKS = {
  Tienda: [
    { href: '/collections/all', label: 'Todos los productos' },
    { href: '/collections/all', label: 'Llaveros click' },
  ],
  Ayuda: [
    { href: '/pages/envios', label: 'Información de envíos' },
    { href: '/pages/faq', label: 'Preguntas frecuentes' },
    { href: '/pages/contacto', label: 'Contacto' },
    { href: '/pages/sobre-nosotros', label: 'Sobre Zennela' },
  ],
  Legal: [
    { href: '/pages/privacidad', label: 'Privacidad' },
    { href: '/pages/cookies', label: 'Cookies' },
    { href: '/pages/terminos', label: 'Términos y condiciones' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-zen-200 bg-zen-50">
      <div className="container-zen py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-widest text-zen-900 uppercase">
              ZENNELA
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zen-500 max-w-xs">
              Llaveros premium con teclas click. Diseñados para quienes aprecian la calidad
              en los detalles cotidianos.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zen-400 hover:text-zen-700 transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zen-400 hover:text-zen-700 transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.79 1.52v-3.4a4.85 4.85 0 01-1.02-.12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zen-800 mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zen-500 hover:text-zen-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-zen-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zen-400">
            © {new Date().getFullYear()} Zennela. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'PayPal', 'Bizum'].map((method) => (
              <span
                key={method}
                className="rounded bg-white border border-zen-200 px-2 py-0.5 text-xs text-zen-500"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
