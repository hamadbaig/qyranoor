'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Wind, Sparkles, Heart, Sun } from 'lucide-react'

const ICONS = [CheckCircle2, Wind, Sparkles, Heart, Sun, CheckCircle2]

interface Props {
  highlights: string[]
}

export default function ProductHighlights({ highlights }: Props) {
  return (
    <section className="py-12 px-6 bg-warm-50 border-y border-warm-200">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-gold text-center mb-2"
        >
          Why You'll Love It
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-center text-warm-900 mb-8"
        >
          Product Highlights
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {highlights.map((text, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-white border border-warm-200 p-4 hover:border-gold/40 hover:shadow-luxury transition-all duration-300 group"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors">
                  <Icon size={15} className="text-gold" />
                </span>
                <p className="text-sm font-sans text-warm-700 leading-snug pt-1">{text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
