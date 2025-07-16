import jwt from 'jsonwebtoken';
import type { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Discord OAuth URLs and configuration
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

// Use external domain for production, localhost for development
const getRedirectUri = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DISCORD_REDIRECT_URI || 'http://85.165.117.85/api/auth/callback';
  }
  return process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
};

export const DISCORD_REDIRECT_URI = getRedirectUri();

export function getDiscordAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID || '',
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds',
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

// Exchange Discord code for access token
export async function getDiscordAccessToken(code: string): Promise<string | null> {
  try {
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID || '',
        client_secret: DISCORD_CLIENT_SECRET || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    });

    const data = await response.json();
    return data.access_token || null;
  } catch (error) {
    console.error('Error getting Discord access token:', error);
    return null;
  }
}

// Get Discord user info
export async function getDiscordUser(accessToken: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error getting Discord user:', error);
    return null;
  }
}

// Get Discord guilds (servers) for role checking
export async function getDiscordGuilds(accessToken: string): Promise<Record<string, unknown>[]> {
  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const guilds = await response.json();
    return Array.isArray(guilds) ? guilds : [];
  } catch (error) {
    console.error('Error getting Discord guilds:', error);
    return [];
  }
}

// Check if user has admin role in the studio's Discord server
export function checkAdminRole(guilds: Record<string, unknown>[], studioGuildId?: string): boolean {
  if (!studioGuildId) return false;
  
  const studioGuild = guilds.find(guild => guild.id === studioGuildId);
  if (!studioGuild) return false;

  // Check if user has Administrator permission
  const ADMINISTRATOR_PERMISSION = 0x8;
  const permissions = Number(studioGuild.permissions);
  return (permissions & ADMINISTRATOR_PERMISSION) === ADMINISTRATOR_PERMISSION;
}

// JWT token utilities
export function createJWT(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      discordId: user.discordId,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyJWT(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id: string;
      discordId: string;
      username: string;
      discriminator?: string;
      avatar?: string;
      roles?: string[];
      isAdmin?: boolean;
    };
    return {
      id: decoded.id,
      discordId: decoded.discordId,
      username: decoded.username,
      discriminator: decoded.discriminator || '0000',
      avatar: decoded.avatar || '',
      roles: decoded.roles || [],
      isAdmin: decoded.isAdmin || false,
    };
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null;
  }
}

// Cookie utilities for authentication
export const AUTH_COOKIE_NAME = 'nextarch-admin-token';

export function setAuthCookie(token: string): string {
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  const isLocalhost = process.env.NODE_ENV === 'development';
  const secureFlag = isLocalhost ? '' : '; Secure';
  return `${AUTH_COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Max-Age=${maxAge}; Path=/${secureFlag}`;
}

export function clearAuthCookie(): string {
  const isLocalhost = process.env.NODE_ENV === 'development';
  const secureFlag = isLocalhost ? '' : '; Secure';
  return `${AUTH_COOKIE_NAME}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/${secureFlag}`;
}

// Mock user data for development (remove in production)
export const mockAdminUser: User = {
  id: 'admin-1',
  discordId: '123456789',
  username: 'AdminUser',
  discriminator: '0001',
  avatar: '',
  roles: ['Administrator'],
  isAdmin: true,
};

export function isValidUser(user: User | null): user is User {
  return user !== null && user.isAdmin === true;
}