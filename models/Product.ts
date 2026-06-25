import mongoose, { Schema, Model } from 'mongoose'

const ColorSchema = new Schema({
  name:     { type: String, required: true },
  hex:      { type: String, required: true },
  images:   [{ type: String }],
  videoUrl: { type: String },
}, { _id: false })

const MeasurementSchema = new Schema({
  chest:  String,
  waist:  String,
  hips:   String,
  length: String,
}, { _id: false })

const SizeSchema = new Schema({
  label:        { type: String, required: true },
  available:    { type: Boolean, default: true },
  measurements: { type: MeasurementSchema },
}, { _id: false })

const ReviewSchema = new Schema({
  id:       { type: String, required: true },
  author:   String,
  location: String,
  rating:   Number,
  date:     String,
  title:    String,
  comment:  String,
  verified: { type: Boolean, default: false },
  photo:    String,
  helpful:  { type: Number, default: 0 },
}, { _id: false })

const FAQSchema = new Schema({
  question: String,
  answer:   String,
}, { _id: false })

const ProductSchema = new Schema({
  id:              { type: String, required: true, unique: true, index: true },
  slug:            { type: String, required: true, unique: true, index: true },
  name:            { type: String, required: true },
  collection:      { type: String, required: true },
  sku:             { type: String, required: true, unique: true },
  price:           { type: Number, required: true },
  originalPrice:   { type: Number },
  currency:        { type: String, default: 'PKR' },
  currencySymbol:  { type: String, default: 'PKR' },
  inStock:         { type: Boolean, default: true },
  stockCount:      { type: Number },
  category:        { type: String, required: true },
  subcategory:     { type: String },
  fabric:          { type: String, required: true },
  highlights:      [{ type: String }],
  colors:          [ColorSchema],
  sizes:           [SizeSchema],
  description: {
    overview:                { type: String, default: '' },
    fabricDetails:           { type: String, default: '' },
    stylingRecommendations:  { type: String, default: '' },
    careInstructions:        { type: String, default: '' },
  },
  fabricInfo: {
    type:     { type: String },
    softness: { type: String },
    weight:   { type: String },
    season:   { type: String },
    care:     { type: String },
    origin:   { type: String },
  },
  deliveryInfo: {
    estimatedDays:          { type: String },
    regions:                [{ type: String }],
    returnPolicy:           { type: String },
    exchangePolicy:         { type: String },
    freeShippingThreshold:  { type: Number },
  },
  faqs:              [FAQSchema],
  reviews:           [ReviewSchema],
  averageRating:     { type: Number, default: 0 },
  totalReviews:      { type: Number, default: 0 },
  relatedProductIds: [{ type: String }],
  tags:              [{ type: String }],
  whatsappNumber:    { type: String, required: true },
  metaTitle:         { type: String },
  metaDescription:   { type: String },
}, {
  timestamps: true,
  versionKey: false,
})

export const ProductModel: Model<any> =
  mongoose.models.Product ?? mongoose.model('Product', ProductSchema)
