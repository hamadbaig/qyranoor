'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Product, ProductColor } from '@/types/product'
import { formatPrice } from '@/lib/products'

interface Props {
  product: Product
  selectedColor: ProductColor
  selectedSize: string | null
}

function buildWAMessage(product: Product, color: ProductColor, size: string | null) {
  const lines = [
    `Hello Qyra Noor,`,
    ``,
    `I am interested in:`,
    ``,
    `Product: ${product.name}`,
    `Colour:  ${color.name}`,
    size ? `Size:    ${size}` : `Size:    (Please advise)`,
    `Price:   ${formatPrice(product.price, product.currencySymbol)}`,
    ``,
    `Please provide more details.`,
  ]
  return encodeURIComponent(lines.join('\n'))
}

export default function StickyBar({ product, selectedColor, selectedSize }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const waUrl = `https://wa.me/${product.whatsappNumber}?text=${buildWAMessage(product, selectedColor, selectedSize)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-warm-200 shadow-luxury-lg"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            {/* Thumbnail */}
            <div className="relative w-12 h-14 flex-shrink-0 overflow-hidden bg-warm-100 hidden sm:block">
              <Image
                src={selectedColor.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-sans text-warm-500 truncate">{product.collection}</p>
              <p className="text-sm font-sans font-semibold text-warm-900 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="w-3 h-3 rounded-full border border-warm-200"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-xs font-sans text-warm-500">
                  {selectedColor.name}{selectedSize ? ` · ${selectedSize}` : ''}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0 hidden sm:block">
              <p className="font-serif text-lg text-warm-950">
                {formatPrice(product.price, product.currencySymbol)}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-warm-400 line-through">
                  {formatPrice(product.originalPrice, product.currencySymbol)}
                </p>
              )}
            </div>

            {/* CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] text-white text-xs font-sans font-semibold tracking-wider uppercase px-4 sm:px-6 py-3 hover:bg-[#1fbb58] transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden sm:inline">Order via</span> WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
