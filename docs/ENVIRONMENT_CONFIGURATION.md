# Environment Configuration Guide

**Last Updated:** October 31, 2025

**Related Documents:**
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Deployment procedures
- [Security Checklist](SECURITY_CHECKLIST.md) - Security configuration
- [Testing Plan](TESTING_PLAN.md) - Environment testing procedures

---

## Overview
The Moon Exports project uses environment variables to manage configuration across different deployment environments while keeping sensitive information secure.

## File Structure

### Environment Files
- **`.env.template`** - Template with all available configuration options (commit this)
- **`.env.development`** - Safe development values (commit this)  
- **`.env.production`** - Production template with placeholders (commit this)
- **`.env`** - Your local environment file (DO NOT commit)
- **`.env.local`** - Local overrides (DO NOT commit)

### Security Strategy
- ✅ **Safe to commit**: Templates and development configs with non-sensitive values
- ❌ **Never commit**: Files containing real API keys, passwords, or tokens
- 🔒 **Production secrets**: Set via hosting platform environment variables

## Setup Instructions

### 1. Local Development Setup
```bash
# Copy the template to create your local .env file
cp .env.template .env

# Edit .env with your development values
# Use development/test API keys only
```

### 2. Development Environment
```bash
# Use the provided development config (safe values)
cp .env.development .env
# Or create your own .env with development keys
```

### 3. Production Deployment

#### GitHub Pages (Current Setup)
Since this is a static site, environment variables are primarily used for:
- Build-time configuration
- JavaScript configuration files
- Analytics tracking IDs

#### Alternative Hosting (Netlify, Vercel, etc.)
Set environment variables in your hosting platform:

**Netlify:**
```bash
# Via Netlify CLI
netlify env:set GOOGLE_ANALYTICS_ID "G-XXXXXXXXXX"
netlify env:set CONTACT_FORM_RECIPIENT "contact@themoonexports.com"
```

**Vercel:**
```bash
# Via Vercel CLI
vercel env add GOOGLE_ANALYTICS_ID
vercel env add CONTACT_FORM_RECIPIENT
```

## Configuration Categories

### 🌐 Public Configuration (Safe to commit)
- Company information
- Social media URLs
- Public API endpoints
- Build settings

### 🔐 Secret Configuration (Never commit)
- API keys and tokens
- Database passwords
- SMTP credentials
- Authentication secrets

### 🔧 Environment-Specific
- Site URLs (localhost vs production)
- CDN configurations
- Debug modes
- Logging levels

## Using Environment Variables

### In JavaScript (Client-Side)
```javascript
// For static sites, create a config file
// js/config.js (generated from environment)
const config = {
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX',
  siteUrl: process.env.SITE_URL || 'https://www.themoonexports.com',
  contactEmail: process.env.COMPANY_EMAIL || 'info@themoonexports.com'
};
```

### In Build Scripts
```javascript
// build/generate-config.js
const fs = require('fs');
require('dotenv').config();

const config = {
  analytics: {
    googleId: process.env.GOOGLE_ANALYTICS_ID,
    facebookPixel: process.env.FACEBOOK_PIXEL_ID
  },
  company: {
    name: process.env.COMPANY_NAME,
    email: process.env.COMPANY_EMAIL,
    phone: process.env.COMPANY_PHONE
  }
};

fs.writeFileSync('js/config.js', `window.APP_CONFIG = ${JSON.stringify(config)};`);
```

### In HTML Templates
```html
<!-- Meta tags with environment variables -->
<meta name="description" content="%%COMPANY_NAME%% - %%COMPANY_DESCRIPTION%%">
<script>
  gtag('config', '%%GOOGLE_ANALYTICS_ID%%');
</script>
```

## Security Best Practices

### 1. Principle of Least Privilege
- Only include necessary environment variables
- Use read-only API keys where possible
- Separate development and production keys

### 2. Secret Rotation
- Regularly rotate API keys and tokens
- Update environment variables in hosting platforms
- Monitor for exposed secrets in code

### 3. Validation
```javascript
// Validate required environment variables
const requiredEnvVars = [
  'GOOGLE_ANALYTICS_ID',
  'COMPANY_EMAIL',
  'CONTACT_FORM_RECIPIENT'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### 4. Environment Detection
```javascript
// Detect environment and load appropriate config
const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';
const isProduction = environment === 'production';

// Use different APIs based on environment
const apiUrl = isDevelopment 
  ? 'http://localhost:3000/api'
  : 'https://api.themoonexports.com';
```

## Common Environment Variables

### Analytics & Tracking
```bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=123456789012345
HOTJAR_ID=1234567
YANDEX_METRICA_ID=12345678
```

### Social Media Integration
```bash
FACEBOOK_APP_ID=123456789012345
INSTAGRAM_ACCESS_TOKEN=IGQVJxxxxxxx
LINKEDIN_API_KEY=xxxxxxxxxxxxxxxx
```

### Email & Communication
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_FORM_RECIPIENT=contact@themoonexports.com
```

### SEO & Marketing
```bash
GOOGLE_SEARCH_CONSOLE_TOKEN=abcdef123456
SEMRUSH_API_KEY=xxxxxxxxxxxxxxxx
AHREFS_API_TOKEN=xxxxxxxxxxxxxxxx
```

## Troubleshooting

### Common Issues

**Environment variables not loading:**
```bash
# Check if .env file exists
ls -la .env

# Verify dotenv is installed
npm install dotenv

# Load environment in your script
require('dotenv').config();
```

**Variables not updating:**
```bash
# Clear cache and restart
rm -rf node_modules/.cache
npm start
```

**Production deployment issues:**
```bash
# Verify environment variables are set
echo $GOOGLE_ANALYTICS_ID

# Check hosting platform environment settings
netlify env:list
vercel env ls
```

### Debug Mode
```javascript
// Add to your main JavaScript file
if (process.env.DEBUG_MODE === 'true') {
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Site URL:', process.env.SITE_URL);
  console.log('Analytics ID:', process.env.GOOGLE_ANALYTICS_ID);
}
```

## Migration Checklist

### Moving from Hardcoded to Environment Variables
- [ ] Identify all hardcoded configuration values
- [ ] Create environment variables for each value
- [ ] Update code to use environment variables
- [ ] Test in development environment
- [ ] Set production environment variables
- [ ] Deploy and verify functionality
- [ ] Remove hardcoded values from code
- [ ] Update documentation

This environment configuration system provides a secure, scalable way to manage configuration across development, staging, and production environments while protecting sensitive information.

---

## See Also

- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Deployment status
- [Security Checklist](SECURITY_CHECKLIST.md) - Security best practices

---

*Last Updated: October 31, 2025*