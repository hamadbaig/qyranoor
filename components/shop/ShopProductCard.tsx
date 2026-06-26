'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'

interface Props {
  product: Product
  index:   number
}

export default function ShopProductCard({ product, index }: Props) {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.4) }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block group"
        onMouseEnter={() => setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-warm-100 mb-3">
          {(() => {
            const imgs = product.colors[0]?.images ?? []
            const src = imgs[Math.min(imgIdx, Math.max(0, imgs.length - 1))]
            return src ? (
              <Image
                src={src}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : null
          })()}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.originalPrice && (
              <span className="text-[9px] font-sans font-bold bg-gold text-warm-950 px-2 py-0.5 tracking-widest uppercase">
                Sale
              </span>
            )}
            {product.stockCount !== undefined && product.stockCount <= 5 && product.stockCount > 0 && (
              <span className="text-[9px] font-sans font-bold bg-warm-950 text-white px-2 py-0.5 tracking-widest uppercase">
                {product.stockCount} Left
              </span>
            )}
            {!product.inStock && (
              <span className="text-[9px] font-sans font-bold bg-warm-400 text-white px-2 py-0.5 tracking-widest uppercase">
                Sold Out
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="absolute bottom-2.5 left-2.5 flex gap-1">
              {product.colors.slice(0, 5).map(c => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-white/80 shadow-sm"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 py-2.5 bg-warm-950/85 backdrop-blur-sm text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-250">
            <span className="text-[10px] font-sans tracking-widest uppercase text-white">View Details</span>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[9px] font-sans tracking-luxury uppercase text-gold mb-0.5">{product.collection}</p>
          <h3 className="font-serif text-base text-warm-900 group-hover:text-gold transition-colors leading-snug mb-1.5">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-sans font-medium text-warm-800">
              PKR {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-sans text-warm-400 line-through">
                PKR {product.originalPrice.toLocaleString('en-PK')}
              </span>
            )}
          </div>
          {product.averageRating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gold text-[11px]">{'★'.repeat(Math.round(product.averageRating))}</span>
              <span className="text-[10px] font-sans text-warm-400">({product.totalReviews})</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
