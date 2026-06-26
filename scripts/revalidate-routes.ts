/**
 * Manually revalidate all product routes.
 * Usage: npx ts-node -e "require('./scripts/revalidate-routes.ts')"
 *   or:  npx tsx scripts/revalidate-routes.ts [base-url]
 *
 * Defaults to http://localhost:3000. Pass a different base URL as the first arg.
 */

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb+srv://hammad:Hammad12345.@e-commerce.y3w9cfo.mongodb.net/qyra-noor'
const BASE_URL    = process.argv[2] ?? 'http://localhost:3000'

async function main() {
  console.log(`Connecting to MongoDB…`)
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db!

  const slugs: string[] = await db
    .collection('products')
    .find({}, { projection: { slug: 1 } })
    .map((d: any) => d.slug as string)
    .toArray()

  console.log(`Found ${slugs.length} products. Revalidating…`)

  const paths = ['/products', '/', ...slugs.map(s => `/products/${s}`)]

  let ok = 0, fail = 0
  for (const path of paths) {
    try {
      const res = await fetch(`${BASE_URL}/api/revalidate?path=${encodeURIComponent(path)}`)
      if (res.ok) { ok++; console.log(`  ✓ ${path}`) }
      else        { fail++; console.warn(`  ✗ ${path} (${res.status})`) }
    } catch (e: any) {
      fail++
      console.warn(`  ✗ ${path} — ${e.message}`)
    }
  }

  await mongoose.disconnect()
  console.log(`\nDone: ${ok} revalidated, ${fail} failed.`)
}

main().catch(err => { console.error(err); process.exit(1) })
