import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import ProductForm from '@/components/admin/ProductForm'
import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { CategoryModel } from '@/models/Category'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectDB()

  const [productDoc, categoriesRaw] = await Promise.all([
    ProductModel.findOne({ $or: [{ id }, { slug: id }] }).lean<any>(),
    CategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean<any[]>(),
  ])

  if (!productDoc) notFound()

  const { _id, __v, ...product } = productDoc
  const categories = categoriesRaw.map((c: any) => ({ name: c.name, slug: c.slug }))

  return (
    <>
      <AdminHeader title="Edit Product" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/products" className="hover:text-yellow-600">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
        <ProductForm mode="edit" initial={{ ...product, _id: _id?.toString() }} categories={categories} />
      </main>
    </>
  )
}
