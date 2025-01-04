import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../../lib/prisma' // Prisma client'ı buraya göre ayarlayın

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    // Burada JWT token veya session yönetimi ekleyebilirsiniz
    return NextResponse.json({ message: 'Login successful', user })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}