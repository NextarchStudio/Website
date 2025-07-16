import { NextRequest, NextResponse } from 'next/server';

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
  const token = request.cookies.get('nextarch-admin-token')?.value;
  
  console.log('Middleware check:', {
    pathname,
    hasToken: !!token,
    tokenLength: token?.length || 0
  });
  
  if (!token) {
    console.log('No token found, redirecting to login');
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // For now, just check if token exists (we'll verify it properly in the API routes)
  // The Edge runtime doesn't support the crypto module needed for JWT verification
  // We'll handle proper verification in the API routes instead
  
  console.log('Token found, allowing access');
  // User has token, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/:path*'
  ],
}; 