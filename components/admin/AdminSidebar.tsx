'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, Tag, Layers, LogOut, ChevronRight, Store, Home
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',     href: '/admin',               icon: LayoutDashboard },
  { label: 'Products',      href: '/admin/products',      icon: Package },
  { label: 'Categories',    href: '/admin/categories',    icon: Tag },
  { label: 'Subcategories', href: '/admin/subcategories', icon: Layers },
  { label: 'Homepage CMS',  href: '/admin/homepage',      icon: Home },
]

async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin/login'
}

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-950 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2.5" title="View storefront">
          <Store size={16} className="text-yellow-500" />
          <span className="font-serif text-lg tracking-widest text-white">
            Qyra <span className="text-yellow-500">Noor</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-medium uppercase tracking-widest text-gray-600 mb-3">
          Management
        </p>
        {NAV.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-all duration-150 group ${
              isActive(href)
                ? 'bg-yellow-500/10 text-yellow-500'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Icon size={16} className={isActive(href) ? 'text-yellow-500' : 'text-gray-500 group-hover:text-gray-300'} />
            {label}
            {isActive(href) && <ChevronRight size={12} className="ml-auto text-yellow-500/60" />}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
