'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types/product'

function formatPrice(price: number, symbol: string) {
  return `${symbol} ${price.toLocaleString('en-PK')}`
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const imgs = product.colors[0]?.images ?? []
  const imgSrc = imgs[Math.min(imgIdx, Math.max(0, imgs.length - 1))]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block group"
        onMouseEnter={() => { setHovered(true); setImgIdx(1) }}
        onMouseLeave={() => { setHovered(false); setImgIdx(0) }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-warm-100 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.originalPrice && (
              <span className="text-[10px] font-sans font-semibold bg-gold text-warm-950 px-2 py-0.5 tracking-wide">
                SALE
              </span>
            )}
            {product.stockCount && product.stockCount <= 5 && (
              <span className="text-[10px] font-sans font-semibold bg-warm-950 text-white px-2 py-0.5 tracking-wide">
                LOW STOCK
              </span>
            )}
          </div>

          {/* Color dots */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {product.colors.slice(0, 5).map(c => (
              <span
                key={c.name}
                className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-sm"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Quick shop overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 inset-x-0 bg-warm-950/90 backdrop-blur-sm py-3 px-4 text-center"
          >
            <span className="text-[11px] font-sans tracking-widest uppercase text-white">Quick View</span>
          </motion.div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[10px] font-sans text-gold tracking-luxury uppercase mb-1">{product.collection}</p>
          <h3 className="font-serif text-lg text-warm-900 group-hover:text-gold transition-colors leading-tight mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-sans font-medium text-warm-800">
              {formatPrice(product.price, product.currencySymbol)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-sans text-warm-400 line-through">
                {formatPrice(product.originalPrice, product.currencySymbol)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface Props {
  products: Product[]
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-dark">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="label-gold mb-2"
            >
              Handpicked For You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif text-3xl sm:text-4xl text-warm-950"
            >
              New Arrivals
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products/luxury-nida-open-abaya"
              className="group inline-flex items-center gap-2 text-xs font-sans tracking-luxury uppercase text-warm-600 hover:text-gold transition-colors"
            >
              View All
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
