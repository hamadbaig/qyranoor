import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ef',
          100: '#f8f0d9',
          200: '#efdead',
          300: '#e4c97a',
          400: '#d9b44a',
          500: '#c9a45a',
          DEFAULT: '#c9a45a',
          600: '#a07c35',
          700: '#7d5f28',
          800: '#5e4620',
          900: '#3d2e14',
        },
        cream: {
          light: '#fefcf9',
          DEFAULT: '#faf8f5',
          dark: '#f5f0ea',
          deeper: '#ede8e1',
        },
        warm: {
          50:  '#faf8f5',
          100: '#f5f0ea',
          200: '#e8ddd3',
          300: '#d4c9be',
          400: '#b5a89b',
          500: '#8a7d72',
          600: '#6b6560',
          700: '#4a4441',
          800: '#2d2826',
          900: '#1c1c1c',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['var(--font-jost)', 'Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury':    '0.2em',
        'widest':    '0.3em',
      },
      animation: {
        'shimmer':   'shimmer 2s linear infinite',
        'fade-up':   'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a45a 0%, #e8d5a3 50%, #c9a45a 100%)',
      },
      boxShadow: {
        'luxury':    '0 4px 40px rgba(0,0,0,0.08)',
        'luxury-lg': '0 8px 60px rgba(0,0,0,0.12)',
        'gold':      '0 0 0 2px #c9a45a',
      },
    },
  },
  plugins: [],
}

export default config
