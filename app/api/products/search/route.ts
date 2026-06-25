import { NextResponse } from 'next/server'
import { getShopProducts, getShopMeta } from '@/lib/products.server'
import type { SortOption } from '@/lib/products.server'

export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const category    = searchParams.get('category')    ?? undefined
    const subcategory = searchParams.get('subcategory') ?? undefined
    const minPrice    = searchParams.get('minPrice')    ? Number(searchParams.get('minPrice'))  : undefined
    const maxPrice    = searchParams.get('maxPrice')    ? Number(searchParams.get('maxPrice'))  : undefined
    const inStock     = searchParams.get('inStock') === 'true'
    const page        = searchParams.get('page')        ? Number(searchParams.get('page'))      : 1
    const limit       = searchParams.get('limit')       ? Number(searchParams.get('limit'))     : 12
    const sort        = (searchParams.get('sort') as SortOption) ?? 'newest'
    const includeMeta = searchParams.get('meta') === 'true'

    const [result, meta] = await Promise.all([
      getShopProducts({ category, subcategory, minPrice, maxPrice, inStock, page, limit, sort }),
      includeMeta ? getShopMeta(category) : Promise.resolve(null),
    ])

    return NextResponse.json({ ...result, ...(meta ? { meta } : {}) })
  } catch (err) {
    console.error('GET /api/products/search error:', err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
