'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'

const WHATSAPP_NUMBER = '923347573726'
const CTA_MESSAGE = encodeURIComponent(
  "Assalamu Alaikum! I'm interested in your abayas. Could you please share your latest collection and available styles?"
)

export default function WhatsAppCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-warm-950">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Gold border line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-2 mb-8"
        >
          <MessageCircle size={14} />
          <span className="text-[11px] font-sans tracking-widest uppercase">Instant WhatsApp Ordering</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
        >
          Your Dream Abaya
          <br />
          <span className="text-gold">Is One Message Away</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-base sm:text-lg font-sans text-warm-400 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Skip the checkout process. Message us directly on WhatsApp to browse our full collection,
          ask about custom sizing, or place your order in minutes — our team responds within the hour.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${CTA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp group inline-flex items-center gap-3 px-8 py-4 text-sm font-sans tracking-widest uppercase font-semibold"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalamu Alaikum! I'd like to know more about your custom sizing options.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-sans tracking-widest uppercase border border-white/30 text-white/80 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Custom Sizing Enquiry
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.36 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            'Replies within 1 hour',
            'Secure & trusted',
            'Pakistan-wide delivery',
            'International shipping',
          ].map(t => (
            <div key={t} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gold" />
              <span className="text-xs font-sans text-warm-500 tracking-wide">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gold border line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  )
}
