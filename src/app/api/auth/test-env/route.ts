import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    DISCORD_CLIENT_ID: !!process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: !!process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  };

  return NextResponse.json({
    message: 'Environment check',
    environment: process.env.NODE_ENV,
    config: envCheck,
    missing: Object.entries(envCheck)
      .filter(([key, value]) => !value && key !== 'DISCORD_GUILD_ID')
      .map(([key]) => key),
  });
} 