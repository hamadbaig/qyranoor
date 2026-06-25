'use client'

import { motion } from 'framer-motion'
import { ProductColor } from '@/types/product'

interface Props {
  colors: ProductColor[]
  selected: ProductColor
  onChange: (color: ProductColor) => void
}

export default function ColorSelector({ colors, selected, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-sans tracking-luxury uppercase text-warm-500">Colour</span>
        <motion.span
          key={selected.name}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-sans font-medium text-warm-800 tracking-wide"
        >
          {selected.name}
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        {colors.map(color => {
          const isSelected = color.name === selected.name
          const isLight = isLightColor(color.hex)

          return (
            <div key={color.name} className="relative group">
              <motion.button
                onClick={() => onChange(color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-8 h-8 rounded-full transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-gold ring-offset-2' : 'hover:ring-1 hover:ring-warm-400 hover:ring-offset-1'
                } ${isLight ? 'border border-warm-300' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId="color-selected"
                    className={`absolute inset-0 rounded-full flex items-center justify-center`}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke={isLight ? '#1a1a1a' : 'white'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>

              {/* Tooltip */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <span className="whitespace-nowrap text-[10px] font-sans bg-warm-900 text-white px-2 py-0.5">
                  {color.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
