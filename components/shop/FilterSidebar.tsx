'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'

interface Props {
  categories:    string[]
  subcategories: string[]
  priceRange:    { min: number; max: number }
  active: {
    category?:    string
    subcategory?: string
    minPrice?:    string
    maxPrice?:    string
    inStock?:     string
  }
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-warm-200 py-4">
      <button type="button" onClick={() => setOpen(p => !p)} className="flex items-center justify-between w-full text-xs font-sans tracking-luxury uppercase text-warm-600 hover:text-warm-900 mb-0 pb-0">
        {title}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ categories, subcategories, priceRange, active }: Props) {
  const router      = useRouter()
  const pathname    = usePathname()
  const params      = useSearchParams()
  const [, start]   = useTransition()
  const [open, setOpen] = useState(false)

  const [localMin, setLocalMin] = useState(active.minPrice ?? '')
  const [localMax, setLocalMax] = useState(active.maxPrice ?? '')

  const push = (updates: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString())
    sp.delete('page') // reset to page 1 on filter change
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === '') sp.delete(k)
      else sp.set(k, v)
    }
    start(() => router.push(`${pathname}?${sp.toString()}`))
  }

  const setCategory = (val: string) => {
    push({ category: val === active.category ? null : val, subcategory: null })
  }

  const setSubcategory = (val: string) => {
    push({ subcategory: val === active.subcategory ? null : val })
  }

  const applyPrice = () => {
    push({ minPrice: localMin, maxPrice: localMax })
  }

  const clearPrice = () => {
    setLocalMin(''); setLocalMax('')
    push({ minPrice: null, maxPrice: null })
  }

  const toggleInStock = () => {
    push({ inStock: active.inStock === 'true' ? null : 'true' })
  }

  const clearAll = () => {
    setLocalMin(''); setLocalMax('')
    start(() => router.push(pathname))
  }

  const activeCount = [active.category, active.subcategory, active.minPrice || active.maxPrice, active.inStock].filter(Boolean).length

  const content = (
    <div className="space-y-0">
      {activeCount > 0 && (
        <div className="flex items-center justify-between py-3 border-b border-warm-200">
          <span className="text-xs font-sans text-warm-600">Active filters: <strong className="text-warm-900">{activeCount}</strong></span>
          <button type="button" onClick={clearAll} className="text-xs font-sans text-gold hover:text-gold-700 underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}

      {/* Category */}
      <Section title="Category">
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={active.category === cat}
              onChange={() => setCategory(cat)}
              className="w-3.5 h-3.5 text-gold border-warm-300 focus:ring-gold"
            />
            <span className={`text-sm font-sans transition-colors ${active.category === cat ? 'text-warm-950 font-medium' : 'text-warm-600 group-hover:text-warm-900'}`}>
              {cat}
            </span>
          </label>
        ))}
      </Section>

      {/* Subcategory — only when category selected and there are subcategories */}
      {active.category && subcategories.length > 0 && (
        <Section title="Subcategory">
          {subcategories.map(sub => (
            <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="subcategory"
                checked={active.subcategory === sub}
                onChange={() => setSubcategory(sub)}
                className="w-3.5 h-3.5 text-gold border-warm-300 focus:ring-gold"
              />
              <span className={`text-sm font-sans transition-colors ${active.subcategory === sub ? 'text-warm-950 font-medium' : 'text-warm-600 group-hover:text-warm-900'}`}>
                {sub}
              </span>
            </label>
          ))}
        </Section>
      )}

      {/* Price Range */}
      <Section title="Price Range">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-[10px] font-sans text-warm-400 uppercase tracking-wide mb-1 block">Min (PKR)</label>
            <input
              type="number"
              value={localMin}
              onChange={e => setLocalMin(e.target.value)}
              placeholder={String(priceRange.min)}
              className="w-full px-2.5 py-1.5 text-sm border border-warm-200 focus:outline-none focus:ring-1 focus:ring-gold text-warm-900"
            />
          </div>
          <span className="text-warm-300 mt-5">—</span>
          <div className="flex-1">
            <label className="text-[10px] font-sans text-warm-400 uppercase tracking-wide mb-1 block">Max (PKR)</label>
            <input
              type="number"
              value={localMax}
              onChange={e => setLocalMax(e.target.value)}
              placeholder={String(priceRange.max)}
              className="w-full px-2.5 py-1.5 text-sm border border-warm-200 focus:outline-none focus:ring-1 focus:ring-gold text-warm-900"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button type="button" onClick={applyPrice} className="flex-1 py-1.5 text-[11px] font-sans tracking-widest uppercase bg-warm-950 text-white hover:bg-gold transition-colors">
            Apply
          </button>
          {(active.minPrice || active.maxPrice) && (
            <button type="button" onClick={clearPrice} className="px-3 py-1.5 border border-warm-200 text-warm-500 hover:text-warm-700 text-[11px]">
              <X size={11} />
            </button>
          )}
        </div>
        <p className="text-[10px] font-sans text-warm-400 mt-1.5">
          Range: PKR {priceRange.min.toLocaleString('en-PK')} – PKR {priceRange.max.toLocaleString('en-PK')}
        </p>
      </Section>

      {/* In Stock */}
      <Section title="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={active.inStock === 'true'}
            onChange={toggleInStock}
            className="w-3.5 h-3.5 text-gold border-warm-300 rounded focus:ring-gold"
          />
          <span className="text-sm font-sans text-warm-600 group-hover:text-warm-900 transition-colors">In Stock Only</span>
        </label>
      </Section>
    </div>
  )

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-warm-200 text-sm font-sans text-warm-700 hover:border-gold hover:text-gold transition-all"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-gold text-white text-[10px] flex items-center justify-center font-medium">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile slide-in panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-80 bg-cream h-full overflow-y-auto p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-warm-950">Filters</h2>
              <button type="button" onClick={() => setOpen(false)} className="p-1 text-warm-500 hover:text-warm-900">
                <X size={18} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="font-serif text-xl text-warm-950 mb-1">Filters</h2>
          <p className="label-gold mb-4">Refine your results</p>
          {content}
        </div>
      </aside>
    </>
  )
}
