'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, Plus, Trash2, Loader2, CheckCircle, Home } from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing'

// ── Types ──────────────────────────────────────────────────────────────────
interface Stat        { num: string; label: string }
interface Feature     { title: string; description: string }
interface Review      { author: string; location: string; rating: number; text: string; avatar: string }

interface Settings {
  hero: {
    badge: string; heading: string; subheading: string; image: string
    cta1Text: string; cta1Link: string; whatsappNumber: string
    stats: Stat[]
  }
  marquee: { items: string[] }
  brandStory: {
    label: string; heading: string; paragraphs: string[]
    image: string; badgeNum: string; badgeLabel: string
    stats: Stat[]; ctaText: string; ctaLink: string
  }
  whyUs:        { label: string; heading: string; features: Feature[] }
  testimonials: { label: string; heading: string; items: Review[] }
  whatsappCTA:  { heading: string; subheading: string; whatsappNumber: string; ctaMessage: string; trustSignals: string[] }
}

const TABS = ['Hero', 'Marquee', 'Brand Story', 'Why Us', 'Testimonials', 'WhatsApp CTA'] as const
type Tab = typeof TABS[number]

// ── Reusable field components ───────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  )
}
function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
    />
  )
}
function Textarea({ value, onChange, rows = 3, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
    />
  )
}
function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  return (
    <Field label={label}>
      <div className="space-y-2">
        {value && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
        <Input value={value} onChange={onChange} placeholder="https://... or upload below" />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={res => { if (res[0]) onChange(res[0].ufsUrl) }}
          onUploadError={err => alert(`Upload failed: ${err.message}`)}
          appearance={{
            button: 'bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors ut-uploading:opacity-60 w-full',
            allowedContent: 'text-gray-500 text-xs mt-1',
          }}
        />
      </div>
    </Field>
  )
}

