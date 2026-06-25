'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, X } from 'lucide-react'

interface SlimProduct {
  id: string
  slug: string
  name: string
  collection: string
  price: number
  originalPrice?: number
  currencySymbol: string
  colors: { name: string; hex: string; images: string[] }[]
}

const STORAGE_KEY = 'qn_recently_viewed'
const MAX_ITEMS = 6

export function trackProductView(productId: string) {
  if (typeof window === 'undefined') return
  const existing: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  const updated = [productId, ...existing.filter(id => id !== productId)].slice(0, MAX_ITEMS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

function formatPrice(price: number, symbol: string) {
  return `${symbol} ${price.toLocaleString('en-PK')}`
}

export default function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [recentProducts, setRecentProducts] = useState<SlimProduct[]>([])

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    const relevantIds = ids.filter(id => id !== currentProductId)
    if (!relevantIds.length) return

    fetch('/api/products')
      .then(r => r.json())
      .then((all: SlimProduct[]) => {
        const ordered = relevantIds
          .map(id => all.find(p => p.id === id))
          .filter(Boolean) as SlimProduct[]
        setRecentProducts(ordered)
      })
      .catch(() => {})
  }, [currentProductId])

  const remove = (id: string) => {
    setRecentProducts(prev => prev.filter(p => p.id !== id))
    const ids: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.filter(i => i !== id)))
  }

  if (!recentProducts.length) return null

  return (
    <section className="py-12 px-6 border-t border-warm-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={14} className="text-gold" />
          <h2 className="font-serif text-xl text-warm-900">Recently Viewed</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <AnimatePresence>
            {recentProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-shrink-0 w-36 group"
              >
                <div className="relative">
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-warm-100">
                      <Image
                        src={product.colors[0]?.images[0] ?? ''}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        sizes="144px"
                      />
                    </div>
                    <p className="mt-2 text-xs font-sans text-warm-700 leading-tight line-clamp-2 group-hover:text-gold transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs font-sans text-warm-500 mt-0.5">
                      {formatPrice(product.price, product.currencySymbol)}
                    </p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-warm-800 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    title="Remove"
                  >
                    <X size={9} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
