'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ProductSize } from '@/types/product'

interface Props {
  open: boolean
  onClose: () => void
  sizes: ProductSize[]
}

export default function SizeGuideModal({ open, onClose, sizes }: Props) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="relative bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto sm:mx-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-cream border-b border-warm-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <p className="label-gold">Size Guide</p>
                <h2 className="font-serif text-xl text-warm-900 mt-0.5">Find Your Perfect Fit</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-warm-100 transition-colors"
              >
                <X size={18} className="text-warm-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Measurements note */}
              <p className="text-sm text-warm-600 font-sans mb-6 leading-relaxed">
                All measurements are in centimetres (cm). For the best fit, measure over your innerwear.
                If you are between sizes, we recommend sizing up for a more comfortable modest fit.
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="bg-warm-900 text-white">
                      <th className="px-4 py-3 text-left tracking-wider uppercase text-xs font-medium">Size</th>
                      <th className="px-4 py-3 text-center tracking-wider uppercase text-xs font-medium">Chest</th>
                      <th className="px-4 py-3 text-center tracking-wider uppercase text-xs font-medium">Waist</th>
                      <th className="px-4 py-3 text-center tracking-wider uppercase text-xs font-medium">Hips</th>
                      <th className="px-4 py-3 text-center tracking-wider uppercase text-xs font-medium">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, i) => (
                      <tr
                        key={size.label}
                        className={`border-b border-warm-100 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-cream'
                        } ${!size.available ? 'opacity-40' : ''}`}
                      >
                        <td className="px-4 py-3 font-semibold text-warm-900">{size.label}</td>
                        <td className="px-4 py-3 text-center text-warm-600">{size.measurements.chest}</td>
                        <td className="px-4 py-3 text-center text-warm-600">{size.measurements.waist}</td>
                        <td className="px-4 py-3 text-center text-warm-600">{size.measurements.hips}</td>
                        <td className="px-4 py-3 text-center text-warm-600">{size.measurements.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* How to measure */}
              <div className="mt-8 bg-warm-50 border border-warm-200 p-5">
                <h3 className="font-serif text-lg text-warm-900 mb-4">How to Measure</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Chest', instruction: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.' },
                    { label: 'Waist', instruction: 'Measure around your natural waistline — the narrowest part of your torso.' },
                    { label: 'Hips', instruction: 'Measure around the fullest part of your hips and seat, about 20 cm below your waist.' },
                    { label: 'Length', instruction: 'Measured from the highest point of the shoulder to the hem. Abaya length is floor-length.' },
                  ].map(item => (
                    <div key={item.label} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-warm-900 tracking-wide uppercase mb-1">{item.label}</p>
                        <p className="text-xs text-warm-600 leading-relaxed">{item.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-xs text-warm-500 font-sans text-center">
                Need a custom size? Contact us on WhatsApp for made-to-measure options.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