// ── Stats editor ────────────────────────────────────────────────────────────
function StatsEditor({ stats, onChange }: { stats: Stat[]; onChange: (s: Stat[]) => void }) {
  const update = (i: number, key: keyof Stat, val: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s)
    onChange(next)
  }
  const add    = () => onChange([...stats, { num: '', label: '' }])
  const remove = (i: number) => onChange(stats.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-2">
      {stats.map((s, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={s.num} onChange={e => update(i, 'num', e.target.value)} placeholder="500+" className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500" />
          <input value={s.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500" />
          <button type="button" aria-label="Remove stat" onClick={() => remove(i)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors">
        <Plus size={12} /> Add stat
      </button>
    </div>
  )
}

// ── List editor (simple strings) ─────────────────────────────────────────────
function ListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (s: string[]) => void; placeholder?: string }) {
  const update = (i: number, val: string) => onChange(items.map((s, idx) => idx === i ? val : s))
  const add    = () => onChange([...items, ''])
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder} className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500" />
          <button type="button" aria-label="Remove item" onClick={() => remove(i)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors">
        <Plus size={12} /> Add item
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function HomepageAdmin() {
  const [tab,     setTab]     = useState<Tab>('Hero')
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/homepage')
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const set = useCallback(<K extends keyof Settings>(section: K, value: Settings[K]) => {
    setSettings(prev => prev ? { ...prev, [section]: value } : prev)
  }, [])

  const sub = <K extends keyof Settings>(section: K) =>
    <F extends keyof Settings[K]>(field: F, value: Settings[K][F]) =>
      set(section, { ...settings![section], [field]: value } as Settings[K])

  async function save() {
    if (!settings) return
    setSaving(true)
    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-yellow-500" />
      </div>
    )
  }

  if (!settings) {
    return <div className="p-8 text-red-400">Failed to load homepage settings.</div>
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center">
            <Home size={16} className="text-yellow-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Homepage CMS</h1>
            <p className="text-xs text-gray-500">Edit all home page content without touching code</p>
          </div>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1 mb-6 flex-wrap">
        {TABS.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              tab === t ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">

        {/* ── HERO ── */}
        {tab === 'Hero' && (
          <>
            <Field label="Badge Text">
              <Input value={settings.hero.badge} onChange={v => sub('hero')('badge', v)} placeholder="Luxury Modest Fashion" />
            </Field>
            <Field label="Main Heading">
              <Input value={settings.hero.heading} onChange={v => sub('hero')('heading', v)} placeholder="Where Modesty Meets Luxury" />
              <p className="text-[10px] text-gray-600 mt-1">The last word gets a gold underline. Keep it punchy.</p>
            </Field>
            <Field label="Subheading">
              <Textarea value={settings.hero.subheading} onChange={v => sub('hero')('subheading', v)} rows={3} />
            </Field>
            <ImageField label="Background Image" value={settings.hero.image} onChange={v => sub('hero')('image', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="CTA Button Text">
                <Input value={settings.hero.cta1Text} onChange={v => sub('hero')('cta1Text', v)} placeholder="Shop Collection" />
              </Field>
              <Field label="CTA Button Link">
                <Input value={settings.hero.cta1Link} onChange={v => sub('hero')('cta1Link', v)} placeholder="/#collections" />
              </Field>
            </div>
            <Field label="WhatsApp Number (digits only)">
              <Input value={settings.hero.whatsappNumber} onChange={v => sub('hero')('whatsappNumber', v)} placeholder="923347573726" />
            </Field>
            <Field label="Stats (shown under CTA)">
              <StatsEditor stats={settings.hero.stats} onChange={v => sub('hero')('stats', v)} />
            </Field>
          </>
        )}

        {/* ── MARQUEE ── */}
        {tab === 'Marquee' && (
          <Field label="Ticker Items (gold bar scrolling text)">
            <p className="text-[10px] text-gray-600 mb-2">Each item scrolls across the gold strip below the hero.</p>
            <ListEditor items={settings.marquee.items} onChange={v => set('marquee', { items: v })} placeholder="Premium Nida Fabric" />
          </Field>
        )}

        {/* ── BRAND STORY ── */}
        {tab === 'Brand Story' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Section Label">
                <Input value={settings.brandStory.label} onChange={v => sub('brandStory')('label', v)} placeholder="Our Philosophy" />
              </Field>
              <Field label="Section Heading">
                <Input value={settings.brandStory.heading} onChange={v => sub('brandStory')('heading', v)} placeholder="The Qyra Noor Story" />
              </Field>
            </div>
            <Field label="Paragraphs (one per entry)">
              <ListEditor
                items={settings.brandStory.paragraphs}
                onChange={v => sub('brandStory')('paragraphs', v)}
                placeholder="Write a paragraph…"
              />
            </Field>
            <ImageField label="Story Image" value={settings.brandStory.image} onChange={v => sub('brandStory')('image', v)} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Badge Number">
                <Input value={settings.brandStory.badgeNum} onChange={v => sub('brandStory')('badgeNum', v)} placeholder="10+" />
              </Field>
              <Field label="Badge Label">
                <Input value={settings.brandStory.badgeLabel} onChange={v => sub('brandStory')('badgeLabel', v)} placeholder="Years of Craft" />
              </Field>
            </div>
            <Field label="Stats">
              <StatsEditor stats={settings.brandStory.stats} onChange={v => sub('brandStory')('stats', v)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="CTA Button Text">
                <Input value={settings.brandStory.ctaText} onChange={v => sub('brandStory')('ctaText', v)} placeholder="Chat With Our Team" />
              </Field>
              <Field label="CTA Button Link">
                <Input value={settings.brandStory.ctaLink} onChange={v => sub('brandStory')('ctaLink', v)} placeholder="https://wa.me/923..." />
              </Field>
            </div>
          </>
        )}

        {/* ── WHY US ── */}
        {tab === 'Why Us' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Section Label">
                <Input value={settings.whyUs.label} onChange={v => sub('whyUs')('label', v)} placeholder="The Qyra Noor Difference" />
              </Field>
              <Field label="Section Heading">
                <Input value={settings.whyUs.heading} onChange={v => sub('whyUs')('heading', v)} placeholder="Why Choose Us" />
              </Field>
            </div>
            <Field label="Features (max 6 shown — icons are fixed by position)">
              <div className="space-y-3">
                {settings.whyUs.features.map((f, i) => (
                  <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Feature {i + 1}</span>
                      <button
                        type="button"
                        aria-label="Remove feature"
                        onClick={() => sub('whyUs')('features', settings.whyUs.features.filter((_, idx) => idx !== i))}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <input
                      value={f.title}
                      onChange={e => sub('whyUs')('features', settings.whyUs.features.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                      placeholder="Feature title"
                      className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                    />
                    <textarea
                      value={f.description}
                      onChange={e => sub('whyUs')('features', settings.whyUs.features.map((x, idx) => idx === i ? { ...x, description: e.target.value } : x))}
                      rows={2}
                      placeholder="Feature description"
                      className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500 resize-none"
                    />
                  </div>
                ))}
                {settings.whyUs.features.length < 6 && (
                  <button
                    type="button"
                    onClick={() => sub('whyUs')('features', [...settings.whyUs.features, { title: '', description: '' }])}
                    className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    <Plus size={12} /> Add feature
                  </button>
                )}
              </div>
            </Field>
          </>
        )}

        {/* ── TESTIMONIALS ── */}
        {tab === 'Testimonials' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Section Label">
                <Input value={settings.testimonials.label} onChange={v => sub('testimonials')('label', v)} placeholder="Real Stories" />
              </Field>
              <Field label="Section Heading">
                <Input value={settings.testimonials.heading} onChange={v => sub('testimonials')('heading', v)} placeholder="Loved By Our Community" />
              </Field>
            </div>
            <Field label="Reviews">
              <div className="space-y-4">
                {settings.testimonials.items.map((r, i) => (
                  <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Review {i + 1}</span>
                      <button
                        type="button"
                        aria-label="Remove review"
                        onClick={() => sub('testimonials')('items', settings.testimonials.items.filter((_, idx) => idx !== i))}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        value={r.author}
                        onChange={e => sub('testimonials')('items', settings.testimonials.items.map((x, idx) => idx === i ? { ...x, author: e.target.value } : x))}
                        placeholder="Author name"
                        className="bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                      />
                      <input
                        value={r.location}
                        onChange={e => sub('testimonials')('items', settings.testimonials.items.map((x, idx) => idx === i ? { ...x, location: e.target.value } : x))}
                        placeholder="Location"
                        className="bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <textarea
                      value={r.text}
                      onChange={e => sub('testimonials')('items', settings.testimonials.items.map((x, idx) => idx === i ? { ...x, text: e.target.value } : x))}
                      rows={3}
                      placeholder="Review text (wrap in quotes for style)"
                      className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500 resize-none"
                    />
                    {/* Avatar */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Avatar</p>
                      <div className="flex gap-3 items-start">
                        {r.avatar && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-700 flex-shrink-0" />
                        )}
                        <div className="flex-1 space-y-1.5">
                          <input
                            value={r.avatar}
                            onChange={e => sub('testimonials')('items', settings.testimonials.items.map((x, idx) => idx === i ? { ...x, avatar: e.target.value } : x))}
                            placeholder="https://..."
                            className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
                          />
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={res => {
                              if (res[0]) sub('testimonials')('items', settings.testimonials.items.map((x, idx) => idx === i ? { ...x, avatar: res[0].ufsUrl } : x))
                            }}
                            onUploadError={err => alert(`Upload failed: ${err.message}`)}
                            appearance={{
                              button: 'bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-semibold px-3 py-1 rounded-lg transition-colors ut-uploading:opacity-60 w-full',
                              allowedContent: 'text-gray-500 text-xs mt-0.5',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => sub('testimonials')('items', [...settings.testimonials.items, { author: '', location: '', rating: 5, text: '', avatar: '' }])}
                  className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <Plus size={12} /> Add review
                </button>
              </div>
            </Field>
          </>
        )}

        {/* ── WHATSAPP CTA ── */}
        {tab === 'WhatsApp CTA' && (
          <>
            <Field label="Heading (use \\n for a line break — second line appears in gold)">
              <Textarea value={settings.whatsappCTA.heading} onChange={v => sub('whatsappCTA')('heading', v)} rows={2} placeholder={'Your Dream Abaya\nIs One Message Away'} />
            </Field>
            <Field label="Subheading / Description">
              <Textarea value={settings.whatsappCTA.subheading} onChange={v => sub('whatsappCTA')('subheading', v)} rows={3} />
            </Field>
            <Field label="WhatsApp Number (digits only, no +)">
              <Input value={settings.whatsappCTA.whatsappNumber} onChange={v => sub('whatsappCTA')('whatsappNumber', v)} placeholder="923347573726" />
            </Field>
            <Field label="Pre-filled WhatsApp Message">
              <Textarea value={settings.whatsappCTA.ctaMessage} onChange={v => sub('whatsappCTA')('ctaMessage', v)} rows={3} />
            </Field>
            <Field label="Trust Signals (small dots at bottom)">
              <ListEditor items={settings.whatsappCTA.trustSignals} onChange={v => sub('whatsappCTA')('trustSignals', v)} placeholder="Replies within 1 hour" />
            </Field>
          </>
        )}
      </div>

      {/* Bottom save */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle size={14} /> : <Save size={14} />}
          {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
