'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react'

interface ColorEntry { name: string; hex: string; images: string[] }
interface SizeEntry  { label: string; available: boolean; measurements: { chest: string; waist: string; hips: string; length: string } }
interface FAQEntry   { question: string; answer: string }

interface FormData {
  name: string; slug: string; sku: string; price: number; originalPrice: number | ''; collection: string
  category: string; subcategory: string; fabric: string; inStock: boolean; stockCount: number | ''
  highlights: string; tags: string; whatsappNumber: string; metaTitle: string; metaDescription: string
  colors: ColorEntry[]; sizes: SizeEntry[]
  description: { overview: string; fabricDetails: string; stylingRecommendations: string; careInstructions: string }
  fabricInfo: { type: string; softness: string; weight: string; season: string; care: string; origin: string }
  deliveryInfo: { estimatedDays: string; regions: string; returnPolicy: string; exchangePolicy: string; freeShippingThreshold: number | '' }
  faqs: FAQEntry[]
}

const DEFAULT_SIZES: SizeEntry[] = [
  { label: 'XS',  available: true, measurements: { chest: '82–86', waist: '66–70', hips: '90–94',   length: '135' } },
  { label: 'S',   available: true, measurements: { chest: '86–90', waist: '70–74', hips: '94–98',   length: '137' } },
  { label: 'M',   available: true, measurements: { chest: '90–94', waist: '74–78', hips: '98–102',  length: '139' } },
  { label: 'L',   available: true, measurements: { chest: '94–98', waist: '78–82', hips: '102–106', length: '141' } },
  { label: 'XL',  available: true, measurements: { chest: '98–102', waist: '82–86', hips: '106–110', length: '143' } },
  { label: 'XXL', available: false,measurements: { chest: '102–106', waist: '86–90', hips: '110–114', length: '145' } },
]

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function buildInitialForm(initial?: any): FormData {
  if (!initial) {
    return {
      name: '', slug: '', sku: '', price: 0, originalPrice: '', collection: '', category: '', subcategory: '',
      fabric: '', inStock: true, stockCount: '', highlights: '', tags: '', whatsappNumber: '923347573726',
      metaTitle: '', metaDescription: '',
      colors: [{ name: 'Black', hex: '#1a1a1a', images: [''] }],
      sizes: DEFAULT_SIZES,
      description: { overview: '', fabricDetails: '', stylingRecommendations: '', careInstructions: '' },
      fabricInfo: { type: '', softness: '', weight: '', season: '', care: '', origin: '' },
      deliveryInfo: { estimatedDays: '3–5 Business Days', regions: 'All Major Cities in Pakistan\nInternational Shipping Available', returnPolicy: '7-day easy returns', exchangePolicy: 'Free exchange within 14 days', freeShippingThreshold: 5000 },
      faqs: [],
    }
  }
  return {
    ...initial,
    originalPrice: initial.originalPrice ?? '',
    stockCount: initial.stockCount ?? '',
    highlights: (initial.highlights ?? []).join('\n'),
    tags: (initial.tags ?? []).join(', '),
    colors: initial.colors?.length ? initial.colors.map((c: any) => ({ ...c, images: c.images?.length ? c.images : [''] })) : [{ name: '', hex: '#000000', images: [''] }],
    sizes: initial.sizes?.length ? initial.sizes : DEFAULT_SIZES,
    deliveryInfo: { ...initial.deliveryInfo, regions: (initial.deliveryInfo?.regions ?? []).join('\n'), freeShippingThreshold: initial.deliveryInfo?.freeShippingThreshold ?? '' },
    faqs: initial.faqs ?? [],
  }
}

interface Props {
  initial?: any
  mode: 'create' | 'edit'
  categories?: { name: string; slug: string }[]
}

const TABS = ['Basic', 'Colors', 'Sizes', 'Description', 'Fabric & Delivery', 'FAQs']

