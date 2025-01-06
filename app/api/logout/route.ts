import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // Çerezleri temizle
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Yalnızca prod ortamında secure olsun
    expires: new Date(0), // Çerez hemen geçersiz olsun
    path: '/', // Çerez tüm alan için geçerli
  });

  return response;
}