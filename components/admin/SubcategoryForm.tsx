'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface SubcategoryData {
  name: string
  slug: string
  categorySlug: string
  description: string
  isActive: boolean
  sortOrder: number
}

const EMPTY: SubcategoryData = {
  name: '',
  slug: '',
  categorySlug: '',
  description: '',
  isActive: true,
  sortOrder: 0,
}

interface Category {
  _id: string
  name: string
  slug: string
}

interface Props {
  initial?: SubcategoryData & { _id?: string }
  mode: 'create' | 'edit'
  categories: Category[]
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function SubcategoryForm({ initial, mode, categories }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<SubcategoryData>(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof SubcategoryData, v: any) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = mode === 'create' ? '/api/subcategories' : `/api/subcategories/${(initial as any)._id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Save failed'); return }
      router.push('/admin/subcategories')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
  const labelCls = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className={labelCls}>Parent Category <span className="text-red-500">*</span></label>
        <select
          className={inputCls}
          value={form.categorySlug}
          onChange={e => set('categorySlug', e.target.value)}
          required
        >
          <option value="">Select a category…</option>
          {categories.map(c => (
            <option key={c._id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name <span className="text-red-500">*</span></label>
          <input
            className={inputCls}
            value={form.name}
            onChange={e => { set('name', e.target.value); if (!initial) set('slug', toSlug(e.target.value)) }}
            placeholder="Nida Open Abayas"
            required
          />
        </div>
        <div>
          <label className={labelCls}>Slug <span className="text-red-500">*</span></label>
          <input
            className={inputCls}
            value={form.slug}
            onChange={e => set('slug', toSlug(e.target.value))}
            placeholder="nida-open-abayas"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={form.description}
          onChange={e => set('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Sort Order</label>
          <input className={inputCls} type="number" value={form.sortOrder} onChange={e => set('sortOrder', parseInt(e.target.value) || 0)} />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input id="isActive" type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all disabled:opacity-60">
          {saving && <Loader2 size={14} className="animate-spin" />}
          {mode === 'create' ? 'Create Subcategory' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/subcategories')} className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}
