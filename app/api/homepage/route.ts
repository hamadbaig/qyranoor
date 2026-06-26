import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/mongodb'
import { HomepageSettingsModel } from '@/models/HomepageSettings'
import { getAdminUser } from '@/lib/auth.server'

export const revalidate = 0

export async function GET() {
  try {
    await connectDB()
    const settings = await HomepageSettingsModel.findOneAndUpdate(
      {},
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean()
    return NextResponse.json(settings)
  } catch (e) {
    console.error('[homepage GET]', e)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAdminUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()

    const settings = await HomepageSettingsModel.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean()

    revalidatePath('/')
    return NextResponse.json(settings)
  } catch (e) {
    console.error('[homepage PUT]', e)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
