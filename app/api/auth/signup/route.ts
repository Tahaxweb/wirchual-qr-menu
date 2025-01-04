import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../../lib/prisma' // Prisma client'ı buraya göre ayarlayın

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, companyName, phoneNumber, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        companyName,
        phoneNumber,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 })
  }
}