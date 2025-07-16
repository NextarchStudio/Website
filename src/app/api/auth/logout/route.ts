import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Create response with redirect to login page
    const response = NextResponse.json({ success: true });
    
    // Clear authentication cookie
    response.headers.set('Set-Cookie', clearAuthCookie());
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST(); // Allow both GET and POST for flexibility
}