import { NextRequest, NextResponse } from 'next/server';
import { 
  getDiscordAccessToken, 
  getDiscordUser, 
  getDiscordGuilds, 
  createJWT, 
  setAuthCookie 
} from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('Discord OAuth error:', error);
      return NextResponse.redirect(new URL('/admin/login?error=oauth_denied', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/admin/login?error=no_code', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    // Exchange code for access token
    const accessToken = await getDiscordAccessToken(code);
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login?error=token_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    // Get Discord user info
    const discordUser = await getDiscordUser(accessToken);
    if (!discordUser || !discordUser.id) {
      return NextResponse.redirect(new URL('/admin/login?error=user_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    // Get user's Discord guilds (servers)
    const guilds = await getDiscordGuilds(accessToken);
    
    // Check if user is a member of the specified Discord guild
    const requiredGuildId = process.env.DISCORD_GUILD_ID;
    if (!requiredGuildId) {
      console.error('DISCORD_GUILD_ID not configured');
      return NextResponse.redirect(new URL('/admin/login?error=config_error', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

    const isMember = guilds.some(guild => guild.id === requiredGuildId);
    if (!isMember) {
      return NextResponse.redirect(new URL('/admin/login?error=not_member', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    }

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

    // Create JWT token
    const token = createJWT(user);

    // Create response with redirect to admin dashboard
    const response = NextResponse.redirect(new URL('/admin', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
    
    // Set authentication cookie
    response.headers.set('Set-Cookie', setAuthCookie(token));
    
    return response;
  } catch (error) {
    console.error('Discord callback error:', error);
    return NextResponse.redirect(new URL('/admin/login?error=callback_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  }
} 