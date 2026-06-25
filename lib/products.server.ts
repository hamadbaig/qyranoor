import 'server-only'
import { connectDB } from './mongodb'
import { ProductModel } from '@/models/Product'
import { Product } from '@/types/product'

function toProduct(doc: Record<string, unknown>): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = doc
  return rest as unknown as Product
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB()
  const doc = await ProductModel.findOne({ slug }).lean<Record<string, unknown>>()
  return doc ? toProduct(doc) : null
}

export async function getAllProductSlugs(): Promise<string[]> {
  await connectDB()
  const docs = await ProductModel.find({}, { slug: 1 }).lean<{ slug: string }[]>()
  return docs.map(d => d.slug)
}

export async function getRelatedProducts(ids: string[]): Promise<Product[]> {
  if (!ids.length) return []
  await connectDB()
  const docs = await ProductModel.find({ id: { $in: ids } }).lean<Record<string, unknown>[]>()
  return docs.map(toProduct)
}

export async function getAllProducts(): Promise<Product[]> {
  await connectDB()
  const docs = await ProductModel.find({}).lean<Record<string, unknown>[]>()
  return docs.map(toProduct)
}

// ─── Shop filtering ───────────────────────────────────────────────────────────

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'rating'

export interface ShopFilters {
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  page?: number
  limit?: number
  sort?: SortOption
}

export interface ShopResult {
  products: Product[]
  total: number
  totalPages: number
  page: number
}

export interface ShopMeta {
  categories: string[]
  subcategories: string[]
  priceRange: { min: number; max: number }
}

const SORT_MAP: Record<SortOption, Record<string, 1 | -1>> = {
  newest:     { createdAt: -1 },
  oldest:     { createdAt:  1 },
  'price-asc':{ price: 1 },
  'price-desc':{ price: -1 },
  rating:     { averageRating: -1 },
}

export async function getShopProducts(filters: ShopFilters = {}): Promise<ShopResult> {
  await connectDB()

  const query: Record<string, unknown> = {}
  if (filters.category)    query.category    = filters.category
  if (filters.subcategory) query.subcategory = filters.subcategory
  if (filters.inStock)     query.inStock     = true
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const price: Record<string, number> = {}
    if (filters.minPrice !== undefined) price.$gte = filters.minPrice
    if (filters.maxPrice !== undefined) price.$lte = filters.maxPrice
    query.price = price
  }

  const page  = Math.max(1, filters.page  ?? 1)
  const limit = Math.min(48, Math.max(1, filters.limit ?? 12))
  const sort  = SORT_MAP[filters.sort ?? 'newest']

  const [docs, total] = await Promise.all([
    ProductModel.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean<Record<string, unknown>[]>(),
    ProductModel.countDocuments(query),
  ])

  return {
    products:   docs.map(toProduct),
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    page,
  }
}

export async function getShopMeta(category?: string): Promise<ShopMeta> {
  await connectDB()

  const catFilter = category ? { category } : {}

  const [categories, subcategories, priceAgg] = await Promise.all([
    ProductModel.distinct('category') as Promise<string[]>,
    ProductModel.distinct('subcategory', catFilter) as Promise<string[]>,
    ProductModel.aggregate([{ $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } }]),
  ])

  return {
    categories:    categories.filter(Boolean).sort(),
    subcategories: subcategories.filter(Boolean).sort(),
    priceRange:    { min: priceAgg[0]?.min ?? 0, max: priceAgg[0]?.max ?? 50000 },
  }
}
