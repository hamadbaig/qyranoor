'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export interface TestimonialsSettings {
  label?: string
  heading?: string
  items?: { author: string; location: string; rating: number; text: string; avatar: string }[]
}

const DEFAULTS: Required<TestimonialsSettings> = {
  label: 'Real Stories',
  heading: 'Loved By Our Community',
  items: [
    { author: 'Fatima Aziz',  location: 'Karachi',    rating: 5, text: '"The quality of the Nida Open Abaya is absolutely stunning. I\'ve been looking for a premium abaya brand in Pakistan for years — Qyra Noor is exactly what I needed. The fabric is so soft and breathable, and the stitching is flawless. Already ordered two more!"', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80' },
    { author: 'Sara Mahmood', location: 'Lahore',     rating: 5, text: '"Ordered via WhatsApp and the whole process was seamless. The abaya arrived beautifully packaged in two days. The colour is exactly as shown — I got the Mocha and it\'s even more gorgeous in person. Qyra Noor has set the bar very high!"',             avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
    { author: 'Nadia Rahman', location: 'Islamabad',  rating: 5, text: '"I wear abayas daily and this is genuinely the most comfortable one I\'ve ever owned. Lightweight yet looks incredibly luxurious. The Butterfly Abaya is perfect for both office and occasions. Will definitely be recommending to all my friends!"',                   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
    { author: 'Zainab Ali',   location: 'Dubai, UAE', rating: 5, text: '"Ordered internationally and was amazed by how fast it arrived. The Pearl Beaded Abaya was worth every rupee — absolute perfection. I wore it to a wedding and received so many compliments. This brand is exceptional."',                                          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80' },
  ],
}

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="star-filled">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

interface Props { settings?: TestimonialsSettings }

export default function Testimonials({ settings }: Props) {
  const s = {
    ...DEFAULTS,
    ...settings,
    items: settings?.items?.length ? settings.items : DEFAULTS.items,
  }
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(p => (p === 0 ? s.items.length - 1 : p - 1))
  const next = () => setCurrent(p => (p === s.items.length - 1 ? 0 : p + 1))

  const review = s.items[current] ?? s.items[0]
  if (!review) return null

  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="label-gold mb-2">
            {s.label}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-serif text-3xl sm:text-4xl text-warm-950">
            {s.heading}
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white border border-warm-200 p-8 sm:p-12 shadow-luxury"
            >
              <Quote size={36} className="text-gold/30 mb-6" />
              <p className="font-serif text-lg sm:text-xl text-warm-700 leading-relaxed mb-8 italic">
                {review.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  {review.avatar && (
                    <Image src={review.avatar} alt={review.author} fill className="object-cover" sizes="56px" />
                  )}
                </div>
                <div>
                  <p className="font-sans font-semibold text-warm-900">{review.author}</p>
                  <p className="text-xs font-sans text-warm-500">{review.location}</p>
                  <div className="mt-1.5"><StarRow /></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {s.items.map((_, i) => (
                <button key={i} type="button" aria-label={`Go to review ${i + 1}`} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-gold' : 'w-4 bg-warm-300 hover:bg-warm-400'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous review" onClick={prev} className="p-3 border border-warm-200 text-warm-600 hover:border-gold hover:text-gold transition-all">
                <ChevronLeft size={16} />
              </button>
              <button type="button" aria-label="Next review" onClick={next} className="p-3 border border-warm-200 text-warm-600 hover:border-gold hover:text-gold transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
          {s.items.map((r, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)}
              className={`text-left p-4 border transition-all duration-200 ${i === current ? 'border-gold bg-gold/5' : 'border-warm-200 hover:border-warm-400 bg-white'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  {r.avatar && <Image src={r.avatar} alt={r.author} fill className="object-cover" sizes="28px" />}
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold text-warm-800 leading-tight">{r.author}</p>
                  <p className="text-[10px] font-sans text-warm-400">{r.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="9" height="9" viewBox="0 0 24 24" className="star-filled">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
