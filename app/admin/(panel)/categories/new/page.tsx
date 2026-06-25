import AdminHeader from '@/components/admin/AdminHeader'
import CategoryForm from '@/components/admin/CategoryForm'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function NewCategoryPage() {
  return (
    <>
      <AdminHeader title="New Category" />
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/categories" className="hover:text-yellow-600">Categories</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">New Category</span>
        </div>
        <CategoryForm mode="create" />
      </main>
    </>
  )
}
