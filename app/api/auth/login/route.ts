import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AdminUserModel } from '@/models/AdminUser'
import { signToken, ADMIN_COOKIE } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    await connectDB()
    const user = await AdminUserModel.findOne({ email: email.toLowerCase().trim() }).lean<any>()
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const res = NextResponse.json({
      user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
    })
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return res
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
