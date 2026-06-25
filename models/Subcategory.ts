import mongoose, { Schema, Model } from 'mongoose'

const SubcategorySchema = new Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true, index: true },
  categorySlug:{ type: String, required: true, index: true },
  description: { type: String, default: '' },
  isActive:    { type: Boolean, default: true },
  sortOrder:   { type: Number, default: 0 },
}, { timestamps: true, versionKey: false })

export const SubcategoryModel: Model<any> =
  mongoose.models.Subcategory ?? mongoose.model('Subcategory', SubcategorySchema)
