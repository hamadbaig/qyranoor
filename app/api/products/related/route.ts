import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const category = searchParams.get('category')
    const exclude  = searchParams.get('exclude')   // current product slug or id
    const limit    = Math.min(parseInt(searchParams.get('limit') ?? '8', 10), 16)

    if (!category) return NextResponse.json({ error: 'category required' }, { status: 400 })

    await connectDB()

    const query: Record<string, unknown> = { category, inStock: true }
    if (exclude) query.$and = [{ slug: { $ne: exclude } }, { id: { $ne: exclude } }]

    const docs = await ProductModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('id slug name collection price originalPrice currencySymbol inStock stockCount averageRating totalReviews colors')
      .lean()

    return NextResponse.json(docs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch related products' }, { status: 500 })
  }
}
