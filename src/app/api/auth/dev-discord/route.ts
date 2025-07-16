import { NextRequest, NextResponse } from 'next/server';
import { 
  getDiscordAccessToken, 
  getDiscordUser, 
  createJWT, 
  setAuthCookie 
} from '@/lib/auth';

// Development-only route that bypasses guild membership checks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('Dev Discord callback started', { code: !!code, error });

    // Handle OAuth errors
    if (error) {
      console.error('Discord OAuth error:', error);
      return NextResponse.redirect(new URL('/admin/login?error=oauth_denied', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/admin/login?error=no_code', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    console.log('Exchanging code for access token...');

    // Exchange code for access token
    const accessToken = await getDiscordAccessToken(code);
    if (!accessToken) {
      console.error('Failed to get access token');
      return NextResponse.redirect(new URL('/admin/login?error=token_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    console.log('Getting Discord user info...');

    // Get Discord user info
    const discordUser = await getDiscordUser(accessToken);
    if (!discordUser || !discordUser.id) {
      console.error('Failed to get Discord user info', discordUser);
      return NextResponse.redirect(new URL('/admin/login?error=user_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    console.log('Discord user:', { id: discordUser.id, username: discordUser.username });

    // Skip guild membership check for development
    console.log('Skipping guild membership check (dev mode)');

    // Create user object
    const user = {
      id: `discord-${discordUser.id}`,
      discordId: discordUser.id as string,
      username: discordUser.username as string,
      discriminator: discordUser.discriminator as string || '0000',
      avatar: discordUser.avatar as string || '',
      roles: ['Member'],
      isAdmin: true,
    };

    console.log('Creating JWT token for user:', user.username);

    // Create JWT token
    const token = createJWT(user);

    console.log('Redirecting to admin dashboard...');

    // Create response with redirect to admin dashboard
    const response = NextResponse.redirect(new URL('/admin', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    
    // Set authentication cookie
    const cookieValue = setAuthCookie(token);
    console.log('Setting auth cookie:', cookieValue.substring(0, 50) + '...');
    response.headers.set('Set-Cookie', cookieValue);
    
    return response;
  } catch (error) {
    console.error('Dev Discord callback error:', error);
    return NextResponse.redirect(new URL('/admin/login?error=callback_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  }
} 