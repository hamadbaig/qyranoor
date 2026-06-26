import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getAllProductSlugs } from '@/lib/products.server'
import ProductPageClient from '@/components/product/ProductPageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.description.overview.slice(0, 160),
    keywords: product.tags,
    openGraph: {
      title: product.name,
      description: product.metaDescription ?? product.description.overview.slice(0, 160),
      images: product.colors[0]?.images[0]
        ? [{ url: product.colors[0].images[0], width: 900, height: 1200 }]
        : [],
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    return slugs.map(slug => ({ slug }))
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, ] = await Promise.all([
    getProductBySlug(slug),
  ])
  if (!product) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description.overview,
            sku: product.sku,
            brand: { '@type': 'Brand', name: 'Qyra Noor' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: product.currency,
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
            aggregateRating: product.totalReviews > 0
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: product.averageRating,
                  reviewCount: product.totalReviews,
                }
              : undefined,
          }),
        }}
      />

      <ProductPageClient product={product} />
    </>
  )
}
