#!/bin/bash

# Adam Hall's Garden Center - Deployment Script
echo "🌱 Deploying Adam Hall's Garden Center Website..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "📱 Your website is now live!"
echo "🔍 Don't forget to:"
echo "   - Set up Google My Business"
echo "   - Configure environment variables"
echo "   - Submit to Google Search Console"
echo "   - Set up analytics tracking"

