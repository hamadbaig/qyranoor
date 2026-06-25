import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { SubcategoryModel } from '@/models/Subcategory'
import { getAdminUser } from '@/lib/auth.server'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const filter = categorySlug ? { categorySlug } : {}
    const subs = await SubcategoryModel.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean()
    return NextResponse.json(subs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await request.json()
    const { name, slug, categorySlug, description, isActive, sortOrder } = body

    if (!name || !slug || !categorySlug) {
      return NextResponse.json({ error: 'name, slug and categorySlug required' }, { status: 400 })
    }

    const sub = await SubcategoryModel.create({ name, slug, categorySlug, description, isActive, sortOrder })
    return NextResponse.json(sub, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 })
  }
}
