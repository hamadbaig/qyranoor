export interface ProductColor {
  name: string
  hex: string
  images: string[]
  videoUrl?: string
}

export interface SizeMeasurement {
  chest: string
  waist: string
  hips: string
  length: string
}

export interface ProductSize {
  label: string
  available: boolean
  measurements: SizeMeasurement
}

export interface ProductReview {
  id: string
  author: string
  location: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  photo?: string
  helpful: number
}

export interface ProductFAQItem {
  question: string
  answer: string
}

export interface FabricInfo {
  type: string
  softness: string
  weight: string
  season: string
  care: string
  origin: string
}

export interface Product {
  id: string
  slug: string
  name: string
  collection: string
  sku: string
  price: number
  originalPrice?: number
  currency: string
  currencySymbol: string
  inStock: boolean
  stockCount?: number
  category: string
  subcategory?: string
  fabric: string
  highlights: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  description: {
    overview: string
    fabricDetails: string
    stylingRecommendations: string
    careInstructions: string
  }
  fabricInfo: FabricInfo
  deliveryInfo: {
    estimatedDays: string
    regions: string[]
    returnPolicy: string
    exchangePolicy: string
    freeShippingThreshold?: number
  }
  faqs: ProductFAQItem[]
  reviews: ProductReview[]
  averageRating: number
  totalReviews: number
  relatedProductIds: string[]
  tags: string[]
  whatsappNumber: string
  metaTitle?: string
  metaDescription?: string
}
