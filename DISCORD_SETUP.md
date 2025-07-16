# Discord OAuth Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Discord OAuth Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback
DISCORD_GUILD_ID=your_discord_server_id_here

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NextAuth URL (for development)
NEXTAUTH_URL=http://localhost:3000
```

## Discord Application Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "OAuth2" section
4. Add the redirect URI: `http://localhost:3000/api/auth/callback`
5. Copy the Client ID and Client Secret to your `.env.local` file

## Discord Server Setup

1. Get your Discord server ID (right-click on your server name and copy ID)
2. Add the server ID to `DISCORD_GUILD_ID` in your `.env.local` file
3. Make sure users are members of your Discord server to access the admin panel

## Features Implemented

### Authentication Flow
- ✅ Discord OAuth2 integration
- ✅ JWT token generation and verification
- ✅ Guild membership verification (must be member of specified Discord server)
- ✅ Secure cookie-based sessions
- ✅ Middleware protection for admin routes

### API Endpoints
- ✅ `/api/auth/discord` - Initiates Discord OAuth
- ✅ `/api/auth/callback` - Handles OAuth callback and checks guild membership
- ✅ `/api/auth/me` - Get current user info
- ✅ `/api/auth/logout` - Logout functionality
- ✅ `/api/auth/dev-login` - Development mode login

### Admin Panel Integration
- ✅ Real authentication in all admin pages
- ✅ User information display
- ✅ Proper error handling
- ✅ Loading states during authentication

### Security Features
- ✅ JWT token verification
- ✅ Guild membership verification
- ✅ Secure cookie handling
- ✅ CSRF protection
- ✅ Error handling for failed authentication

## Usage

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Click "Login with Discord"
4. Authorize the application in Discord
5. You'll be redirected to the admin panel if you're a member of the specified Discord server

## Development Mode

For testing without Discord, you can use the "Dev Mode Login" button which bypasses Discord OAuth and creates a mock admin user.

## Production Considerations

1. Change the JWT secret to a strong, random string
2. Update the redirect URI to your production domain
3. Set up proper environment variables in your hosting platform
4. Consider implementing rate limiting
5. Add proper logging for authentication events
6. Set up monitoring for failed authentication attempts

## Error Messages

The system now handles these specific error cases:
- `not_member` - User is not a member of the required Discord server
- `config_error` - DISCORD_GUILD_ID is not configured
- `oauth_denied` - User cancelled Discord OAuth
- `token_failed` - Failed to exchange authorization code
- `user_failed` - Failed to get user information from Discord
- `callback_failed` - General callback error 