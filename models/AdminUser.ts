import mongoose, { Schema, Model } from 'mongoose'

const AdminUserSchema = new Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  name:     { type: String, required: true },
  role:     { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true, versionKey: false })

export const AdminUserModel: Model<any> =
  mongoose.models.AdminUser ?? mongoose.model('AdminUser', AdminUserSchema)
