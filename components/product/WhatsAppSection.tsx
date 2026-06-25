'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Share2, Heart } from 'lucide-react'
import { Product, ProductColor } from '@/types/product'
import { formatPrice } from '@/lib/products'

interface Props {
  product: Product
  selectedColor: ProductColor
  selectedSize: string | null
}

function buildWhatsAppMessage(product: Product, color: ProductColor, size: string | null): string {
  const lines = [
    `Hello Qyra Noor,`,
    ``,
    `I am interested in:`,
    ``,
    `Product: ${product.name}`,
    `Colour:  ${color.name}`,
    size ? `Size:    ${size}` : `Size:    (Please advise)`,
    `Price:   ${formatPrice(product.price, product.currencySymbol)}`,
    `SKU:     ${product.sku}`,
    ``,
    `Please provide more details.`,
  ]
  return encodeURIComponent(lines.join('\n'))
}

export default function WhatsAppSection({ product, selectedColor, selectedSize }: Props) {
  const message = buildWhatsAppMessage(product, selectedColor, selectedSize)
  const waUrl = `https://wa.me/${product.whatsappNumber}?text=${message}`

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-3">
      {/* Main WhatsApp CTA */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="btn-whatsapp w-full text-base py-4 font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Order on WhatsApp
      </motion.a>

      {/* Secondary actions */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-sans tracking-wider uppercase border border-warm-200 py-3 hover:border-warm-400 hover:bg-white transition-all text-warm-600"
        >
          <Share2 size={13} />
          Share
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-sans tracking-wider uppercase border border-warm-200 py-3 hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all text-warm-600">
          <Heart size={13} />
          Wishlist
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {[
          { icon: '🔒', label: 'Secure Order' },
          { icon: '↩️', label: '7-Day Returns' },
          { icon: '✓', label: 'Verified Quality' },
        ].map(badge => (
          <div key={badge.label} className="flex flex-col items-center gap-1 py-2 bg-warm-50 border border-warm-100">
            <span className="text-base leading-none">{badge.icon}</span>
            <span className="text-[10px] font-sans text-warm-500 tracking-wide text-center">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
