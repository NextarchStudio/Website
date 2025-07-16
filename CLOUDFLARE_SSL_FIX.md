# Fix SSL Handshake Failed (Error 525) - Cloudflare

## What is Error 525?

Error 525 occurs when Cloudflare can't establish a secure SSL/TLS connection with your origin server (hosting provider). This is typically a configuration issue between Cloudflare and your hosting provider.

## Step-by-Step Fix

### 1. Check Cloudflare SSL/TLS Settings

1. **Go to Cloudflare Dashboard**
   - Login to [Cloudflare](https://dash.cloudflare.com)
   - Select your domain: `legacyh.fyi`

2. **SSL/TLS Configuration**
   - Go to "SSL/TLS" section
   - Set **SSL/TLS encryption mode** to "Full" (not Full strict for now)
   - Enable **Always Use HTTPS**

### 2. Check Your Hosting Provider SSL

**If using Vercel:**
- Vercel automatically provides SSL certificates
- No additional configuration needed

**If using Netlify:**
- Netlify provides automatic SSL
- Check domain configuration in Netlify dashboard

**If using other providers:**
- Ensure your hosting provider supports HTTPS
- Check if you need to install SSL certificates

### 3. DNS Configuration

1. **Check DNS Records**
   - Go to Cloudflare "DNS" section
   - Ensure A record points to your hosting provider's IP
   - Example: `home.legacyh.fyi` → `76.76.19.19` (Vercel IP)

2. **Verify Proxy Status**
   - Make sure the orange cloud icon is enabled (proxied)
   - If gray, click to enable proxy

### 4. Test Different SSL Modes

Try these SSL modes in order:

1. **Flexible** (if your origin doesn't support HTTPS)
2. **Full** (recommended for most cases)
3. **Full (strict)** (only if your origin has valid SSL)

### 5. Check Origin Server

**For Vercel:**
```bash
# Check if your domain is properly configured
curl -I https://home.legacyh.fyi
```

**For other providers:**
- Verify your hosting provider supports HTTPS
- Check if SSL certificates are properly installed

### 6. Cloudflare Page Rules

Create a page rule to force HTTPS:
1. Go to "Page Rules" in Cloudflare
2. Create new rule:
   - URL: `http://home.legacyh.fyi/*`
   - Settings: "Always Use HTTPS"

### 7. Security Settings

1. **Go to "Security" section**
2. **Set Security Level to "Medium"**
3. **Enable "Browser Integrity Check"**
4. **Configure Security Headers:**
   - HSTS: Enable with max-age 31536000
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff

## Troubleshooting Steps

### Step 1: Check Origin Server
```bash
# Test direct connection to your hosting provider
curl -I https://your-hosting-provider.com
```

### Step 2: Verify DNS
1. Check if DNS records are correct
2. Ensure proxy is enabled (orange cloud)
3. Wait for DNS propagation (up to 24 hours)

### Step 3: Test SSL Configuration
```bash
# Test SSL certificate
openssl s_client -connect home.legacyh.fyi:443 -servername home.legacyh.fyi
```

### Step 4: Check Cloudflare Status
1. Go to Cloudflare "Overview"
2. Check if there are any issues
3. Verify SSL certificate is active

## Common Solutions

### Solution 1: Change SSL Mode
1. Go to Cloudflare SSL/TLS
2. Change from "Full (strict)" to "Full"
3. Wait 5-10 minutes and test

### Solution 2: Check Hosting Provider
1. Verify your hosting provider supports HTTPS
2. Check if SSL certificates are properly configured
3. Contact hosting provider support if needed

### Solution 3: DNS Issues
1. Check if A record points to correct IP
2. Ensure proxy is enabled
3. Wait for DNS propagation

### Solution 4: Clear Cloudflare Cache
1. Go to "Caching" section
2. Click "Configuration"
3. Purge all cache

## Hosting Provider Specific Fixes

### Vercel
1. Go to Vercel dashboard
2. Check domain configuration
3. Ensure custom domain is properly set
4. Verify SSL certificate is active

### Netlify
1. Go to Netlify dashboard
2. Check domain settings
3. Verify SSL certificate
4. Check DNS configuration

### Other Providers
1. Contact your hosting provider
2. Ask about SSL certificate configuration
3. Verify HTTPS support

## Testing After Fix

1. **Test HTTPS:**
   ```bash
   curl -I https://home.legacyh.fyi
   ```

2. **Test Discord OAuth:**
   - Visit: `https://home.legacyh.fyi/admin/login`
   - Try Discord login

3. **Check SSL Certificate:**
   - Visit: `https://home.legacyh.fyi`
   - Check browser security indicator

## If Still Not Working

1. **Contact Cloudflare Support**
   - Provide error logs
   - Include hosting provider details

2. **Contact Hosting Provider**
   - Ask about SSL configuration
   - Verify HTTPS support

3. **Temporary Workaround**
   - Use "Flexible" SSL mode temporarily
   - Fix origin SSL issues
   - Switch back to "Full" mode

## Prevention

1. **Always use HTTPS** in your application
2. **Configure proper SSL certificates** on origin server
3. **Monitor SSL certificate expiration**
4. **Set up SSL monitoring** alerts

## Environment Variables for SSL

Make sure your `.env.local` has:
```env
NEXTAUTH_URL=https://home.legacyh.fyi
DISCORD_REDIRECT_URI=https://home.legacyh.fyi/api/auth/callback
NEXT_PUBLIC_SITE_URL=https://home.legacyh.fyi
``` 