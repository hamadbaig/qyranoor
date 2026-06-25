'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Product, ProductColor } from '@/types/product'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import WhatsAppSection from './WhatsAppSection'
import ProductHighlights from './ProductHighlights'
import ProductDescription from './ProductDescription'
import FabricInfo from './FabricInfo'
import DeliveryInfo from './DeliveryInfo'
import ProductReviews from './ProductReviews'
import ProductFAQ from './ProductFAQ'
import RelatedProducts from './RelatedProducts'
import RecentlyViewed from './RecentlyViewed'
import StickyBar from './StickyBar'
import { trackProductView } from './RecentlyViewed'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductPageClient({ product, relatedProducts }: Props) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  useEffect(() => {
    trackProductView(product.id)
  }, [product.id])

  return (
    <div>
      <Header variant="light" />

      <main className="min-h-screen bg-cream pb-24">
        {/* Hero section — Gallery + Product Info */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 xl:gap-12 items-start">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProductGallery
                selectedColor={selectedColor}
                productName={product.name}
              />
            </motion.div>

            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="lg:sticky lg:top-20 space-y-5"
            >
              <ProductInfo product={product} />

              <div className="border-t border-warm-200 pt-5 space-y-5">
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={color => {
                    setSelectedColor(color)
                    setSelectedSize(null)
                  }}
                />

                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>

              <div className="border-t border-warm-200 pt-5">
                <WhatsAppSection
                  product={product}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              </div>

              {/* Gold divider */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 h-px bg-warm-200" />
                <span className="text-gold text-lg">&#10022;</span>
                <div className="flex-1 h-px bg-warm-200" />
              </div>

              {/* Quick fabric note */}
              <div className="bg-warm-50 border border-warm-200 p-4 space-y-2">
                <p className="text-[10px] font-sans tracking-luxury uppercase text-warm-500">Material</p>
                <p className="text-sm font-sans text-warm-700">
                  <span className="font-semibold text-warm-900">{product.fabric}</span>
                  {' — '}
                  {product.fabricInfo.softness} &middot; {product.fabricInfo.weight} &middot; {product.fabricInfo.season}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <ProductHighlights highlights={product.highlights} />

        {/* Description */}
        <ProductDescription description={product.description} />

        {/* Fabric Info */}
        <FabricInfo fabricInfo={product.fabricInfo} />

        {/* Delivery */}
        <DeliveryInfo deliveryInfo={product.deliveryInfo} />

        {/* Reviews */}
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.averageRating}
          totalReviews={product.totalReviews}
        />

        {/* FAQ */}
        <ProductFAQ faqs={product.faqs} />

        {/* Related */}
        <RelatedProducts products={relatedProducts} />

        {/* Recently Viewed */}
        <RecentlyViewed currentProductId={product.id} />

        {/* Sticky bar */}
        <StickyBar
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
      </main>

      <Footer />
    </div>
  )
}
