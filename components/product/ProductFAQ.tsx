'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { ProductFAQItem } from '@/types/product'

function FAQItem({ item, index }: { item: ProductFAQItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`border-b border-warm-200 last:border-0 ${open ? 'bg-gold/5' : ''} transition-colors`}
    >
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between gap-4 py-5 px-0 text-left group"
        aria-expanded={open}
      >
        <span className={`text-sm font-sans font-medium leading-snug transition-colors ${
          open ? 'text-warm-950' : 'text-warm-700 group-hover:text-warm-900'
        }`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border transition-all ${
          open ? 'border-gold bg-gold text-white' : 'border-warm-300 text-warm-500 group-hover:border-warm-500'
        }`}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm font-sans text-warm-600 leading-relaxed pr-10">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ProductFAQ({ faqs }: { faqs: ProductFAQItem[] }) {
  if (!faqs.length) return null

  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-gold text-center mb-2"
        >
          Questions & Answers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-center text-warm-900 mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="divide-y-0">
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm font-sans text-warm-500">
            Have a different question?{' '}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-700 font-medium transition-colors"
            >
              Contact us on WhatsApp →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
