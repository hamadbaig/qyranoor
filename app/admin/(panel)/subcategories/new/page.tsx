import AdminHeader from '@/components/admin/AdminHeader'
import SubcategoryForm from '@/components/admin/SubcategoryForm'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default async function NewSubcategoryPage() {
  await connectDB()
  const categories = await CategoryModel.find({}).sort({ sortOrder: 1 }).lean<any[]>()

  return (
    <>
      <AdminHeader title="New Subcategory" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/subcategories" className="hover:text-yellow-600">Subcategories</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">New Subcategory</span>
        </div>
        <SubcategoryForm
          mode="create"
          categories={categories.map((c: any) => ({ _id: c._id?.toString(), name: c.name, slug: c.slug }))}
        />
      </main>
    </>
  )
}
