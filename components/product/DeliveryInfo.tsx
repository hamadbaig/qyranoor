'use client'

import { motion } from 'framer-motion'
import { Truck, RotateCcw, ArrowLeftRight, MapPin, Package } from 'lucide-react'
import { Product } from '@/types/product'

export default function DeliveryInfo({ deliveryInfo }: { deliveryInfo: Product['deliveryInfo'] }) {
  const items = [
    {
      Icon: Truck,
      title: 'Estimated Delivery',
      value: deliveryInfo.estimatedDays,
      note: deliveryInfo.freeShippingThreshold
        ? `Free shipping on orders above PKR ${deliveryInfo.freeShippingThreshold.toLocaleString()}`
        : undefined,
    },
    {
      Icon: MapPin,
      title: 'Shipping Regions',
      value: deliveryInfo.regions[0],
      note: deliveryInfo.regions[1],
    },
    {
      Icon: RotateCcw,
      title: 'Return Policy',
      value: deliveryInfo.returnPolicy,
    },
    {
      Icon: ArrowLeftRight,
      title: 'Exchange Policy',
      value: deliveryInfo.exchangePolicy,
    },
  ]

  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-gold text-center mb-2"
        >
          Shipping & Returns
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-center text-warm-900 mb-8"
        >
          Delivery Information
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(({ Icon, title, value, note }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-5 bg-white border border-warm-200 hover:border-gold/30 hover:shadow-luxury transition-all duration-300"
            >
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gold/10">
                <Icon size={18} className="text-gold" />
              </span>
              <div>
                <p className="text-xs font-sans tracking-wide uppercase text-warm-500 font-medium mb-1">{title}</p>
                <p className="text-sm font-sans text-warm-800">{value}</p>
                {note && <p className="text-xs font-sans text-warm-500 mt-1">{note}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Packaging note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex items-center gap-3 p-4 bg-gold/5 border border-gold/20"
        >
          <Package size={16} className="text-gold flex-shrink-0" />
          <p className="text-xs font-sans text-warm-600">
            Every Qyra Noor order is carefully packaged in our signature gift box — perfect for gifting.
            Complimentary gift wrapping available on request via WhatsApp.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
