import AdminHeader from '@/components/admin/AdminHeader'
import ProductForm from '@/components/admin/ProductForm'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function NewProductPage() {
  await connectDB()
  const categories = await CategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean<any[]>()

  return (
    <>
      <AdminHeader title="New Product" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/products" className="hover:text-yellow-600">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">New Product</span>
        </div>
        <ProductForm
          mode="create"
          categories={categories.map((c: any) => ({ name: c.name, slug: c.slug }))}
        />
      </main>
    </>
  )
}
