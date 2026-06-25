'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

export default function DeleteSubButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete subcategory "${name}"?`)) return
    setLoading(true)
    await fetch(`/api/subcategories/${id}`, { method: 'DELETE' })
    setLoading(false)
    router.refresh()
  }

  return (
    <button type="button" onClick={handleDelete} disabled={loading} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50">
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  )
}
