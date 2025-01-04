import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { serialize } from 'cookie'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      return NextResponse.json({ error: 'Email ya da şifre hatalı' }, { status: 401 });
    }
    

    const cookie = serialize('auth_token', user.id.toString(), {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 7 * 24,
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}