export default function ProductForm({ initial, mode, categories = [] }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(buildInitialForm(initial))
  const [tab, setTab] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const setF = (k: keyof FormData, v: any) => setForm(p => ({ ...p, [k]: v }))
  const setNested = (root: keyof FormData, k: string, v: any) =>
    setForm(p => ({ ...p, [root]: { ...(p[root] as any), [k]: v } }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice !== '' ? Number(form.originalPrice) : undefined,
        stockCount: form.stockCount !== '' ? Number(form.stockCount) : undefined,
        highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
        colors: form.colors.map(c => ({ ...c, images: c.images.filter(Boolean) })),
        deliveryInfo: {
          ...form.deliveryInfo,
          regions: form.deliveryInfo.regions.split('\n').map(s => s.trim()).filter(Boolean),
          freeShippingThreshold: form.deliveryInfo.freeShippingThreshold !== '' ? Number(form.deliveryInfo.freeShippingThreshold) : undefined,
        },
      }

      const url = mode === 'create' ? '/api/products' : `/api/products/${initial?.id ?? initial?._id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Save failed'); return }
      router.push('/admin/products')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  const inp = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
  const lbl = 'block text-xs font-medium text-gray-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t} type="button" onClick={() => setTab(i)}
            className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === i ? 'border-yellow-500 text-yellow-600 bg-yellow-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">{error}</div>}

        {/* Tab 0: Basic */}
        {tab === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Product Name *</label>
                <input className={inp} value={form.name} onChange={e => { setF('name', e.target.value); if (!initial) setF('slug', toSlug(e.target.value)) }} required />
              </div>
              <div>
                <label className={lbl}>Slug *</label>
                <input className={inp} value={form.slug} onChange={e => setF('slug', toSlug(e.target.value))} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>SKU *</label>
                <input className={inp} value={form.sku} onChange={e => setF('sku', e.target.value)} placeholder="QN-005" required />
              </div>
              <div>
                <label className={lbl}>Price (PKR) *</label>
                <input className={inp} type="number" value={form.price} onChange={e => setF('price', e.target.value)} required />
              </div>
              <div>
                <label className={lbl}>Original Price (optional)</label>
                <input className={inp} type="number" value={form.originalPrice} onChange={e => setF('originalPrice', e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Collection</label>
                <input className={inp} value={form.collection} onChange={e => setF('collection', e.target.value)} placeholder="Premium Collection" />
              </div>
              <div>
                <label className={lbl}>Fabric</label>
                <input className={inp} value={form.fabric} onChange={e => setF('fabric', e.target.value)} placeholder="Premium Nida" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Category</label>
                <input className={inp} list="cat-list" value={form.category} onChange={e => setF('category', e.target.value)} placeholder="Open Abaya" />
                <datalist id="cat-list">{categories.map(c => <option key={c.slug} value={c.name} />)}</datalist>
              </div>
              <div>
                <label className={lbl}>Subcategory</label>
                <input className={inp} value={form.subcategory} onChange={e => setF('subcategory', e.target.value)} placeholder="Nida" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="inStock" checked={form.inStock} onChange={e => setF('inStock', e.target.checked)} className="w-4 h-4 text-yellow-500 rounded border-gray-300" />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
              </div>
              <div>
                <label className={lbl}>Stock Count</label>
                <input className={inp} type="number" value={form.stockCount} onChange={e => setF('stockCount', e.target.value)} placeholder="Unlimited" />
              </div>
            </div>
            <div>
              <label className={lbl}>Highlights (one per line)</label>
              <textarea className={`${inp} resize-none`} rows={4} value={form.highlights} onChange={e => setF('highlights', e.target.value)} placeholder="Premium Nida Fabric&#10;Breathable Material" />
            </div>
            <div>
              <label className={lbl}>Tags (comma separated)</label>
              <input className={inp} value={form.tags} onChange={e => setF('tags', e.target.value)} placeholder="abaya, nida, premium" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>WhatsApp Number</label>
                <input className={inp} value={form.whatsappNumber} onChange={e => setF('whatsappNumber', e.target.value)} />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div>
                <label className={lbl}>Meta Title</label>
                <input className={inp} value={form.metaTitle} onChange={e => setF('metaTitle', e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Meta Description</label>
                <textarea className={`${inp} resize-none`} rows={2} value={form.metaDescription} onChange={e => setF('metaDescription', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Colors */}
        {tab === 1 && (
          <div className="space-y-4">
            {form.colors.map((color, ci) => (
              <div key={ci} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700">Color {ci + 1}</h4>
                  {form.colors.length > 1 && (
                    <button type="button" onClick={() => setF('colors', form.colors.filter((_, i) => i !== ci))} className="text-red-400 hover:text-red-600 transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={lbl}>Name</label>
                    <input className={inp} value={color.name} onChange={e => { const c = [...form.colors]; c[ci] = {...c[ci], name: e.target.value}; setF('colors', c) }} placeholder="Black" />
                  </div>
                  <div>
                    <label className={lbl}>Hex Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={color.hex} onChange={e => { const c = [...form.colors]; c[ci] = {...c[ci], hex: e.target.value}; setF('colors', c) }} className="w-10 h-9 rounded border border-gray-200 cursor-pointer" />
                      <input className={`${inp} flex-1`} value={color.hex} onChange={e => { const c = [...form.colors]; c[ci] = {...c[ci], hex: e.target.value}; setF('colors', c) }} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={lbl}>Image URLs (one per line)</label>
                  {color.images.map((img, ii) => (
                    <div key={ii} className="flex gap-2 mb-2">
                      <input className={inp} value={img} placeholder="https://..." onChange={e => { const c = [...form.colors]; c[ci].images[ii] = e.target.value; setF('colors', c) }} />
                      {color.images.length > 1 && (
                        <button type="button" onClick={() => { const c = [...form.colors]; c[ci].images = c[ci].images.filter((_, j) => j !== ii); setF('colors', c) }} className="text-red-400 hover:text-red-600 flex-shrink-0"><X size={14} /></button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => { const c = [...form.colors]; c[ci].images.push(''); setF('colors', c) }} className="text-xs text-yellow-600 hover:text-yellow-700 flex items-center gap-1 mt-1">
                    <Plus size={12} /> Add image URL
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setF('colors', [...form.colors, { name: '', hex: '#000000', images: [''] }])} className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 border border-dashed border-gray-300 hover:border-yellow-400 px-4 py-3 rounded-xl w-full justify-center transition-colors">
              <Plus size={14} /> Add Color
            </button>
          </div>
        )}

        {/* Tab 2: Sizes */}
        {tab === 2 && (
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-2 text-xs font-medium text-gray-500 px-3 mb-1">
              <div>Size</div><div>Available</div><div>Chest (cm)</div><div>Waist (cm)</div><div>Hips (cm)</div><div>Length (cm)</div>
            </div>
            {form.sizes.map((size, si) => (
              <div key={si} className="grid grid-cols-6 gap-2 items-center bg-gray-50 rounded-lg px-3 py-2">
                <input className={`${inp} text-center font-medium`} value={size.label} onChange={e => { const s = [...form.sizes]; s[si] = {...s[si], label: e.target.value}; setF('sizes', s) }} />
                <div className="flex justify-center">
                  <input type="checkbox" checked={size.available} onChange={e => { const s = [...form.sizes]; s[si] = {...s[si], available: e.target.checked}; setF('sizes', s) }} className="w-4 h-4 text-yellow-500 rounded border-gray-300" />
                </div>
                {(['chest','waist','hips','length'] as const).map(field => (
                  <input key={field} className={inp} value={size.measurements[field]} placeholder="e.g. 90–94" onChange={e => { const s = [...form.sizes]; s[si].measurements[field] = e.target.value; setF('sizes', s) }} />
                ))}
              </div>
            ))}
            <button type="button" onClick={() => setF('sizes', [...form.sizes, { label: '', available: true, measurements: { chest: '', waist: '', hips: '', length: '' } }])} className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mt-2">
              <Plus size={13} /> Add size
            </button>
          </div>
        )}

        {/* Tab 3: Description */}
        {tab === 3 && (
          <div className="space-y-4">
            {(['overview','fabricDetails','stylingRecommendations','careInstructions'] as const).map(k => (
              <div key={k}>
                <label className={lbl}>{k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}</label>
                <textarea className={`${inp} resize-none`} rows={5} value={form.description[k]} onChange={e => setNested('description', k, e.target.value)} />
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Fabric & Delivery */}
        {tab === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Fabric Information</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['type','softness','weight','season','care','origin'] as const).map(k => (
                  <div key={k}>
                    <label className={lbl}>{k.charAt(0).toUpperCase()+k.slice(1)}</label>
                    <input className={inp} value={form.fabricInfo[k]} onChange={e => setNested('fabricInfo', k, e.target.value)} placeholder={k === 'type' ? 'Premium Nida Crepe' : ''} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Delivery Information</h3>
              <div className="space-y-3">
                <div>
                  <label className={lbl}>Estimated Days</label>
                  <input className={inp} value={form.deliveryInfo.estimatedDays} onChange={e => setNested('deliveryInfo','estimatedDays',e.target.value)} placeholder="3–5 Business Days" />
                </div>
                <div>
                  <label className={lbl}>Delivery Regions (one per line)</label>
                  <textarea className={`${inp} resize-none`} rows={3} value={form.deliveryInfo.regions} onChange={e => setNested('deliveryInfo','regions',e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Return Policy</label>
                    <input className={inp} value={form.deliveryInfo.returnPolicy} onChange={e => setNested('deliveryInfo','returnPolicy',e.target.value)} />
                  </div>
                  <div>
                    <label className={lbl}>Exchange Policy</label>
                    <input className={inp} value={form.deliveryInfo.exchangePolicy} onChange={e => setNested('deliveryInfo','exchangePolicy',e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Free Shipping Threshold (PKR)</label>
                  <input className={inp} type="number" value={form.deliveryInfo.freeShippingThreshold} onChange={e => setNested('deliveryInfo','freeShippingThreshold',e.target.value)} placeholder="5000" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: FAQs */}
        {tab === 5 && (
          <div className="space-y-3">
            {form.faqs.map((faq, fi) => (
              <div key={fi} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">FAQ {fi+1}</span>
                  <button type="button" onClick={() => setF('faqs', form.faqs.filter((_,i)=>i!==fi))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                </div>
                <div>
                  <label className={lbl}>Question</label>
                  <input className={inp} value={faq.question} onChange={e => { const f=[...form.faqs]; f[fi]={...f[fi],question:e.target.value}; setF('faqs',f) }} />
                </div>
                <div>
                  <label className={lbl}>Answer</label>
                  <textarea className={`${inp} resize-none`} rows={3} value={faq.answer} onChange={e => { const f=[...form.faqs]; f[fi]={...f[fi],answer:e.target.value}; setF('faqs',f) }} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setF('faqs',[...form.faqs,{question:'',answer:''}])} className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 border border-dashed border-gray-300 hover:border-yellow-400 px-4 py-3 rounded-xl w-full justify-center transition-colors">
              <Plus size={14} /> Add FAQ
            </button>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-all disabled:opacity-60">
          {saving && <Loader2 size={14} className="animate-spin" />}
          {mode === 'create' ? 'Create Product' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        <div className="ml-auto flex gap-2">
          {TABS.map((t, i) => (
            <button key={i} type="button" onClick={() => setTab(i)} className={`w-2 h-2 rounded-full transition-colors ${i===tab ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-gray-400'}`} />
          ))}
        </div>
      </div>
    </form>
  )
}
