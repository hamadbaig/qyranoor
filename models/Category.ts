import mongoose, { Schema, Model } from 'mongoose'

const CategorySchema = new Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true, index: true },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  isActive:    { type: Boolean, default: true },
  sortOrder:   { type: Number, default: 0 },
}, { timestamps: true, versionKey: false })

export const CategoryModel: Model<any> =
  mongoose.models.Category ?? mongoose.model('Category', CategorySchema)
