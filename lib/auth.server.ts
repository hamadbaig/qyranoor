import 'server-only'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, verifyToken, AdminPayload } from './auth'

export async function getAdminUser(): Promise<AdminPayload | null> {
  try {
    const store = await cookies()
    const token = store.get(ADMIN_COOKIE)?.value
    if (!token) return null
    return await verifyToken(token)
  } catch {
    return null
  }
}

export async function requireAdminUser(): Promise<AdminPayload> {
  const user = await getAdminUser()
  if (!user) throw new Error('Unauthorized')
  return user
}
