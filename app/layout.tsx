import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Qyra Noor — Luxury Modest Fashion',
    template: '%s | Qyra Noor',
  },
  description: 'Discover premium modest fashion at Qyra Noor. Luxury abayas, modest wear, and accessories crafted with exceptional fabrics and attention to detail.',
  keywords: ['abaya', 'modest fashion', 'luxury abaya', 'nida abaya', 'qyra noor', 'Pakistani fashion'],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: 'Qyra Noor',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-cream min-h-screen antialiased">{children}</body>
    </html>
  )
}
