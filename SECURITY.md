# Security Checklist for Adam Hall's Garden Center Website

## 🔒 Pre-Deployment Security Checklist

### ✅ Environment Variables
- [ ] Create `.env.local` file with proper environment variables
- [ ] Never commit `.env` files to version control
- [ ] Use strong, unique passwords for all services

### ✅ Required Environment Variables
```bash
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Mailchimp (for newsletter)
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_LIST_ID=your-list-id
MAILCHIMP_SERVER_PREFIX=us21

# Database (if using)
DATABASE_URL=your-database-url

# Authentication (if implementing)
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com
```

### ✅ Security Headers (Already Configured)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- X-XSS-Protection: 1; mode=block
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### ✅ Files to Remove Before Production
- `update_pricing.py` - Development script
- `update_pricing_v2.py` - Development script
- `convert_inventory.py` - Development script
- Any `.env` files (use environment variables instead)

### ✅ Authentication Implementation
The current authentication system is a placeholder. Before going live:

1. **Implement proper authentication:**
   - Use NextAuth.js or similar
   - Hash passwords with bcrypt
   - Implement proper session management
   - Add rate limiting

2. **Database setup:**
   - Use a secure database (PostgreSQL, MongoDB, etc.)
   - Implement proper user management
   - Add audit logging

### ✅ Payment Security
- Stripe integration is configured but needs proper environment variables
- Test payments thoroughly in Stripe test mode
- Implement proper error handling
- Add webhook verification

### ✅ Content Security
- All images are served from trusted sources
- No external scripts loaded
- HTTPS only in production

### ✅ Data Protection
- No personal data stored in client-side code
- Cart data stored in localStorage (temporary)
- Implement proper data retention policies

## 🚀 Deployment Checklist

### Before Going Live:
1. [ ] Set up proper domain with SSL certificate
2. [ ] Configure environment variables on hosting platform
3. [ ] Set up monitoring and logging
4. [ ] Test all functionality in production environment
5. [ ] Remove development scripts and files
6. [ ] Set up backup strategy
7. [ ] Configure error monitoring (Sentry, etc.)

### Hosting Recommendations:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

### Monitoring:
- Set up uptime monitoring
- Configure error tracking
- Monitor for security issues
- Set up automated backups

## 🔍 Regular Security Maintenance

### Monthly:
- [ ] Update dependencies
- [ ] Review access logs
- [ ] Check for security vulnerabilities
- [ ] Update SSL certificates

### Quarterly:
- [ ] Security audit
- [ ] Review user permissions
- [ ] Update security policies
- [ ] Test backup and recovery

## 🆘 Emergency Contacts

- **Hosting Provider:** [Your hosting provider support]
- **Domain Registrar:** [Your domain registrar]
- **Payment Processor:** Stripe Support
- **Security Issues:** [Your security contact]

## 📞 Support

For security issues or questions, contact the development team.

