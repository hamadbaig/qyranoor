import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {!isLast ? (
              <>
                <Link
                  href={crumb.href ?? '#'}
                  className="text-warm-500 hover:text-gold transition-colors tracking-wide uppercase"
                >
                  {crumb.label}
                </Link>
                <ChevronRight size={10} className="text-warm-400 flex-shrink-0" />
              </>
            ) : (
              <span className="text-warm-800 tracking-wide uppercase font-medium">{crumb.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
