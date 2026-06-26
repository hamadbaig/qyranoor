import mongoose, { Schema, Model } from 'mongoose'

const HomepageSettingsSchema = new Schema({
  hero: {
    badge:           { type: String, default: 'Luxury Modest Fashion' },
    heading:         { type: String, default: 'Where Modesty Meets Luxury' },
    subheading:      { type: String, default: 'Premium Nida abayas and modest wear crafted for the modern woman — exquisite fabrics, elegant silhouettes, and timeless grace.' },
    image:           { type: String, default: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80' },
    cta1Text:        { type: String, default: 'Shop Collection' },
    cta1Link:        { type: String, default: '/#collections' },
    whatsappNumber:  { type: String, default: '923347573726' },
    stats: { type: [{ num: String, label: String }], default: [
      { num: '500+', label: 'Happy Customers' },
      { num: '50+',  label: 'Premium Styles' },
      { num: '4.9★', label: 'Average Rating' },
    ]},
  },
  marquee: {
    items: { type: [String], default: [
      'Premium Nida Fabric', 'Handcrafted Quality', 'WhatsApp Easy Ordering',
      'Pakistan-wide Delivery', '7-Day Easy Returns', 'Custom Sizing Available',
      'Colour-Fast Technology', 'Modest & Elegant',
    ]},
  },
  brandStory: {
    label:      { type: String, default: 'Our Philosophy' },
    heading:    { type: String, default: 'The Qyra Noor Story' },
    paragraphs: { type: [String], default: [
      'Qyra Noor was born from a simple belief — that modest fashion should never compromise on luxury. Founded in Pakistan by a team of passionate designers and fabric specialists, we set out to redefine what it means to dress modestly.',
      'Every abaya we create begins with sourcing the finest Nida, crepe, and chiffon fabrics. Our master craftswomen spend hours perfecting each silhouette, each seam, each finishing detail — because we know that when you feel beautiful, you carry yourself differently.',
      'Today, Qyra Noor serves hundreds of women across Pakistan and beyond, delivering pieces that blend modern sensibility with timeless modest grace.',
    ]},
    image:      { type: String, default: '/images/abaya%204.jfif' },
    badgeNum:   { type: String, default: '10+' },
    badgeLabel: { type: String, default: 'Years of Craft' },
    stats: { type: [{ num: String, label: String }], default: [
      { num: '500+', label: 'Customers' },
      { num: '50+',  label: 'Styles' },
      { num: '4.9',  label: 'Avg. Rating' },
    ]},
    ctaText: { type: String, default: 'Chat With Our Team' },
    ctaLink: { type: String, default: 'https://wa.me/923347573726' },
  },
  whyUs: {
    label:   { type: String, default: 'The Qyra Noor Difference' },
    heading: { type: String, default: 'Why Choose Us' },
    features: { type: [{ title: String, description: String }], default: [
      { title: 'Premium Fabrics',         description: 'Only the finest Nida, crepe, and chiffon sourced from certified mills.' },
      { title: 'WhatsApp Ordering',       description: 'Order effortlessly via WhatsApp — no apps, no hassle, just instant service.' },
      { title: 'Pakistan-wide Delivery',  description: 'Fast delivery to all major cities in 3–5 business days.' },
      { title: '7-Day Easy Returns',      description: 'Not happy? Return within 7 days with zero questions asked.' },
      { title: 'Custom Sizing',           description: 'Made-to-measure options available for the perfect fit every time.' },
      { title: 'Quality Guaranteed',      description: 'Every piece is inspected before dispatch. Excellence is non-negotiable.' },
    ]},
  },
  testimonials: {
    label:   { type: String, default: 'Real Stories' },
    heading: { type: String, default: 'Loved By Our Community' },
    items: { type: [{ author: String, location: String, rating: Number, text: String, avatar: String }], default: [
      { author: 'Fatima Aziz',   location: 'Karachi',     rating: 5, text: '"The quality of the Nida Open Abaya is absolutely stunning. I\'ve been looking for a premium abaya brand in Pakistan for years — Qyra Noor is exactly what I needed."', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80' },
      { author: 'Sara Mahmood',  location: 'Lahore',      rating: 5, text: '"Ordered via WhatsApp and the whole process was seamless. The abaya arrived beautifully packaged in two days. Qyra Noor has set the bar very high!"',             avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
      { author: 'Nadia Rahman',  location: 'Islamabad',   rating: 5, text: '"I wear abayas daily and this is genuinely the most comfortable one I\'ve ever owned. Lightweight yet looks incredibly luxurious."',                                   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
      { author: 'Zainab Ali',    location: 'Dubai, UAE',  rating: 5, text: '"Ordered internationally and was amazed by how fast it arrived. The Pearl Beaded Abaya was worth every rupee — absolute perfection."',                                  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80' },
    ]},
  },
  whatsappCTA: {
    heading:        { type: String, default: 'Your Dream Abaya\nIs One Message Away' },
    subheading:     { type: String, default: 'Skip the checkout process. Message us directly on WhatsApp to browse our full collection, ask about custom sizing, or place your order in minutes — our team responds within the hour.' },
    whatsappNumber: { type: String, default: '923347573726' },
    ctaMessage:     { type: String, default: "Assalamu Alaikum! I'm interested in your abayas. Could you please share your latest collection and available styles?" },
    trustSignals:   { type: [String], default: ['Replies within 1 hour', 'Secure & trusted', 'Pakistan-wide delivery', 'International shipping'] },
  },
}, { timestamps: true, versionKey: false })

export const HomepageSettingsModel: Model<any> =
  mongoose.models.HomepageSettings ?? mongoose.model('HomepageSettings', HomepageSettingsSchema)
