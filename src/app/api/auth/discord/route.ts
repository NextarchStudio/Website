import { NextResponse } from 'next/server';
import { getDiscordAuthUrl } from '@/lib/auth';

export async function GET() {
  try {
    // Redirect to Discord OAuth
    const authUrl = getDiscordAuthUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Discord auth error:', error);
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  }
} 