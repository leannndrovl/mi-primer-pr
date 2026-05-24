'use client'

import { cn } from '@/lib/utils'
import type { ProductOption } from '@/types/shopify'

interface VariantSelectorProps {
  options: ProductOption[]
  selectedOptions: Record<string, string>
  onChange: (name: string, value: string) => void
  unavailableOptions?: Set<string>
}

const COLOR_MAP: Record<string, string> = {
  negro: '#1a1a1a', black: '#1a1a1a',
  blanco: '#f5f5f5', white: '#f5f5f5',
  rojo: '#dc2626', red: '#dc2626',
  azul: '#2563eb', blue: '#2563eb',
  verde: '#16a34a', green: '#16a34a',
  amarillo: '#eab308', yellow: '#eab308',
  rosa: '#ec4899', pink: '#ec4899',
  gris: '#6b7280', gray: '#6b7280', grey: '#6b7280',
  morado: '#7c3aed', purple: '#7c3aed',
  naranja: '#f97316', orange: '#f97316',
  dorado: '#d97706', gold: '#d97706',
  plateado: '#9ca3af', silver: '#9ca3af',
}

function isColorOption(name: string): boolean {
  return ['color', 'colour', 'color/acabado'].includes(name.toLowerCase())
}

export function VariantSelector({
  options,
  selectedOptions,
  onChange,
  unavailableOptions = new Set(),
}: VariantSelectorProps) {
  if (options.length === 0) return null
  if (options.length === 1 && options[0].name === 'Title') return null

  return (
    <div className="space-y-5">
      {options.map((option) => {
        const isColor = isColorOption(option.name)

        return (
          <div key={option.id}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-zen-800">{option.name}</span>
              <span className="text-sm text-zen-500">
                {selectedOptions[option.name]}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value
                const key = `${option.name}-${value}`
                const isUnavailable = unavailableOptions.has(key)
                const colorHex = isColor
                  ? COLOR_MAP[value.toLowerCase()]
                  : undefined

                if (isColor && colorHex) {
                  return (
                    <button
                      key={value}
                      onClick={() => !isUnavailable && onChange(option.name, value)}
                      disabled={isUnavailable}
                      title={value}
                      aria-label={`${option.name}: ${value}${isUnavailable ? ' (agotado)' : ''}`}
                      className={cn(
                        'relative h-9 w-9 rounded-full transition-all duration-150 btn-press',
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-zen-900 scale-110'
                          : 'ring-1 ring-zen-200 hover:ring-zen-400 hover:scale-105',
                        isUnavailable && 'opacity-40 cursor-not-allowed'
                      )}
                      style={{ backgroundColor: colorHex }}
                    >
                      {isUnavailable && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="block h-[1px] w-full rotate-45 bg-zen-600/60" />
                        </span>
                      )}
                    </button>
                  )
                }

                return (
                  <button
                    key={value}
                    onClick={() => !isUnavailable && onChange(option.name, value)}
                    disabled={isUnavailable}
                    aria-label={`${option.name}: ${value}${isUnavailable ? ' (agotado)' : ''}`}
                    className={cn(
                      'relative h-9 min-w-[36px] rounded-lg border px-3 text-sm font-medium transition-all duration-150 btn-press',
                      isSelected
                        ? 'border-zen-900 bg-zen-900 text-white'
                        : 'border-zen-200 bg-white text-zen-700 hover:border-zen-400',
                      isUnavailable &&
                        'cursor-not-allowed opacity-40 line-through'
                    )}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
