import { NextResponse } from 'next/server';
import { createJWT, setAuthCookie, mockAdminUser } from '@/lib/auth';

// Development mode login route - bypasses Discord OAuth for testing
export async function GET() {
  try {
    // In production, this should be disabled or removed
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Development login disabled in production' },
        { status: 403 }
      );
    }

    // Create JWT token for mock admin user
    const token = createJWT(mockAdminUser);
    
    // Create response with redirect to admin dashboard
    const response = NextResponse.redirect(new URL('/admin', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    
    // Set authentication cookie
    response.headers.set('Set-Cookie', setAuthCookie(token));
    
    return response;
  } catch (error) {
    console.error('Dev login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(); // Allow both GET and POST for flexibility
}