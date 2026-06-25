'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const COLLECTIONS = [
  {
    title: 'Open Abayas',
    subtitle: 'Effortless everyday elegance',
    href: '/products/luxury-nida-open-abaya',
    image: 'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=80',
    count: '12 Styles',
    span: 'lg:row-span-2',
    aspect: 'aspect-[4/5] lg:aspect-auto lg:h-full',
  },
  {
    title: 'Butterfly Abayas',
    subtitle: 'Flowing grace, timeless beauty',
    href: '/products/butterfly-abaya-embroidered',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80',
    count: '8 Styles',
    span: '',
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Occasion Wear',
    subtitle: 'For moments that matter',
    href: '/products/pearl-beaded-abaya',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    count: '6 Styles',
    span: '',
    aspect: 'aspect-[4/3]',
  },
]

export default function CollectionGrid() {
  return (
    <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
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
              Curated For You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif text-3xl sm:text-4xl text-warm-950"
            >
              Our Collections
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link href="/#featured" className="text-xs font-sans tracking-luxury uppercase text-gold hover:text-gold-700 transition-colors flex items-center gap-1.5">
              View All Styles <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:h-[700px]">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden bg-warm-100 ${col.span} ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <Link href={col.href} className={`block w-full ${col.aspect}`}>
                <div className="relative w-full h-full min-h-[280px]">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <span className="inline-block text-[10px] font-sans tracking-luxury uppercase text-gold mb-2">
                      {col.count}
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-1">{col.title}</h3>
                    <p className="text-xs font-sans text-white/60 mb-4">{col.subtitle}</p>

                    <span className="inline-flex items-center gap-2 text-[11px] font-sans tracking-widest uppercase text-white border-b border-white/40 pb-0.5 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                      Shop Now
                      <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
