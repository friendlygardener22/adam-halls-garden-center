# Adam Halls Garden Center - Deployment Guide

## 🚀 Production Deployment Guide

This guide covers deploying the Adam Halls Garden Center website to production, including setup, configuration, and maintenance procedures.

## 📋 Pre-Deployment Checklist

### **Code Review**
- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] Responsive design verified on all devices
- [ ] SEO meta tags implemented
- [ ] Accessibility requirements met
- [ ] Performance optimized

### **Content Review**
- [ ] All product information accurate
- [ ] Images optimized and properly sized
- [ ] Care guides reviewed and updated
- [ ] Pricing information current
- [ ] Contact information verified

### **Technical Review**
- [ ] Environment variables configured
- [ ] Build process tested
- [ ] Error handling implemented
- [ ] Security headers configured
- [ ] SSL certificate ready

## 🛠️ Build Process

### **Local Build Test**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### **Build Optimization**
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Review bundle size
- **Performance Audit**: Lighthouse testing

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**

#### **Why Vercel?**
- **Next.js Optimized**: Built for Next.js applications
- **Automatic Deployments**: Git integration
- **Global CDN**: Fast loading worldwide
- **SSL Certificates**: Automatic HTTPS
- **Analytics**: Built-in performance monitoring

#### **Deployment Steps**
1. **Create Vercel Account**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add required variables

4. **Custom Domain Setup**
   - Add domain in Vercel Dashboard
   - Update DNS records
   - SSL certificate automatically provisioned

#### **Vercel Configuration**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### **Option 2: Netlify**

#### **Deployment Steps**
1. **Connect Repository**
   - Link GitHub/GitLab repository
   - Configure build settings

2. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
   ```

3. **Environment Variables**
   - Set in Netlify Dashboard
   - Environment-specific variables

### **Option 3: AWS Amplify**

#### **Deployment Steps**
1. **Connect Repository**
   - Link to AWS Amplify Console
   - Configure build settings

2. **Build Configuration**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### **Option 4: Traditional Hosting**

#### **Requirements**
- **Node.js 18+** server
- **Nginx** or **Apache** web server
- **SSL Certificate** (Let's Encrypt)
- **PM2** for process management

#### **Deployment Steps**
1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   npm install -g pm2
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone [repository-url]
   cd adam-halls-garden-center
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "adam-halls-garden" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name adamhallsgardencenter.com;
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       server_name adamhallsgardencenter.com;
   
       ssl_certificate /path/to/certificate.crt;
       ssl_certificate_key /path/to/private.key;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   
       location /_next/static {
           alias /path/to/app/.next/static;
           expires 365d;
           access_log off;
       }
   }
   ```

## 🔧 Environment Configuration

### **Production Environment Variables**
```env
# .env.production
NEXT_PUBLIC_SITE_URL=https://adamhallsgardencenter.com
NEXT_PUBLIC_SITE_NAME=Adam Halls Garden Center
NEXT_PUBLIC_CONTACT_EMAIL=info@adamhallsgardencenter.com
NEXT_PUBLIC_PHONE_NUMBER=(555) 123-4567
NEXT_PUBLIC_ADDRESS=123 Garden Street, City, State 12345

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### **Security Headers**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

## 📊 Performance Optimization

### **Image Optimization**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['adamhallsgardencenter.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### **Caching Strategy**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🔍 Post-Deployment Testing

### **Functionality Testing**
- [ ] All pages load correctly
- [ ] Product catalog displays properly
- [ ] Filtering and search work
- [ ] Product detail pages functional
- [ ] Responsive design verified
- [ ] Forms submit correctly

### **Performance Testing**
```bash
# Lighthouse testing
npm install -g lighthouse
lighthouse https://adamhallsgardencenter.com --output html --output-path ./lighthouse-report.html
```

### **SEO Testing**
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Google Search Console setup

### **Security Testing**
- [ ] HTTPS redirect working
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] Input validation working

## 📈 Monitoring & Analytics

### **Performance Monitoring**
- **Vercel Analytics**: Built-in with Vercel
- **Google Analytics**: Track user behavior
- **Google Search Console**: SEO monitoring
- **Lighthouse CI**: Automated performance testing

### **Error Monitoring**
- **Sentry**: Error tracking and monitoring
- **Vercel Functions**: Serverless error handling
- **Custom error pages**: User-friendly error messages

### **Uptime Monitoring**
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **StatusCake**: Comprehensive monitoring

## 🔄 Continuous Deployment

### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run tests
        run: npm test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🛡️ Security Best Practices

### **SSL/TLS Configuration**
- **Automatic SSL**: Vercel/Netlify provide automatic certificates
- **HSTS**: Strict Transport Security headers
- **Certificate Renewal**: Automatic with Let's Encrypt

### **Content Security Policy**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://www.google-analytics.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### **Environment Variable Security**
- **Never commit secrets**: Use environment variables
- **Rotate keys regularly**: Update API keys periodically
- **Access control**: Limit who can access production secrets

## 📞 Support & Maintenance

### **Monitoring Setup**
1. **Performance Monitoring**: Set up alerts for slow loading
2. **Error Tracking**: Monitor for application errors
3. **Uptime Monitoring**: Get notified of downtime
4. **Security Monitoring**: Monitor for security issues

### **Backup Strategy**
- **Code Repository**: GitHub with version control
- **Database**: Regular backups if using database
- **Content**: Version control for content changes
- **Configuration**: Document all configuration changes

### **Update Procedures**
1. **Development**: Test changes in development
2. **Staging**: Deploy to staging environment
3. **Production**: Deploy to production with rollback plan
4. **Monitoring**: Monitor for issues after deployment

## 🎯 Go-Live Checklist

### **Final Pre-Launch**
- [ ] All content reviewed and approved
- [ ] Performance testing completed
- [ ] Security audit passed
- [ ] SEO optimization complete
- [ ] Mobile testing verified
- [ ] Cross-browser testing done

### **Launch Day**
- [ ] DNS changes propagated
- [ ] SSL certificate active
- [ ] Monitoring tools active
- [ ] Team notified of launch
- [ ] Support team ready
- [ ] Rollback plan prepared

### **Post-Launch**
- [ ] Monitor performance metrics
- [ ] Check error logs
- [ ] Verify analytics tracking
- [ ] Test all user flows
- [ ] Gather user feedback
- [ ] Plan next iteration

---

**Deployment Status**: ✅ **READY FOR PRODUCTION**

**Recommended Platform**: Vercel for optimal Next.js performance and ease of deployment.
