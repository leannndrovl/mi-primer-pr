'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  '✨ Envío gratis en pedidos +25€',
  '⭐⭐⭐⭐⭐  Valoración media 4.8 / 5 de +2,800 reseñas',
  '🎁 3 comprados = 20% de descuento automático',
]

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-zen-800 text-xs sm:text-sm py-2 text-center overflow-hidden" style={{ background: 'linear-gradient(90deg, #F9C4D4, #D4B8F0, #B8D8F0, #B8E0D4, #F8F0C8, #F9C4D4)', backgroundSize: '300% 100%', animation: 'gradientShift 8s ease infinite' }}>
      <span
        className="inline-block transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {MESSAGES[idx]}
      </span>
    </div>
  )
}
