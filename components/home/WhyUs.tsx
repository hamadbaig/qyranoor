'use client'

import { motion } from 'framer-motion'
import { Gem, MessageCircle, Truck, RotateCcw, Ruler, Shield } from 'lucide-react'

const FEATURES = [
  {
    Icon: Gem,
    title: 'Premium Fabrics',
    desc: 'Only the finest Nida, crepe, and chiffon sourced from certified mills.',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp Ordering',
    desc: 'Order effortlessly via WhatsApp — no apps, no hassle, just instant service.',
  },
  {
    Icon: Truck,
    title: 'Pakistan-wide Delivery',
    desc: 'Fast delivery to all major cities in 3–5 business days.',
  },
  {
    Icon: RotateCcw,
    title: '7-Day Easy Returns',
    desc: 'Not happy? Return within 7 days with zero questions asked.',
  },
  {
    Icon: Ruler,
    title: 'Custom Sizing',
    desc: 'Made-to-measure options available for the perfect fit every time.',
  },
  {
    Icon: Shield,
    title: 'Quality Guaranteed',
    desc: 'Every piece is inspected before dispatch. Excellence is non-negotiable.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-28 bg-warm-950 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-sans tracking-luxury uppercase text-gold mb-3"
          >
            The Qyra Noor Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-serif text-3xl sm:text-4xl text-white"
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-0.5 w-16 bg-gold mx-auto mt-5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-warm-800">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-warm-950 p-8 lg:p-10 group hover:bg-warm-900 transition-colors duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-warm-700 group-hover:border-gold/60 transition-colors mb-6">
                <Icon size={20} className="text-gold" />
              </div>
              <h3 className="font-serif text-xl text-white mb-3">{title}</h3>
              <p className="text-sm font-sans text-warm-500 leading-relaxed group-hover:text-warm-400 transition-colors">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
