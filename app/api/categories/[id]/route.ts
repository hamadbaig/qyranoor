import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { getAdminUser } from '@/lib/auth.server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const cat = await CategoryModel.findById(id).lean()
    if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cat)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const body = await request.json()
    const cat = await CategoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cat)
  } catch {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const cat = await CategoryModel.findByIdAndDelete(id)
    if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
