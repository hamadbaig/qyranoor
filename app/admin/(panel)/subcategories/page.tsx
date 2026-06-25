import { connectDB } from '@/lib/mongodb'
import { SubcategoryModel } from '@/models/Subcategory'
import { CategoryModel } from '@/models/Category'
import AdminHeader from '@/components/admin/AdminHeader'
import DeleteSubButton from './_DeleteButton'
import Link from 'next/link'
import { Plus, Edit2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminSubcategoriesPage() {
  await connectDB()
  const [subs, categories] = await Promise.all([
    SubcategoryModel.find({}).sort({ categorySlug: 1, sortOrder: 1 }).lean<any[]>(),
    CategoryModel.find({}).lean<any[]>(),
  ])

  const catMap: Record<string, string> = {}
  categories.forEach((c: any) => { catMap[c.slug] = c.name })

  return (
    <>
      <AdminHeader title="Subcategories" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">All Subcategories</h2>
              <p className="text-xs text-gray-400 mt-0.5">{subs.length} subcategories</p>
            </div>
            <Link href="/admin/subcategories/new" className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all">
              <Plus size={14} /> New Subcategory
            </Link>
          </div>

          {subs.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No subcategories yet. <Link href="/admin/subcategories/new" className="text-yellow-600 hover:underline">Create one.</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subs.map((sub: any) => (
                    <tr key={sub._id?.toString()} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-800">{sub.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {catMap[sub.categorySlug] ?? sub.categorySlug}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell font-mono text-xs">{sub.slug}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${sub.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {sub.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/admin/subcategories/${sub._id}/edit`} className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all">
                            <Edit2 size={14} />
                          </Link>
                          <DeleteSubButton id={sub._id?.toString()} name={sub.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
