import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import AdminHeader from '@/components/admin/AdminHeader'
import DeleteButton from './_DeleteButton'
import Link from 'next/link'
import { Plus, Edit2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  await connectDB()
  const categories = await CategoryModel.find({}).sort({ sortOrder: 1, createdAt: 1 }).lean<any[]>()

  return (
    <>
      <AdminHeader title="Categories" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">All Categories</h2>
              <p className="text-xs text-gray-400 mt-0.5">{categories.length} categories</p>
            </div>
            <Link href="/admin/categories/new" className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all">
              <Plus size={14} /> New Category
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No categories yet. <Link href="/admin/categories/new" className="text-yellow-600 hover:underline">Create one.</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Sort</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((cat: any) => (
                    <tr key={cat._id?.toString()} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {cat.image && <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />}
                          <div>
                            <p className="font-medium text-gray-800">{cat.name}</p>
                            {cat.description && <p className="text-xs text-gray-400 truncate max-w-[240px]">{cat.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell font-mono text-xs">{cat.slug}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${cat.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {cat.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{cat.sortOrder ?? 0}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/admin/categories/${cat._id}/edit`} className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all" title="Edit">
                            <Edit2 size={14} />
                          </Link>
                          <DeleteButton id={cat._id?.toString()} name={cat.name} />
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
