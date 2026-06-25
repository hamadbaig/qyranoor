import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb+srv://hammad:Hammad12345.@e-commerce.y3w9cfo.mongodb.net/qyra-noor'

async function main() {
  await mongoose.connect(MONGODB_URI)

  const db = mongoose.connection.db!

  // ─── Admin user ──────────────────────────────────────────────
  const adminCollection = db.collection('adminusers')
  const ADMIN_EMAIL    = 'admin@qyranoor.com'
  const ADMIN_PASSWORD = 'Admin@123'
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12)

  await adminCollection.updateOne(
    { email: ADMIN_EMAIL },
    { $set: { email: ADMIN_EMAIL, password: hash, name: 'Qyra Noor Admin', role: 'superadmin', updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  )
  console.log('✅ Admin user seeded:', ADMIN_EMAIL, '/ password:', ADMIN_PASSWORD)

  // ─── Categories ───────────────────────────────────────────────
  const catCollection = db.collection('categories')
  const categories = [
    { name: 'Open Abayas',       slug: 'open-abayas',       description: 'Classic open-front abayas for everyday elegance.',  image: 'https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=400', isActive: true, sortOrder: 1 },
    { name: 'Butterfly Abayas',  slug: 'butterfly-abayas',  description: 'Flowing butterfly-cut abayas for effortless grace.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', isActive: true, sortOrder: 2 },
    { name: 'Occasion Wear',     slug: 'occasion-wear',     description: 'Luxurious embellished abayas for special moments.',  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', isActive: true, sortOrder: 3 },
    { name: 'Wrap Abayas',       slug: 'wrap-abayas',       description: 'Modern belted wrap abayas with a contemporary twist.',image: 'https://images.unsplash.com/photo-1612440761613-0f1e30e1f7c8?w=400', isActive: true, sortOrder: 4 },
    { name: 'Scarves',           slug: 'scarves',           description: 'Premium hijabs and scarves to complete your look.',  image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', isActive: true, sortOrder: 5 },
  ]

  for (const cat of categories) {
    await catCollection.updateOne(
      { slug: cat.slug },
      { $set: { ...cat, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    )
  }
  console.log('✅ Categories seeded:', categories.map(c => c.name).join(', '))

  // ─── Subcategories ────────────────────────────────────────────
  const subCollection = db.collection('subcategories')
  const subcategories = [
    { name: 'Nida Open Abayas',    slug: 'nida-open-abayas',    categorySlug: 'open-abayas',      isActive: true, sortOrder: 1 },
    { name: 'Crepe Open Abayas',   slug: 'crepe-open-abayas',   categorySlug: 'open-abayas',      isActive: true, sortOrder: 2 },
    { name: 'Embroidered',         slug: 'embroidered',         categorySlug: 'butterfly-abayas', isActive: true, sortOrder: 1 },
    { name: 'Plain Butterfly',     slug: 'plain-butterfly',     categorySlug: 'butterfly-abayas', isActive: true, sortOrder: 2 },
    { name: 'Wedding Abayas',      slug: 'wedding-abayas',      categorySlug: 'occasion-wear',    isActive: true, sortOrder: 1 },
    { name: 'Formal Occasion',     slug: 'formal-occasion',     categorySlug: 'occasion-wear',    isActive: true, sortOrder: 2 },
    { name: 'Belted Wraps',        slug: 'belted-wraps',        categorySlug: 'wrap-abayas',      isActive: true, sortOrder: 1 },
    { name: 'Nida Hijabs',         slug: 'nida-hijabs',         categorySlug: 'scarves',          isActive: true, sortOrder: 1 },
    { name: 'Chiffon Scarves',     slug: 'chiffon-scarves',     categorySlug: 'scarves',          isActive: true, sortOrder: 2 },
  ]

  for (const sub of subcategories) {
    await subCollection.updateOne(
      { slug: sub.slug },
      { $set: { ...sub, description: '', updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    )
  }
  console.log('✅ Subcategories seeded:', subcategories.length, 'items')

  await mongoose.disconnect()
  console.log('\n🎉 All done! Login at http://localhost:3000/admin/login')
  console.log('   Email:    admin@qyranoor.com')
  console.log('   Password: Admin@123')
}

main().catch(err => { console.error(err); process.exit(1) })
