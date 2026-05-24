'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { AnnouncementBar } from './AnnouncementBar'

function ZennelaLogo() {
  return (
    <span className="flex items-center gap-2.5 select-none">
      {/* 2×2 keycap grid icon */}
      <svg width="46" height="46" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        {/* top-left: pink */}
        <rect x="0" y="0" width="13" height="13" rx="3.5" fill="#F9C4D4"/>
        {/* top-right: lavender */}
        <rect x="17" y="0" width="13" height="13" rx="3.5" fill="#D4B8F0"/>
        {/* bottom-left: mint */}
        <rect x="0" y="17" width="13" height="13" rx="3.5" fill="#B8E0D4"/>
        {/* bottom-right: blue */}
        <rect x="17" y="17" width="13" height="13" rx="3.5" fill="#B8D8F0"/>
        {/* subtle shadow line bottom of each key */}
        <rect x="0"  y="10" width="13" height="3" rx="1.5" fill="#E890B0" opacity="0.35"/>
        <rect x="17" y="10" width="13" height="3" rx="1.5" fill="#B090D8" opacity="0.35"/>
        <rect x="0"  y="27" width="13" height="3" rx="1.5" fill="#88C8B8" opacity="0.35"/>
        <rect x="17" y="27" width="13" height="3" rx="1.5" fill="#88BAE0" opacity="0.35"/>
      </svg>
      <span className="text-[26px] font-bold tracking-wide text-zen-800">
        Zennela
      </span>
    </span>
  )
}

const NAV_LINKS = [
  { href: '/collections/all', label: 'Tienda' },
  { href: '/#features', label: 'Por qué Zennela' },
  { href: '/#reviews', label: 'Reseñas' },
]

export function Header() {
  const { totalItems, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'bg-zen-50/95 backdrop-blur-md shadow-sm shadow-zen-200/60'
            : 'bg-zen-50'
        )}
      >
        <div className="container-zen">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="focus-zen" aria-label="Zennela — Inicio">
              <ZennelaLogo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zen-600 hover:text-zen-900 transition-colors duration-200 focus-zen"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openCart}
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-zen-100 transition-colors duration-200 focus-zen btn-press"
                aria-label={`Carrito (${totalItems} artículos)`}
              >
                <ShoppingBag size={20} className="text-zen-700" />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zen-100 transition-colors duration-200 md:hidden focus-zen"
                aria-label="Menú"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zen-200 bg-zen-50 px-4 pb-6 pt-4">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-zen-700 hover:bg-zen-100 hover:text-zen-900 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
