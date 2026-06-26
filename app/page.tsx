import { getAllProducts } from '@/lib/products.server'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { HomepageSettingsModel } from '@/models/HomepageSettings'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import MarqueeTicker from '@/components/home/MarqueeTicker'
import CollectionGrid from '@/components/home/CollectionGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import BrandStory from '@/components/home/BrandStory'
import WhyUs from '@/components/home/WhyUs'
import Testimonials from '@/components/home/Testimonials'
import WhatsAppCTA from '@/components/home/WhatsAppCTA'

export const revalidate = 60

export const metadata = {
  title: 'Qyra Noor — Premium Modest Fashion | Luxury Abayas & Scarves Pakistan',
  description:
    'Discover handcrafted luxury abayas and scarves by Qyra Noor — where modest fashion meets timeless elegance. Premium Nida, crepe & chiffon. Shop via WhatsApp.',
}

export default async function HomePage() {
  await connectDB()
  const [products, categoriesRaw, hpSettings] = await Promise.all([
    getAllProducts(),
    CategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean<any[]>(),
    HomepageSettingsModel.findOneAndUpdate(
      {},
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean<any>(),
  ])

  const categories = categoriesRaw.map((c: any) => ({
    name: c.name,
    slug: c.slug,
    description: c.description ?? '',
    image: c.image ?? '',
  }))

  const hp = hpSettings ?? {}

  return (
    <>
      <Header variant="dark" />
      <main className="min-h-screen">
        <HeroSection     settings={hp.hero} />
        <MarqueeTicker   items={hp.marquee?.items} />
        <CollectionGrid  categories={categories} />
        <FeaturedProducts products={products} />
        <BrandStory      settings={hp.brandStory} />
        <WhyUs           settings={hp.whyUs} />
        <Testimonials    settings={hp.testimonials} />
        <WhatsAppCTA     settings={hp.whatsappCTA} />
      </main>
      <Footer />
    </>
  )
}
