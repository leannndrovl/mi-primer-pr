import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { CartInit } from '@/components/layout/CartInit'

export const metadata: Metadata = {
  title: {
    default: 'Zennela — Click Keychains',
    template: '%s | Zennela',
  },
  description:
    'Llaveros con teclas click de diseño minimalista y calidad premium. Satisfacción en cada clic.',
  keywords: ['llavero', 'fidget', 'keychain', 'click', 'teclas', 'minimalista', 'premium'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Zennela',
    title: 'Zennela — Click Keychains',
    description: 'Llaveros premium con teclas click. Satisfacción en cada toque.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zennela — Click Keychains',
    description: 'Llaveros premium con teclas click. Satisfacción en cada toque.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-zen-50 text-zen-800">
        <CartInit />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
