import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import SubcategoryForm from '@/components/admin/SubcategoryForm'
import { connectDB } from '@/lib/mongodb'
import { SubcategoryModel } from '@/models/Subcategory'
import { CategoryModel } from '@/models/Category'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function EditSubcategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectDB()

  const [sub, categories] = await Promise.all([
    SubcategoryModel.findById(id).lean<any>(),
    CategoryModel.find({}).sort({ sortOrder: 1 }).lean<any[]>(),
  ])

  if (!sub) notFound()

  const { _id, __v, createdAt, updatedAt, ...data } = sub

  return (
    <>
      <AdminHeader title="Edit Subcategory" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/subcategories" className="hover:text-yellow-600">Subcategories</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">{data.name}</span>
        </div>
        <SubcategoryForm
          mode="edit"
          initial={{ ...data, _id: _id?.toString() }}
          categories={categories.map((c: any) => ({ _id: c._id?.toString(), name: c.name, slug: c.slug }))}
        />
      </main>
    </>
  )
}
