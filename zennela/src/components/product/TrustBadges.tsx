import { Truck, ShieldCheck, Zap, Star } from 'lucide-react'

const BADGES = [
  {
    icon: Truck,
    title: 'Envío gratis +25€',
    desc: 'En pedidos a partir de 25€',
  },
  {
    icon: Star,
    title: '495 reseñas verificadas',
    desc: 'Valoración media 4.8/5',
  },
  {
    icon: ShieldCheck,
    title: 'Pago seguro',
    desc: 'SSL 256-bit cifrado',
  },
  {
    icon: Zap,
    title: 'Calidad premium',
    desc: 'Materiales ABS de alta densidad',
  },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {BADGES.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex items-start gap-2.5 rounded-xl border border-zen-200 bg-white/60 px-3 py-3"
        >
          <div className="mt-0.5 flex-shrink-0">
            <Icon size={15} className="text-gold-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-zen-800 leading-snug">{title}</p>
            <p className="text-xs text-zen-500 leading-snug">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
