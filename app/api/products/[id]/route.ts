import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { getAdminUser } from '@/lib/auth.server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const product = await ProductModel.findOne({ $or: [{ id }, { slug: id }] }).lean()
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const body = await request.json()

    const product = await ProductModel.findOneAndUpdate(
      { $or: [{ id }, { _id: id }] },
      { $set: body },
      { new: true, runValidators: true }
    )
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (err: any) {
    if (err.code === 11000) return NextResponse.json({ error: 'Duplicate slug or SKU' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await connectDB()
    const product = await ProductModel.findOneAndDelete({ $or: [{ id }, { _id: id }] })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
