'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export interface BrandStorySettings {
  label?: string
  heading?: string
  paragraphs?: string[]
  image?: string
  badgeNum?: string
  badgeLabel?: string
  stats?: { num: string; label: string }[]
  ctaText?: string
  ctaLink?: string
}

const DEFAULTS: Required<BrandStorySettings> = {
  label: 'Our Philosophy',
  heading: 'The Qyra Noor Story',
  paragraphs: [
    'Qyra Noor was born from a simple belief — that modest fashion should never compromise on luxury. Founded in Pakistan by a team of passionate designers and fabric specialists, we set out to redefine what it means to dress modestly.',
    'Every abaya we create begins with sourcing the finest Nida, crepe, and chiffon fabrics. Our master craftswomen spend hours perfecting each silhouette, each seam, each finishing detail — because we know that when you feel beautiful, you carry yourself differently.',
    'Today, Qyra Noor serves hundreds of women across Pakistan and beyond, delivering pieces that blend modern sensibility with timeless modest grace.',
  ],
  image: '/images/abaya%204.jfif',
  badgeNum: '10+',
  badgeLabel: 'Years of Craft',
  stats: [
    { num: '500+', label: 'Customers' },
    { num: '50+',  label: 'Styles' },
    { num: '4.9',  label: 'Avg. Rating' },
  ],
  ctaText: 'Chat With Our Team',
  ctaLink: 'https://wa.me/923347573726',
}

interface Props { settings?: BrandStorySettings }

export default function BrandStory({ settings }: Props) {
  const s = {
    ...DEFAULTS,
    ...settings,
    paragraphs: settings?.paragraphs?.length ? settings.paragraphs : DEFAULTS.paragraphs,
    stats: settings?.stats?.length ? settings.stats : DEFAULTS.stats,
  }

  return (
    <section id="story" className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={s.image}
                alt={s.heading}
                fill
                quality={100}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-3/4 h-3/4 border border-gold/30 -z-10 hidden lg:block" />
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-gold flex flex-col items-center justify-center text-center hidden lg:flex">
              <p className="font-serif text-2xl text-warm-950 leading-none">{s.badgeNum}</p>
              <p className="text-[9px] font-sans tracking-wider uppercase text-warm-800 mt-1">{s.badgeLabel}</p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          >
            <p className="label-gold mb-3">{s.label}</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-950 leading-tight mb-6">
              {s.heading}
            </h2>

            <div className="space-y-4 mb-8">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-base font-sans text-warm-600 leading-loose">{p}</p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {s.stats.map(v => (
                <div key={v.label} className="text-center border border-warm-200 py-4">
                  <p className="font-serif text-2xl text-warm-950">{v.num}</p>
                  <p className="text-[10px] font-sans tracking-wide uppercase text-warm-500 mt-0.5">{v.label}</p>
                </div>
              ))}
            </div>

            <a
              href={s.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-warm-950 border-b-2 border-gold pb-1 hover:text-gold transition-colors"
            >
              {s.ctaText}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
