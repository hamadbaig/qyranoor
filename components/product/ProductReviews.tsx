'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ThumbsUp, BadgeCheck } from 'lucide-react'
import { Product, ProductReview } from '@/types/product'

function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" className={i < rating ? 'star-filled' : 'star-empty'}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-2 text-xs font-sans">
      <span className="w-5 text-warm-700 text-right">{label}</span>
      <svg width="10" height="10" viewBox="0 0 24 24" className="star-filled flex-shrink-0">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <div className="flex-1 h-1.5 bg-warm-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="h-full bg-gold rounded-full"
        />
      </div>
      <span className="w-7 text-warm-500 text-right">{pct}%</span>
    </div>
  )
}

function ReviewCard({ review }: { review: ProductReview }) {
  const [liked, setLiked] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="review-card"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-serif text-sm font-semibold">
              {review.author.charAt(0)}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-sans font-semibold text-warm-900">{review.author}</p>
                {review.verified && (
                  <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-sans">
                    <BadgeCheck size={10} />Verified
                  </span>
                )}
              </div>
              <p className="text-[11px] text-warm-400 font-sans">{review.location}</p>
            </div>
          </div>
          <StarRow rating={review.rating} />
        </div>
        <p className="text-[11px] font-sans text-warm-400 flex-shrink-0">
          {new Date(review.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <h4 className="text-sm font-sans font-semibold text-warm-800 mb-2">{review.title}</h4>
      <p className="text-sm font-sans text-warm-600 leading-relaxed mb-3">{review.comment}</p>

      {review.photo && (
        <div className="mb-3">
          <div className="relative w-20 h-24 overflow-hidden">
            <Image src={review.photo} alt="Customer photo" fill className="object-cover" sizes="80px" />
          </div>
        </div>
      )}

      <button
        onClick={() => setLiked(p => !p)}
        className={`flex items-center gap-1.5 text-[11px] font-sans transition-colors ${
          liked ? 'text-gold' : 'text-warm-400 hover:text-warm-600'
        }`}
      >
        <ThumbsUp size={11} />
        Helpful ({review.helpful + (liked ? 1 : 0)})
      </button>
    </motion.div>
  )
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: {
  reviews: ProductReview[]
  averageRating: number
  totalReviews: number
}) {
  const ratingDist = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => Math.round(r.rating) === stars).length,
  }))

  return (
    <section className="py-12 px-6 bg-cream-dark">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-gold text-center mb-2"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-serif text-2xl text-center text-warm-900 mb-10"
        >
          Customer Reviews
        </motion.h2>

        {/* Summary */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-10 p-6 bg-white border border-warm-200">
          {/* Big score */}
          <div className="text-center sm:text-left flex-shrink-0">
            <p className="font-serif text-6xl text-warm-950">{averageRating}</p>
            <StarRow rating={Math.round(averageRating)} />
            <p className="text-xs font-sans text-warm-500 mt-1">{totalReviews} reviews</p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2.5 w-full">
            {ratingDist.map(({ stars, count }) => (
              <RatingBar key={stars} label={String(stars)} count={count} total={reviews.length} />
            ))}
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {totalReviews > reviews.length && (
          <div className="mt-8 text-center">
            <button className="btn-ghost">
              View All {totalReviews} Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
