import { Suspense } from 'react'
import { getShopProducts, getShopMeta } from '@/lib/products.server'
import type { SortOption } from '@/lib/products.server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FilterSidebar from '@/components/shop/FilterSidebar'
import ShopSort from '@/components/shop/ShopSort'
import ShopPagination from '@/components/shop/ShopPagination'
import ShopProductCard from '@/components/shop/ShopProductCard'

export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return {
    title: 'Shop All Abayas — Qyra Noor',
    description: 'Browse the full Qyra Noor collection. Filter by style, price & availability.',
  }
}

interface PageProps {
  searchParams: Promise<{
    category?:    string
    subcategory?: string
    minPrice?:    string
    maxPrice?:    string
    inStock?:     string
    sort?:        string
    page?:        string
  }>
}

const ITEMS_PER_PAGE = 12

export default async function ShopPage({ searchParams }: PageProps) {
  const sp = await searchParams

  const category    = sp.category    ?? undefined
  const subcategory = sp.subcategory ?? undefined
  const minPrice    = sp.minPrice    ? Number(sp.minPrice) : undefined
  const maxPrice    = sp.maxPrice    ? Number(sp.maxPrice) : undefined
  const inStock     = sp.inStock === 'true'
  const sort        = (sp.sort as SortOption) ?? 'newest'
  const page        = Math.max(1, Number(sp.page ?? 1))

  const [result, meta] = await Promise.all([
    getShopProducts({ category, subcategory, minPrice, maxPrice, inStock, page, limit: ITEMS_PER_PAGE, sort }),
    getShopMeta(category),
  ])

  const activeFilters = {
    category:    sp.category,
    subcategory: sp.subcategory,
    minPrice:    sp.minPrice,
    maxPrice:    sp.maxPrice,
    inStock:     sp.inStock,
  }

  const pageTitle = category ?? subcategory ?? 'All Styles'
  const showFrom  = (page - 1) * ITEMS_PER_PAGE + 1
  const showTo    = Math.min(page * ITEMS_PER_PAGE, result.total)

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-cream pt-20 sm:pt-24 pb-20">

        {/* Page banner */}
        <div className="border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="label-gold mb-1">Our Collection</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-warm-950">{pageTitle}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* FilterSidebar renders:
              - a mobile trigger button (lg:hidden) — shows first in flex flow on mobile
              - a desktop aside (hidden lg:block) — takes the 256px sidebar slot on desktop */}
          <div className="flex gap-4 lg:gap-8 items-start">

            {/* Sidebar + mobile trigger (both inside one component) */}
            <Suspense fallback={<aside className="hidden lg:block w-64 h-64 bg-warm-100 animate-pulse" />}>
              <FilterSidebar
                categories={meta.categories}
                subcategories={meta.subcategories}
                priceRange={meta.priceRange}
                active={activeFilters}
              />
            </Suspense>

            {/* Content column */}
            <div className="flex-1 min-w-0">

              {/* Toolbar row */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <Suspense fallback={<div className="h-8 w-32 bg-warm-100 animate-pulse" />}>
                  <ShopSort current={sort} total={result.total} />
                </Suspense>
              </div>

              {/* Active filter chips */}
              {(category || subcategory || sp.minPrice || sp.maxPrice || inStock) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {category && <ActiveChip label={category}        paramKey="category"    params={sp} />}
                  {subcategory && <ActiveChip label={subcategory}  paramKey="subcategory" params={sp} />}
                  {(sp.minPrice || sp.maxPrice) && (
                    <ActiveChip
                      label={`PKR ${Number(sp.minPrice ?? 0).toLocaleString('en-PK')} – ${sp.maxPrice ? Number(sp.maxPrice).toLocaleString('en-PK') : '∞'}`}
                      paramKey="price"
                      params={sp}
                    />
                  )}
                  {inStock && <ActiveChip label="In Stock Only" paramKey="inStock" params={sp} />}
                  <a href="/shop" className="text-[10px] font-sans tracking-widest uppercase text-warm-500 hover:text-gold transition-colors self-center ml-1">
                    Clear all ×
                  </a>
                </div>
              )}

              {/* Product grid */}
              {result.products.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-warm-200">
                  <p className="font-serif text-2xl text-warm-300 mb-3">No products found</p>
                  <p className="text-sm font-sans text-warm-400 mb-6">Try removing some filters to see more results.</p>
                  <a href="/shop" className="btn-gold inline-block text-xs px-8 py-3">View All Products</a>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {result.products.map((product, i) => (
                    <ShopProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Suspense fallback={null}>
                <ShopPagination page={result.page} totalPages={result.totalPages} />
              </Suspense>

              {result.total > 0 && (
                <p className="text-center text-[11px] font-sans text-warm-400 mt-4">
                  Showing {showFrom}–{showTo} of {result.total} product{result.total !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

/* ── Active filter chip ──────────────────────────────────────────────────────── */
function ActiveChip({
  label, paramKey, params,
}: {
  label:    string
  paramKey: string
  params:   Record<string, string | undefined>
}) {
  const buildHref = () => {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (!v) continue
      if (paramKey === 'price' && (k === 'minPrice' || k === 'maxPrice')) continue
      if (k === paramKey) continue
      sp.set(k, v)
    }
    return `/shop${sp.toString() ? '?' + sp.toString() : ''}`
  }

  return (
    <a
      href={buildHref()}
      className="inline-flex items-center gap-1.5 text-xs font-sans px-2.5 py-1 bg-gold/10 text-gold-600 border border-gold/30 hover:bg-gold/20 transition-colors"
    >
      {label}
      <span className="text-gold/70 leading-none">&times;</span>
    </a>
  )
}
