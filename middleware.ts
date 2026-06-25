import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { ADMIN_COOKIE } from '@/lib/auth'

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'qyra-noor-fallback-secret-change-in-prod'
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, getSecret())
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/admin/login', request.url))
    res.cookies.delete(ADMIN_COOKIE)
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
