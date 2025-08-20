@echo off
echo.
echo 🌱 Adam Hall's Garden Center - Easy Deployment
echo ================================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
    echo.
)

REM Show current status
echo 📋 Current Status:
echo    - Making sure everything is ready...
echo    - Checking for changes...
echo.

REM Build the project
echo 🔨 Building your website...
call npm run build

REM Check if build was successful
if errorlevel 1 (
    echo.
    echo ❌ Build failed! 
    echo 🔍 Please check the errors above and fix them in Cursor.
    echo 💡 Common fixes:
    echo    - Check for typos in your changes
    echo    - Make sure all files are saved
    echo    - Check syntax errors
    echo.
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
echo    - Uploading your changes...
echo    - Optimizing for production...
call vercel --prod

if errorlevel 1 (
    echo.
    echo ❌ Deployment failed!
    echo 💡 Try running the command again or check your internet connection.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment Complete!
echo ================================
echo 📱 Your website is now LIVE!
echo 🌐 Changes are visible in 30-60 seconds
echo.
echo 🔄 To make more changes:
echo    1. Edit files in Cursor
echo    2. Save your changes
echo    3. Run this script again!
echo.
echo 📊 Next Steps (if needed):
echo    - Check Google Analytics for traffic
echo    - Monitor Google My Business reviews
echo    - Update social media with new content
echo.
echo ✨ Easy updates! Just edit in Cursor and run deploy.bat
echo.
pause

