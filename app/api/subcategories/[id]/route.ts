import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { SubcategoryModel } from '@/models/Subcategory'
import { getAdminUser } from '@/lib/auth.server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const sub = await SubcategoryModel.findById(id).lean()
    if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(sub)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const body = await request.json()
    const sub = await SubcategoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(sub)
  } catch {
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const sub = await SubcategoryModel.findByIdAndDelete(id)
    if (!sub) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 })
  }
}
