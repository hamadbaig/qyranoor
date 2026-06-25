'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/product'

const TABS = [
  { key: 'overview',    label: 'Overview' },
  { key: 'fabricDetails', label: 'Fabric Details' },
  { key: 'stylingRecommendations', label: 'Styling Tips' },
  { key: 'careInstructions', label: 'Care' },
] as const

type TabKey = typeof TABS[number]['key']

export default function ProductDescription({ description }: { description: Product['description'] }) {
  const [active, setActive] = useState<TabKey>('overview')

  const content = description[active]

  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-gold text-center mb-2"
        >
          Details
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-center text-warm-900 mb-8"
        >
          Product Description
        </motion.h2>

        {/* Tab bar */}
        <div className="flex border-b border-warm-200 mb-8 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative px-5 py-3 text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-colors flex-shrink-0 ${
                active === tab.key
                  ? 'text-warm-900 font-semibold'
                  : 'text-warm-400 hover:text-warm-700'
              }`}
            >
              {tab.label}
              {active === tab.key && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto"
          >
            {active === 'careInstructions' ? (
              <div className="space-y-2">
                {content.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-warm-100 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <p className="text-sm font-sans text-warm-600 leading-relaxed">
                      {line.replace(/^•\s?/, '')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm font-sans text-warm-600 leading-loose">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
