import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { getAllProducts } from '@/lib/products.server'
import { getAdminUser } from '@/lib/auth.server'

export const revalidate = 0

export async function GET() {
  try {
    const products = await getAllProducts()
    const slim = products.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      collection: p.collection,
      category: p.category,
      subcategory: p.subcategory,
      price: p.price,
      originalPrice: p.originalPrice,
      currencySymbol: p.currencySymbol,
      inStock: p.inStock,
      stockCount: p.stockCount,
      averageRating: p.averageRating,
      totalReviews: p.totalReviews,
      colors: p.colors.map(c => ({ name: c.name, hex: c.hex, images: c.images.slice(0, 1) })),
    }))
    return NextResponse.json(slim)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await request.json()

    if (!body.name || !body.slug || !body.sku || !body.price) {
      return NextResponse.json({ error: 'name, slug, sku and price are required' }, { status: 400 })
    }

    if (!body.id) {
      body.id = `prod_${Date.now()}`
    }

    if (!body.whatsappNumber) {
      body.whatsappNumber = '923347573726'
    }

    if (!body.currency) body.currency = 'PKR'
    if (!body.currencySymbol) body.currencySymbol = 'PKR'
    if (body.colors === undefined) body.colors = []
    if (body.sizes === undefined) body.sizes = []
    if (body.highlights === undefined) body.highlights = []
    if (body.faqs === undefined) body.faqs = []
    if (body.reviews === undefined) body.reviews = []
    if (body.relatedProductIds === undefined) body.relatedProductIds = []
    if (body.tags === undefined) body.tags = []

    const existing = await ProductModel.findOne({ $or: [{ slug: body.slug }, { sku: body.sku }] })
    if (existing) {
      return NextResponse.json({ error: 'Slug or SKU already in use' }, { status: 409 })
    }

    const product = await ProductModel.create(body)
    revalidatePath('/products')
    revalidatePath(`/products/${body.slug}`)
    return NextResponse.json(product, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Duplicate slug or SKU' }, { status: 409 })
    console.error('POST /api/products error:', err)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
