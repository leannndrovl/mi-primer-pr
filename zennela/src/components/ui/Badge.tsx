import { cn } from '@/lib/utils'

type BadgeVariant = 'sale' | 'new' | 'bestseller' | 'soldout' | 'limited'

const variants: Record<BadgeVariant, string> = {
  sale:       'bg-red-100 text-red-700 border-red-200',
  new:        'bg-gold-100 text-gold-700 border-gold-200',
  bestseller: 'bg-zen-900 text-white border-transparent',
  soldout:    'bg-zen-100 text-zen-500 border-zen-200',
  limited:    'bg-orange-100 text-orange-700 border-orange-200',
}

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

const DEFAULT_LABELS: Record<BadgeVariant, string> = {
  sale:       'Oferta',
  new:        'Nuevo',
  bestseller: '⭐ Más vendido',
  soldout:    'Agotado',
  limited:    '🔥 Últimas unidades',
}

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {label ?? DEFAULT_LABELS[variant]}
    </span>
  )
}
