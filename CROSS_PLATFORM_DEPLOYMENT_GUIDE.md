# Cross-Platform Deployment Guide

## Overview

This guide covers how to deploy Adam Hall's Garden Center application across three platforms:
1. **Web Application** (PWA-enabled)
2. **Desktop Application** (Windows, macOS, Linux)
3. **Mobile Application** (iOS, Android)

## Prerequisites

- Node.js 18+ and npm
- Git
- For mobile: Xcode (macOS) and Android Studio
- For desktop: Platform-specific build tools

## 1. Web Application (PWA)

### Build and Deploy
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm run start

# Or build for static export (PWA)
npm run pwa:build
npm run pwa:start
```

### PWA Features
- ✅ Service Worker for offline functionality
- ✅ App manifest for installation
- ✅ Responsive design for all devices
- ✅ Offline-first architecture
- ✅ Push notifications (when supported)

### Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **Static Hosting**: Upload `out/` folder to any web server

## 2. Desktop Application (Electron)

### Development
```bash
# Install Electron dependencies
npm install electron electron-builder --save-dev

# Run in development mode
npm run electron:dev

# Build for distribution
npm run electron:build
```

### Build Targets
- **Windows**: NSIS installer, portable exe
- **macOS**: DMG, ZIP
- **Linux**: AppImage, DEB

### Distribution
```bash
# Build for specific platform
npm run electron:dist

# Output will be in dist/ folder
```

### Code Signing (Required for macOS)
```bash
# macOS
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="password"

# Windows
export CSC_LINK="path/to/certificate.pfx"
export CSC_KEY_PASSWORD="password"
```

## 3. Mobile Application (Capacitor)

### Setup
```bash
# Initialize Capacitor
npm run mobile:init

# Add platforms
npm run mobile:add:ios
npm run mobile:add:android

# Sync web code to native projects
npm run mobile:sync
```

### iOS Development
```bash
# Open in Xcode
npm run mobile:open:ios

# Build and run
npm run mobile:run:ios

# Requirements:
# - macOS
# - Xcode 14+
# - iOS 13+
# - Apple Developer Account (for App Store)
```

### Android Development
```bash
# Open in Android Studio
npm run mobile:open:android

# Build and run
npm run mobile:run:android

# Requirements:
# - Android Studio
# - Android SDK 21+
# - Java 11+
```

### Mobile Build Process
```bash
# Build web app and sync to mobile
npm run mobile:build:ios
npm run mobile:build:android
```

## 4. Environment Configuration

### Web (.env.local)
```bash
NEXT_PUBLIC_APP_URL=https://adamhallsgardencenter.com
NEXT_PUBLIC_API_URL=https://api.adamhallsgardencenter.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Mobile (capacitor.config.ts)
```typescript
const config: CapacitorConfig = {
  appId: 'com.adamhalls.gardencenter',
  appName: "Adam Hall's Garden Center",
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};
```

### Desktop (electron/main.js)
```javascript
const isDev = process.env.NODE_ENV === 'development';
const appUrl = isDev ? 'http://localhost:3000' : 'file://path/to/built/app';
```

## 5. Build Scripts Reference

### Web
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run pwa:build` - Static export for PWA

### Desktop
- `npm run electron:dev` - Development with hot reload
- `npm run electron:build` - Build for distribution
- `npm run electron:pack` - Package without distribution
- `npm run electron:dist` - Build and package for distribution

### Mobile
- `npm run mobile:sync` - Sync web code to native
- `npm run mobile:open:ios` - Open iOS project in Xcode
- `npm run mobile:open:android` - Open Android project in Android Studio
- `npm run mobile:build:ios` - Build and open iOS project
- `npm run mobile:build:android` - Build and open Android project

## 6. Platform-Specific Considerations

### Web (PWA)
- Service worker caching strategies
- Manifest file configuration
- Offline functionality
- Push notifications
- App installation prompts

### Desktop (Electron)
- Native menu integration
- File system access
- Print functionality
- Auto-updates
- Platform-specific styling

### Mobile (Capacitor)
- Native device features
- Camera and photo access
- GPS and location services
- Push notifications
- App store requirements

## 7. Testing Strategy

### Web
- Browser testing (Chrome, Firefox, Safari, Edge)
- PWA installation testing
- Offline functionality testing
- Responsive design testing

### Desktop
- Platform-specific testing
- Menu functionality testing
- File operations testing
- Print functionality testing

### Mobile
- Device testing (iOS/Android)
- Native feature testing
- App store compliance
- Performance testing

## 8. Deployment Checklist

### Web Deployment
- [ ] Environment variables configured
- [ ] PWA manifest updated
- [ ] Service worker configured
- [ ] HTTPS enabled
- [ ] Analytics configured
- [ ] SEO meta tags updated

### Desktop Deployment
- [ ] Electron dependencies installed
- [ ] Build configuration updated
- [ ] Icons and assets included
- [ ] Code signing configured
- [ ] Auto-update mechanism tested
- [ ] Platform-specific builds created

### Mobile Deployment
- [ ] Capacitor configured
- [ ] Native projects generated
- [ ] App icons and splash screens
- [ ] Permissions configured
- [ ] App store metadata prepared
- [ ] Testing on physical devices

## 9. Troubleshooting

### Common Issues

#### PWA Not Installing
- Check manifest.json syntax
- Verify HTTPS is enabled
- Check service worker registration

#### Electron Build Fails
- Verify Node.js version compatibility
- Check platform-specific dependencies
- Verify build configuration

#### Mobile Build Issues
- Check Capacitor version compatibility
- Verify platform SDK versions
- Check native project configuration

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 10. Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Update platform-specific code
- Test across all platforms

### Performance Monitoring
- Web: Core Web Vitals
- Desktop: Memory usage, startup time
- Mobile: App performance, battery usage

### User Feedback
- Monitor app store reviews
- Track user analytics
- Gather user feedback
- Implement improvements

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: Development Team
