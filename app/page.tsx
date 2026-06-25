import { getAllProducts } from '@/lib/products.server'
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
  const products = await getAllProducts()

  return (
    <>
      <Header variant="dark" />
      <main className="min-h-screen">
        <HeroSection />
        <MarqueeTicker />
        <CollectionGrid />
        <FeaturedProducts products={products} />
        <BrandStory />
        <WhyUs />
        <Testimonials />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  )
}
