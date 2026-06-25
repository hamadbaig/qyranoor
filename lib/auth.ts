import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_COOKIE = 'admin_token'

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'qyra-noor-fallback-secret-change-in-prod'
  )
}

export interface AdminPayload {
  id: string
  email: string
  name: string
  role: string
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<AdminPayload> {
  const { payload } = await jwtVerify(token, getSecret())
  return payload as unknown as AdminPayload
}
