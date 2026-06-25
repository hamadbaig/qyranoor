'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ruler } from 'lucide-react'
import { ProductSize } from '@/types/product'
import SizeGuideModal from './SizeGuideModal'

interface Props {
  sizes: ProductSize[]
  selected: string | null
  onChange: (size: string) => void
}

export default function SizeSelector({ sizes, selected, onChange }: Props) {
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-sans tracking-luxury uppercase text-warm-500">Size</span>
          <button
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-1.5 text-xs font-sans text-gold hover:text-gold-700 transition-colors"
          >
            <Ruler size={12} />
            Size Guide
          </button>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {sizes.map(size => {
            const isSelected = selected === size.label
            const isUnavailable = !size.available

            return (
              <motion.button
                key={size.label}
                onClick={() => !isUnavailable && onChange(size.label)}
                whileHover={!isUnavailable ? { scale: 1.03 } : {}}
                whileTap={!isUnavailable ? { scale: 0.97 } : {}}
                disabled={isUnavailable}
                className={`relative py-2.5 text-center text-xs font-sans font-medium tracking-wider uppercase transition-all duration-200
                  ${isSelected
                    ? 'bg-warm-950 text-white'
                    : isUnavailable
                    ? 'bg-warm-100 text-warm-300 cursor-not-allowed'
                    : 'bg-white border border-warm-200 text-warm-700 hover:border-gold hover:text-warm-900'
                  }`}
                title={isUnavailable ? 'Out of stock' : size.label}
              >
                {size.label}
                {isUnavailable && (
                  <span
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden
                  >
                    <span className="absolute w-full h-px bg-warm-300 rotate-[-35deg]" />
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>

        {!selected && (
          <p className="mt-2 text-[11px] text-warm-400 font-sans">Please select a size to order</p>
        )}
      </div>

      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} sizes={sizes} />
    </>
  )
}
