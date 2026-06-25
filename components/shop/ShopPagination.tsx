'use client'

import { useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page:       number
  totalPages: number
}

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

export default function ShopPagination({ page, totalPages }: Props) {
  const router    = useRouter()
  const pathname  = usePathname()
  const params    = useSearchParams()
  const [, start] = useTransition()

  if (totalPages <= 1) return null

  const go = (p: number) => {
    const sp = new URLSearchParams(params.toString())
    sp.set('page', String(p))
    start(() => router.push(`${pathname}?${sp.toString()}`))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = getPages(page, totalPages)
  const btnBase = 'w-9 h-9 flex items-center justify-center text-sm font-sans transition-all border'

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-10">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className={`${btnBase} ${page <= 1 ? 'border-warm-100 text-warm-300 cursor-not-allowed' : 'border-warm-200 text-warm-600 hover:border-gold hover:text-gold'}`}
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-warm-400 text-sm">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p as number)}
            className={`${btnBase} ${
              p === page
                ? 'border-gold bg-gold text-white'
                : 'border-warm-200 text-warm-600 hover:border-gold hover:text-gold'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        className={`${btnBase} ${page >= totalPages ? 'border-warm-100 text-warm-300 cursor-not-allowed' : 'border-warm-200 text-warm-600 hover:border-gold hover:text-gold'}`}
      >
        <ChevronRight size={14} />
      </button>
    </nav>
  )
}
