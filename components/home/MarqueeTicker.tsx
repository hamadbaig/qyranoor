'use client'

import { motion } from 'framer-motion'

const ITEMS = [
  'Premium Nida Fabric',
  'Handcrafted Quality',
  'WhatsApp Easy Ordering',
  'Pakistan-wide Delivery',
  '7-Day Easy Returns',
  'Custom Sizing Available',
  'Colour-Fast Technology',
  'Modest & Elegant',
]

export default function MarqueeTicker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="bg-gold overflow-hidden py-3.5">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-0 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6 text-[11px] font-sans tracking-luxury uppercase text-warm-950 font-semibold">
            {item}
            <span className="text-warm-950/40 text-lg leading-none">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
