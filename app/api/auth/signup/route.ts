import { NextResponse } from 'next/server'
import * as argon2 from 'argon2';
import prisma from '../../../../lib/prisma' // Prisma client'ı buraya göre ayarlayın

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, companyName, phoneNumber, password } = await req.json()

    const hashedPassword = await argon2.hash(password)

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