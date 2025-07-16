# Production Setup Guide for https://home.legacyh.fyi

## Environment Configuration

Create a `.env.local` file with the following production settings:

```env
# Discord OAuth Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
DISCORD_REDIRECT_URI=https://home.legacyh.fyi/api/auth/callback
DISCORD_GUILD_ID=your_discord_server_id_here

# JWT Secret (use a strong, random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NextAuth URL (for production)
NEXTAUTH_URL=https://home.legacyh.fyi

# Additional Production Settings
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://home.legacyh.fyi
```

## Discord Application Configuration

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to "OAuth2" section
4. Add both redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback`
   - Production: `https://home.legacyh.fyi/api/auth/callback`

## Cloudflare Configuration

### SSL/TLS Settings
1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to "SSL/TLS" section
4. Set **SSL/TLS encryption mode** to "Full (strict)"
5. Enable **Always Use HTTPS**

### Security Settings
1. Go to "Security" section
2. Set **Security Level** to "Medium"
3. Enable **Browser Integrity Check**
4. Go to "Security Headers" and configure:
   - **HSTS**: Enable with max-age 31536000
   - **X-Frame-Options**: DENY
   - **X-Content-Type-Options**: nosniff
   - **Referrer-Policy**: strict-origin-when-cross-origin

### Page Rules (Optional)
Create a page rule to force HTTPS:
- URL: `http://home.legacyh.fyi/*`
- Settings: Always Use HTTPS

## DNS Configuration

Ensure your DNS records point to your hosting provider:
- A record: `home.legacyh.fyi` → Your hosting IP
- CNAME record: `www.home.legacyh.fyi` → `home.legacyh.fyi`

## Hosting Provider Configuration

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Configure custom domain: `home.legacyh.fyi`
4. Enable automatic HTTPS

### Netlify
1. Connect your repository
2. Set environment variables in Netlify dashboard
3. Configure custom domain
4. Enable HTTPS

### Other Providers
- Set environment variables in your hosting platform
- Configure custom domain
- Enable HTTPS/SSL certificates

## Security Checklist

- [ ] Strong JWT secret configured
- [ ] Discord OAuth redirect URIs set correctly
- [ ] Cloudflare SSL/TLS set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] HSTS headers configured
- [ ] Environment variables set in hosting platform
- [ ] Custom domain configured
- [ ] HTTPS certificates active

## Testing Production

1. Deploy your application
2. Test Discord OAuth at: `https://home.legacyh.fyi/admin/login`
3. Verify HTTPS redirects work
4. Check that admin panel loads correctly
5. Test Discord authentication flow

## Troubleshooting

### HTTPS Issues
- Check Cloudflare SSL/TLS mode
- Verify DNS records are correct
- Ensure hosting provider supports HTTPS

### Discord OAuth Issues
- Verify redirect URI matches exactly: `https://home.legacyh.fyi/api/auth/callback`
- Check environment variables are set correctly
- Ensure Discord application has both dev and prod URIs

### Cloudflare Issues
- Check SSL/TLS mode is set to Full (strict)
- Verify Always Use HTTPS is enabled
- Check for any page rules that might interfere

## Monitoring

Set up monitoring for:
- SSL certificate expiration
- Discord OAuth failures
- Admin panel access logs
- Cloudflare analytics 