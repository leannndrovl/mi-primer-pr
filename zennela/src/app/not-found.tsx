import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-6xl font-black text-zen-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zen-900">Página no encontrada</h1>
      <p className="mt-3 text-zen-500 max-w-sm">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-zen-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zen-800 transition-colors btn-press"
      >
        <ArrowLeft size={15} /> Volver al inicio
      </Link>
    </div>
  )
}
