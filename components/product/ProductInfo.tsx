import { CheckCircle, XCircle, Tag, Layers } from 'lucide-react'
import { Product } from '@/types/product'
import { formatPrice } from '@/lib/products'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Props {
  product: Product
}

export default function ProductInfo({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div>
      <Breadcrumb
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Abayas', href: '/abayas' },
          { label: product.category, href: `/abayas/${product.category.toLowerCase().replace(' ', '-')}` },
          { label: product.name },
        ]}
      />

      <div className="mt-5">
        {/* Collection */}
        <p className="label-gold mb-1">{product.collection}</p>

        {/* Product name */}
        <h1 className="font-serif text-3xl sm:text-4xl text-warm-950 leading-tight tracking-wide">
          {product.name}
        </h1>

        {/* SKU + Category row */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
          <span className="text-xs font-sans text-warm-400 tracking-wide">
            SKU: <span className="text-warm-600">{product.sku}</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-sans text-warm-400">
            <Layers size={11} />
            <span className="text-warm-600">{product.category}</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-sans text-warm-400">
            <Tag size={11} />
            <span className="text-warm-600">{product.fabric}</span>
          </span>
        </div>

        {/* Price + Stock */}
        <div className="mt-5 flex items-end gap-4">
          <div>
            <p className="font-serif text-3xl text-warm-950 font-medium">
              {formatPrice(product.price, product.currencySymbol)}
            </p>
            {product.originalPrice && (
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-warm-400 line-through font-sans">
                  {formatPrice(product.originalPrice, product.currencySymbol)}
                </p>
                <span className="text-xs font-sans font-semibold text-white bg-gold px-2 py-0.5">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>

          <div className="mb-1">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                <CheckCircle size={11} className="fill-emerald-600 text-emerald-600" />
                In Stock
                {product.stockCount && product.stockCount <= 5 && (
                  <span className="text-amber-600">· Only {product.stockCount} left</span>
                )}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-red-600 bg-red-50 border border-red-200 px-2.5 py-1">
                <XCircle size={11} />
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Rating teaser */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" className={i < Math.round(product.averageRating) ? 'star-filled' : 'star-empty'}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-sans text-warm-600">
            {product.averageRating} ({product.totalReviews} reviews)
          </span>
        </div>
      </div>
    </div>
  )
}
