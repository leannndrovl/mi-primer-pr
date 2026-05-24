const ITEMS = [
  'Click satisfactorio garantizado',
  'Materiales premium certificados',
  'Diseño ultra compacto',
  'Envío gratis en pedidos +25€',
  '5.200+ clientes satisfechos',
  'Valoración 4.8 / 5',
  'Fabricación de alta calidad',
  'Diseño exclusivo en 4 colores pastel',
]

export function Marquee() {
  const items = [...ITEMS, ...ITEMS]

  return (
    <div
      className="relative overflow-hidden py-4 border-y border-zen-100"
      style={{
        background: 'linear-gradient(90deg, #FEF6FB 0%, #F5EEFF 35%, #EAF4FF 65%, #EEF9F5 100%)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}
    >
      <style>{`
        @keyframes marquee-run {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: 'marquee-run 20s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zen-600 px-7">
              {item}
            </span>
            <span
              className="flex-shrink-0 h-1 w-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #F9C4D4, #D4B8F0)' }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
