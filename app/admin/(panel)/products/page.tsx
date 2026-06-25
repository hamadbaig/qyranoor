'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'

interface Product {
  id: string; _id: string; name: string; slug: string; sku: string; price: number
  collection: string; category: string; inStock: boolean; stockCount?: number
  averageRating: number; totalReviews: number
  colors: { name: string; hex: string; images: string[] }[]
}

export default function AdminProductsPage() {
  const [products, setProducts]   = useState<Product[]>([])
  const [loading, setLoading]     = useState(true)
  const [query, setQuery]         = useState('')
  const [deleting, setDeleting]   = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(query.toLowerCase()) ||
    p.sku?.toLowerCase().includes(query.toLowerCase()) ||
    p.collection?.toLowerCase().includes(query.toLowerCase())
  )

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return
    setDeleting(p.id)
    await fetch(`/api/products/${p.id}`, { method: 'DELETE' })
    setDeleting(null)
    load()
  }

  return (
    <>
      <AdminHeader title="Products" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all ml-auto">
              <Plus size={14} /> New Product
            </Link>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              {query ? 'No products match your search.' : 'No products yet.'}
              {!query && <p className="mt-1"><Link href="/admin/products/new" className="text-yellow-600 hover:underline text-sm">Create your first product</Link></p>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">SKU</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Rating</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {p.colors?.[0]?.images?.[0] ? (
                            <img src={p.colors[0].images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate max-w-[200px]">{p.name}</p>
                            <p className="text-xs text-gray-400 truncate">{p.collection}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell font-mono text-xs">{p.sku}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-800">PKR {p.price?.toLocaleString('en-PK')}</td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${p.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {p.inStock ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                          {p.inStock ? (p.stockCount ? `${p.stockCount} left` : 'In Stock') : 'Out'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell text-xs text-gray-500">
                        {p.averageRating ? `★ ${p.averageRating} (${p.totalReviews})` : '—'}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/admin/products/${p.id}/edit`} className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all" title="Edit">
                            <Edit2 size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(p)}
                            disabled={deleting === p.id}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {products.length} products
            </div>
          )}
        </div>
      </main>
    </>
  )
}
