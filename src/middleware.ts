import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, AUTH_COOKIE_NAME } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware to admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login page and auth routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Check for authentication cookie
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Verify JWT token
  const user = verifyJWT(token);
  if (!user || !user.isAdmin) {
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/:path*'
  ],
}; 