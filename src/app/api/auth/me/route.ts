import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const user = verifyJWT(token);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Invalid or insufficient permissions' },
        { status: 403 }
      );
    }

    // Return user information
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error getting current user:', error);
    return NextResponse.json(
      { error: 'Failed to get user information' },
      { status: 500 }
    );
  }
} 