// middleware.ts veya middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isPublicRoute =
      pathname === '/' ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/register');
  const token = req.cookies.get('auth_token'); // JWT token'ı cookies'ten al

  const isProtectedRoute = pathname.startsWith('/admin');


  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url)); 
  }


  if (token && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url)); 
  }

  return NextResponse.next();
}

// matcher ile /admin yolunu hedef alıyoruz
export const config = {
  matcher: ['/:path*'], // /admin ile başlayan tüm yolları kapsar
};