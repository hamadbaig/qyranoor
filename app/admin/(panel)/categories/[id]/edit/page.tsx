import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import CategoryForm from '@/components/admin/CategoryForm'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectDB()
  const cat = await CategoryModel.findById(id).lean<any>()
  if (!cat) notFound()

  const { _id, __v, createdAt, updatedAt, ...data } = cat

  return (
    <>
      <AdminHeader title="Edit Category" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/categories" className="hover:text-yellow-600">Categories</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">{data.name}</span>
        </div>
        <CategoryForm mode="edit" initial={{ ...data, _id: _id?.toString() }} />
      </main>
    </>
  )
}
