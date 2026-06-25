'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Feather, Weight, Sun, Droplets, MapPin } from 'lucide-react'
import { FabricInfo as FabricInfoType } from '@/types/product'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cards: { key: keyof FabricInfoType; label: string; Icon: React.ElementType<any> }[] = [
  { key: 'type',     label: 'Fabric Type',  Icon: Layers },
  { key: 'softness', label: 'Softness',     Icon: Feather },
  { key: 'weight',   label: 'Weight',       Icon: Weight },
  { key: 'season',   label: 'Season',       Icon: Sun },
  { key: 'care',     label: 'Care',         Icon: Droplets },
  { key: 'origin',   label: 'Origin',       Icon: MapPin },
]

export default function FabricInfo({ fabricInfo }: { fabricInfo: FabricInfoType }) {
  return (
    <section className="py-12 px-6 bg-warm-950">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-luxury uppercase font-sans text-gold text-center mb-2"
        >
          Material
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-cream text-center mb-8"
        >
          Fabric Information
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-warm-800">
          {cards.map(({ key, label, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-warm-950 p-5 hover:bg-warm-900 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-warm-700 group-hover:border-gold/50 transition-colors mt-0.5">
                  <Icon size={15} className="text-gold" />
                </span>
                <div>
                  <p className="text-[10px] font-sans tracking-luxury uppercase text-warm-500 mb-1">{label}</p>
                  <p className="text-sm font-sans text-cream font-medium">{fabricInfo[key]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
