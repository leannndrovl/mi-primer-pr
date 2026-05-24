import type { Metadata } from 'next'
import { Mail, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto — Zennela',
  description: 'Ponte en contacto con el equipo de Zennela. Te responderemos en menos de 24 horas.',
}

export default function ContactoPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="container-zen max-w-3xl">
        <h1 className="text-3xl font-bold text-zen-900 mb-2">Contacto</h1>
        <p className="text-zen-500 mb-10">Estamos aquí para ayudarte. Te respondemos en menos de 24 horas.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
          <div className="rounded-2xl border border-zen-200 bg-white p-5 text-center">
            <div className="mb-3 mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zen-50">
              <Mail size={18} className="text-zen-600" />
            </div>
            <h3 className="font-semibold text-zen-800 mb-1">Email</h3>
            <p className="text-sm text-zen-500">leandrovaldivia1409@gmail.com</p>
          </div>

          <div className="rounded-2xl border border-zen-200 bg-white p-5 text-center">
            <div className="mb-3 mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zen-50">
              <Clock size={18} className="text-zen-600" />
            </div>
            <h3 className="font-semibold text-zen-800 mb-1">Tiempo de respuesta</h3>
            <p className="text-sm text-zen-500">Menos de 24 horas en días laborables</p>
          </div>

          <div className="rounded-2xl border border-zen-200 bg-white p-5 text-center">
            <div className="mb-3 mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zen-50">
              <MessageSquare size={18} className="text-zen-600" />
            </div>
            <h3 className="font-semibold text-zen-800 mb-1">Idioma</h3>
            <p className="text-sm text-zen-500">Atendemos en español</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zen-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-zen-800 mb-1">Envíanos un mensaje</h2>
          <p className="text-sm text-zen-500 mb-6">
            Cuéntanos en qué podemos ayudarte y te responderemos lo antes posible.
          </p>

          <form
            action={`mailto:leandrovaldivia1409@gmail.com`}
            method="get"
            encType="text/plain"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zen-700 mb-1.5">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-zen-200 bg-zen-50 px-4 py-2.5 text-sm text-zen-800 placeholder:text-zen-400 focus:border-zen-400 focus:outline-none focus:ring-2 focus:ring-zen-100 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zen-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-xl border border-zen-200 bg-zen-50 px-4 py-2.5 text-sm text-zen-800 placeholder:text-zen-400 focus:border-zen-400 focus:outline-none focus:ring-2 focus:ring-zen-100 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zen-700 mb-1.5">
                Asunto
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                className="w-full rounded-xl border border-zen-200 bg-zen-50 px-4 py-2.5 text-sm text-zen-800 placeholder:text-zen-400 focus:border-zen-400 focus:outline-none focus:ring-2 focus:ring-zen-100 transition"
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-zen-700 mb-1.5">
                Mensaje
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                placeholder="Cuéntanos tu consulta con el máximo detalle posible..."
                className="w-full rounded-xl border border-zen-200 bg-zen-50 px-4 py-2.5 text-sm text-zen-800 placeholder:text-zen-400 focus:border-zen-400 focus:outline-none focus:ring-2 focus:ring-zen-100 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-zen-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zen-800 active:scale-[0.98] transition-all duration-150"
            >
              Enviar mensaje
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-zen-400">
            También puedes escribirnos directamente a{' '}
            <a href="mailto:leandrovaldivia1409@gmail.com" className="text-zen-600 underline">
              leandrovaldivia1409@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
