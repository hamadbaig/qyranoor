'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/products'

function ProductCard({ product }: { product: Product }) {
  const [imgIdx, setImgIdx] = useState(0)
  const firstColor = product.colors[0]

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-warm-100"
        onMouseEnter={() => setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={firstColor.images[Math.min(imgIdx, firstColor.images.length - 1)]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {product.originalPrice && (
          <span className="absolute top-3 left-3 text-[10px] font-sans font-semibold bg-gold text-white px-2 py-0.5 tracking-wide">
            SALE
          </span>
        )}

        {/* Color dots */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {product.colors.slice(0, 4).map(c => (
            <span
              key={c.name}
              className="w-3 h-3 rounded-full border border-white/70 shadow-sm"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="w-3 h-3 rounded-full bg-white/60 flex items-center justify-center text-[6px] text-warm-700">
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-0.5">
        <p className="text-[10px] font-sans text-gold tracking-luxury uppercase">{product.collection}</p>
        <h3 className="font-serif text-base text-warm-900 group-hover:text-gold transition-colors leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm font-sans font-medium text-warm-800">
            {formatPrice(product.price, product.currencySymbol)}
          </p>
          {product.originalPrice && (
            <p className="text-xs font-sans text-warm-400 line-through">
              {formatPrice(product.originalPrice, product.currencySymbol)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function RelatedProducts({ products }: { products: Product[] }) {
  const [offset, setOffset] = useState(0)
  const visible = 4
  const max = Math.max(0, products.length - visible)

  if (!products.length) return null

  return (
    <section className="py-12 px-6 bg-cream-dark border-t border-warm-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-gold mb-1">Explore More</p>
            <h2 className="font-serif text-2xl text-warm-900">You May Also Like</h2>
          </div>
          {max > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setOffset(p => Math.max(0, p - 1))}
                disabled={offset === 0}
                className="p-2.5 border border-warm-200 hover:border-warm-400 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} className="text-warm-700" />
              </button>
              <button
                onClick={() => setOffset(p => Math.min(max, p + 1))}
                disabled={offset >= max}
                className="p-2.5 border border-warm-200 hover:border-warm-400 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} className="text-warm-700" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(offset, offset + visible).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
