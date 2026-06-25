'use client'

import { useEffect, useState } from 'react'
import { Bell, User } from 'lucide-react'

interface AdminUser {
  name: string
  email: string
  role: string
}

interface Props {
  title: string
}

export default function AdminHeader({ title }: Props) {
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => d.user && setUser(d.user))
      .catch(() => null)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-gray-900" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name ?? '—'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role ?? 'admin'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
