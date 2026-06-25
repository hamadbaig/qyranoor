import { Product } from '@/types/product'

export const WHATSAPP_NUMBER = '923347573726'

const SIZES = [
  { label: 'XS', available: true, measurements: { chest: '82–86', waist: '66–70', hips: '90–94', length: '135' } },
  { label: 'S',  available: true, measurements: { chest: '86–90', waist: '70–74', hips: '94–98', length: '137' } },
  { label: 'M',  available: true, measurements: { chest: '90–94', waist: '74–78', hips: '98–102', length: '139' } },
  { label: 'L',  available: true, measurements: { chest: '94–98', waist: '78–82', hips: '102–106', length: '141' } },
  { label: 'XL', available: true, measurements: { chest: '98–102', waist: '82–86', hips: '106–110', length: '143' } },
  { label: 'XXL',available: false, measurements: { chest: '102–106', waist: '86–90', hips: '110–114', length: '145' } },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'luxury-nida-open-abaya',
    name: 'Luxury Nida Open Abaya',
    collection: 'Premium Collection',
    sku: 'QN-001',
    price: 8500,
    originalPrice: 10500,
    currency: 'PKR',
    currencySymbol: 'PKR',
    inStock: true,
    stockCount: 12,
    category: 'Open Abaya',
    subcategory: 'Nida',
    fabric: 'Premium Nida',
    highlights: [
      'Premium Nida Fabric',
      'Breathable Material',
      'Elegant Hand Stitching',
      'Modest Fit',
      'Suitable For Daily & Occasion Wear',
      'Colour-Fast Dye Technology',
    ],
    colors: [
      {
        name: 'Black',
        hex: '#1a1a1a',
        images: [
          'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=85',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
          'https://images.unsplash.com/photo-1594938298603-bec67fc00f9c?w=900&q=85',
        ],
      },
      {
        name: 'Mocha',
        hex: '#6b4c3b',
        images: [
          'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=900&q=85',
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85',
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85',
          'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=85',
        ],
      },
      {
        name: 'Olive',
        hex: '#556b2f',
        images: [
          'https://images.unsplash.com/photo-1612440761613-0f1e30e1f7c8?w=900&q=85',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
          'https://images.unsplash.com/photo-1594938298603-bec67fc00f9c?w=900&q=85',
        ],
      },
      {
        name: 'Navy',
        hex: '#1b2a4a',
        images: [
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85',
          'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=85',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
        ],
      },
      {
        name: 'Beige',
        hex: '#d9cbb8',
        images: [
          'https://images.unsplash.com/photo-1594938298603-bec67fc00f9c?w=900&q=85',
          'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=900&q=85',
          'https://images.unsplash.com/photo-1612440761613-0f1e30e1f7c8?w=900&q=85',
          'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=85',
        ],
      },
    ],
    sizes: SIZES,
    description: {
      overview: `The Luxury Nida Open Abaya is a masterpiece of modest fashion, crafted for the modern woman who refuses to compromise between elegance and comfort. Cut from the finest premium Nida fabric, this abaya drapes beautifully with a fluid, flowing silhouette that moves gracefully with every step.\n\nDesigned with meticulous attention to detail, the open front style offers versatility — wear it over your favourite ensemble for an effortlessly put-together look. The refined finish and precise tailoring reflect Qyra Noor's commitment to luxury modest wear.`,
      fabricDetails: `Crafted from 100% Premium Nida — a luxuriously smooth, lightweight crepe fabric renowned for its exceptional drape and wrinkle resistance. The fabric features a subtle lustre that catches the light elegantly without being overly shiny.\n\nOur Nida is sourced from certified mills and treated with our signature colour-fast dye process, ensuring vibrancy that lasts wash after wash. The fabric weight strikes the perfect balance between structure and flow, making it ideal for both daily wear and special occasions.`,
      stylingRecommendations: `Style this open abaya over a neutral-toned inner dress for a classic, refined look. For a contemporary twist, pair with wide-leg trousers and a fitted inner. A matching or contrasting hijab in georgette or chiffon completes the ensemble beautifully.\n\nThe Olive and Mocha tones pair particularly well with earth-toned accessories, while the Black and Navy styles are the perfect canvas for bold gold jewellery. For evening occasions, add a statement belt to define the waist.`,
      careInstructions: `• Hand wash in cold water with mild detergent\n• Machine wash at 30°C on a delicate cycle\n• Do not tumble dry — lay flat or hang to air dry in shade\n• Iron on low heat with a pressing cloth\n• Do not bleach or dry clean\n• Store folded or on a padded hanger to maintain shape`,
    },
    fabricInfo: {
      type: 'Premium Nida Crepe',
      softness: 'Ultra Soft',
      weight: 'Medium (120 gsm)',
      season: 'All Season',
      care: 'Hand / Machine Wash 30°C',
      origin: 'Certified Mill Fabric',
    },
    deliveryInfo: {
      estimatedDays: '3–5 Business Days',
      regions: ['All Major Cities in Pakistan', 'International Shipping Available'],
      returnPolicy: '7-day easy returns on unworn, unwashed items with original tags.',
      exchangePolicy: 'Free size exchange within 14 days of delivery.',
      freeShippingThreshold: 5000,
    },
    faqs: [
      { question: 'Is the hijab included?', answer: 'The hijab is not included with this product. However, we recommend our matching Nida Hijab (sold separately) for a coordinated look.' },
      { question: 'What fabric is used?', answer: 'This abaya is crafted from 100% Premium Nida Crepe — a smooth, lightweight fabric known for its exceptional drape and breathability.' },
      { question: 'Is it suitable for summer?', answer: 'Yes! Premium Nida is a breathable, lightweight fabric that regulates temperature, making it comfortable in warm weather while still providing full coverage.' },
      { question: 'Does the colour fade after washing?', answer: 'No. We use a proprietary colour-fast dye technology that ensures the colour remains vibrant even after multiple washes when cared for according to our guidelines.' },
      { question: 'Can I request a custom size?', answer: 'Yes, we offer made-to-measure options. Please contact us on WhatsApp with your measurements and we will be happy to accommodate your request.' },
      { question: 'How long does delivery take?', answer: 'Standard delivery takes 3–5 business days across major Pakistani cities. Express delivery (1–2 days) is available at an additional charge.' },
    ],
    reviews: [
      { id: 'r1', author: 'Fatima A.', location: 'Karachi', rating: 5, date: '2024-05-14', title: 'Absolutely stunning quality!', comment: 'The fabric is so soft and the stitching is impeccable. I received so many compliments the first time I wore it. The colour is exactly as shown in the pictures. Will definitely be ordering more!', verified: true, helpful: 24, photo: 'https://images.unsplash.com/photo-1594938298603-bec67fc00f9c?w=300&q=80' },
      { id: 'r2', author: 'Sara M.', location: 'Lahore', rating: 5, date: '2024-04-28', title: 'Perfect fit, worth every penny', comment: 'I ordered the Black in size M and it fits perfectly. The open front design is so elegant. I\'ve washed it twice now and the colour hasn\'t faded at all. Qyra Noor never disappoints!', verified: true, helpful: 18 },
      { id: 'r3', author: 'Zara K.', location: 'Islamabad', rating: 4, date: '2024-04-10', title: 'Beautiful, just one small note', comment: 'Gorgeous abaya overall — the Mocha colour is even more beautiful in person. I\'m giving 4 stars only because I wish it came with a matching hijab. Otherwise the quality is exceptional.', verified: true, helpful: 11 },
      { id: 'r4', author: 'Nadia R.', location: 'Dubai, UAE', rating: 5, date: '2024-03-22', title: 'Best abaya I have ever owned', comment: 'I\'ve been collecting abayas for years and this is genuinely one of the finest. The Nida fabric is luxurious, the drape is perfect, and it stays wrinkle-free all day. International shipping was fast too!', verified: true, helpful: 32, photo: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=300&q=80' },
    ],
    averageRating: 4.8,
    totalReviews: 47,
    relatedProductIds: ['2', '3', '4'],
    tags: ['abaya', 'open abaya', 'nida', 'premium', 'modest fashion', 'occasion wear'],
    whatsappNumber: WHATSAPP_NUMBER,
    metaTitle: 'Luxury Nida Open Abaya — Premium Collection | Qyra Noor',
    metaDescription: 'Discover the Luxury Nida Open Abaya from Qyra Noor. Crafted from 100% premium Nida fabric with elegant stitching. Available in Black, Mocha, Olive, Navy & Beige. PKR 8,500.',
  },
  {
    id: '2',
    slug: 'butterfly-abaya-embroidered',
    name: 'Butterfly Embroidered Abaya',
    collection: 'Signature Collection',
    sku: 'QN-002',
    price: 12500,
    currency: 'PKR',
    currencySymbol: 'PKR',
    inStock: true,
    category: 'Butterfly Abaya',
    fabric: 'Crepe',
    highlights: ['Hand Embroidery', 'Butterfly Cut', 'Premium Crepe', 'Occasion Wear'],
    colors: [
      { name: 'Black', hex: '#1a1a1a', images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85'] },
      { name: 'Dusty Rose', hex: '#c4927a', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85'] },
    ],
    sizes: SIZES,
    description: { overview: '', fabricDetails: '', stylingRecommendations: '', careInstructions: '' },
    fabricInfo: { type: 'Premium Crepe', softness: 'Soft', weight: 'Medium', season: 'All Season', care: 'Dry Clean', origin: 'Certified Mill' },
    deliveryInfo: { estimatedDays: '3–5 Business Days', regions: ['Pakistan', 'International'], returnPolicy: '7-day returns', exchangePolicy: 'Free exchange 14 days' },
    faqs: [],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 23,
    relatedProductIds: ['1', '3'],
    tags: ['butterfly abaya', 'embroidered', 'occasion wear'],
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: '3',
    slug: 'nida-wrap-abaya-belted',
    name: 'Belted Wrap Abaya',
    collection: 'Contemporary Collection',
    sku: 'QN-003',
    price: 9800,
    currency: 'PKR',
    currencySymbol: 'PKR',
    inStock: true,
    category: 'Wrap Abaya',
    fabric: 'Premium Nida',
    highlights: ['Belt Included', 'Wrap Silhouette', 'Nida Fabric', 'Daily Wear'],
    colors: [
      { name: 'Camel', hex: '#c19a6b', images: ['https://images.unsplash.com/photo-1612440761613-0f1e30e1f7c8?w=900&q=85'] },
      { name: 'Black', hex: '#1a1a1a', images: ['https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=900&q=85'] },
    ],
    sizes: SIZES,
    description: { overview: '', fabricDetails: '', stylingRecommendations: '', careInstructions: '' },
    fabricInfo: { type: 'Premium Nida', softness: 'Ultra Soft', weight: 'Light-Medium', season: 'All Season', care: 'Machine Wash 30°C', origin: 'Certified Mill' },
    deliveryInfo: { estimatedDays: '3–5 Business Days', regions: ['Pakistan', 'International'], returnPolicy: '7-day returns', exchangePolicy: 'Free exchange 14 days' },
    faqs: [],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 31,
    relatedProductIds: ['1', '2'],
    tags: ['wrap abaya', 'belted', 'nida', 'daily wear'],
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: '4',
    slug: 'pearl-beaded-abaya',
    name: 'Pearl Beaded Abaya',
    collection: 'Luxury Occasion',
    sku: 'QN-004',
    price: 15000,
    currency: 'PKR',
    currencySymbol: 'PKR',
    inStock: true,
    category: 'Occasion Abaya',
    fabric: 'Nida with Pearl Embellishment',
    highlights: ['Hand-Placed Pearls', 'Occasion Wear', 'Luxury Lining', 'Gift Packaged'],
    colors: [
      { name: 'Black', hex: '#1a1a1a', images: ['https://images.unsplash.com/photo-1594938298603-bec67fc00f9c?w=900&q=85'] },
      { name: 'Ivory', hex: '#f5f0e8', images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85'] },
    ],
    sizes: SIZES,
    description: { overview: '', fabricDetails: '', stylingRecommendations: '', careInstructions: '' },
    fabricInfo: { type: 'Nida + Pearl', softness: 'Soft', weight: 'Medium', season: 'Occasions', care: 'Dry Clean Only', origin: 'Hand-Finished' },
    deliveryInfo: { estimatedDays: '5–7 Business Days', regions: ['Pakistan', 'International'], returnPolicy: '7-day returns', exchangePolicy: 'Exchange within 14 days' },
    faqs: [],
    reviews: [],
    averageRating: 5.0,
    totalReviews: 14,
    relatedProductIds: ['1', '2', '3'],
    tags: ['occasion abaya', 'pearl', 'luxury', 'wedding'],
    whatsappNumber: WHATSAPP_NUMBER,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[]
}

export function formatPrice(price: number, symbol: string = 'PKR'): string {
  return `${symbol} ${price.toLocaleString('en-PK')}`
}
