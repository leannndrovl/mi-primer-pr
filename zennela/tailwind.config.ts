import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          50:  '#FDFAFF',
          100: '#F5EEFF',
          200: '#EAD8F8',
          300: '#D4B8F0',
          400: '#B898D8',
          500: '#9278B8',
          600: '#6E5490',
          700: '#4A3470',
          800: '#3A2D5C',
          900: '#2A1F44',
        },
        gold: {
          50:  '#FEF4FF',
          100: '#F8DAFE',
          200: '#EEB8FC',
          300: '#DC90F0',
          400: '#C46EE0',
          500: '#A84ECA',
          600: '#8A3AAA',
          700: '#6C2888',
          800: '#4E1A66',
          900: '#340E46',
        },
        pastel: {
          pink:          '#F9C4D4',
          purple:        '#D4B8F0',
          mint:          '#B8E0D4',
          blue:          '#B8D8F0',
          cream:         '#F8F0C8',
          'pink-light':  '#FEF0F5',
          'purple-light':'#F0E8FC',
          'mint-light':  '#E8F8F4',
          'blue-light':  '#E4F2FC',
          'cream-light': '#FDFAEE',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':       'marquee 25s linear infinite',
        'marquee2':      'marquee2 25s linear infinite',
        'fade-in':       'fade-in 0.6s ease-out forwards',
        'slide-up':      'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right':   'slide-right 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-dot':     'pulse-dot 1.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
