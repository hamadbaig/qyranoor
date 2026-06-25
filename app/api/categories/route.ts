import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { getAdminUser } from '@/lib/auth.server'

export async function GET() {
  try {
    await connectDB()
    const cats = await CategoryModel.find({}).sort({ sortOrder: 1, createdAt: 1 }).lean()
    return NextResponse.json(cats)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await request.json()
    const { name, slug, description, image, isActive, sortOrder } = body

    if (!name || !slug) return NextResponse.json({ error: 'name and slug required' }, { status: 400 })

    const existing = await CategoryModel.findOne({ slug })
    if (existing) return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })

    const cat = await CategoryModel.create({ name, slug, description, image, isActive, sortOrder })
    return NextResponse.json(cat, { status: 201 })
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
