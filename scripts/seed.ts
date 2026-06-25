import mongoose from 'mongoose'
import { products } from '../lib/products'

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb+srv://hammad:Hammad12345.@e-commerce.y3w9cfo.mongodb.net/qyra-noor'

async function seed() {
  console.log('Connecting to MongoDB…')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected.')

  const db = mongoose.connection.db!
  const col = db.collection('products')

  let inserted = 0
  let updated = 0

  for (const product of products) {
    const result = await col.updateOne(
      { slug: product.slug },
      { $set: product },
      { upsert: true }
    )
    if (result.upsertedCount) inserted++
    else if (result.modifiedCount) updated++
  }

  console.log(`Seed complete — ${inserted} inserted, ${updated} updated, ${products.length} total.`)
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
