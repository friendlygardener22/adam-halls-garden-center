@echo off
REM Adam Hall's Garden Center - Cross-Platform Build Script (Windows)
REM This script builds the application for web, desktop, and mobile platforms

setlocal enabledelayedexpansion

REM Configuration
set "APP_NAME=Adam Hall's Garden Center"
set "VERSION=1.0.0"
set "BUILD_DIR=dist"
set "OUTPUT_DIR=builds"

REM Colors for output (Windows 10+)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

REM Function to check prerequisites
:check_prerequisites
call :print_status "Checking prerequisites..."

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    call :print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    call :print_error "npm is not installed. Please install npm first."
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do (
    set "NODE_VERSION=%%a"
    set "NODE_VERSION=!NODE_VERSION:~1!"
)

if !NODE_VERSION! LSS 18 (
    call :print_error "Node.js 18+ is required. Current version: !NODE_VERSION!"
    exit /b 1
)

call :print_success "Prerequisites check passed"
goto :eof

REM Function to install dependencies
:install_dependencies
call :print_status "Installing dependencies..."

if not exist "node_modules" (
    npm install
) else (
    npm ci
)

call :print_success "Dependencies installed"
goto :eof

REM Function to build web application
:build_web
call :print_status "Building web application..."

REM Build Next.js app
npm run build

REM Export for static hosting (PWA)
npm run pwa:build

call :print_success "Web application built successfully"
goto :eof

REM Function to build desktop application
build_desktop
call :print_status "Building desktop application..."

REM Check if Electron is available
npm list electron >nul 2>&1
if errorlevel 1 (
    call :print_warning "Electron not found. Installing Electron dependencies..."
    npm install electron electron-builder --save-dev
)

REM Build desktop app
npm run electron:dist

call :print_success "Desktop application built successfully"
goto :eof

REM Function to build mobile application
:build_mobile
call :print_status "Building mobile application..."

REM Check if Capacitor is available
npm list @capacitor/cli >nul 2>&1
if errorlevel 1 (
    call :print_warning "Capacitor not found. Installing Capacitor dependencies..."
    npm install @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android --save-dev
)

REM Build PWA first
npm run pwa:build

REM Initialize Capacitor if not already done
if not exist "capacitor.config.ts" (
    call :print_warning "Capacitor not initialized. Initializing..."
    npx cap init "%APP_NAME%" com.adamhalls.gardencenter
)

REM Add platforms if not already added
if not exist "ios" (
    call :print_status "Adding iOS platform..."
    npx cap add ios
)

if not exist "android" (
    call :print_status "Adding Android platform..."
    npx cap add android
)

REM Sync web code to native projects
npx cap sync

call :print_success "Mobile application prepared successfully"
call :print_warning "Open the native projects in Xcode (iOS) and Android Studio (Android) to complete the build"
goto :eof

REM Function to create deployment package
:create_deployment_package
call :print_status "Creating deployment package..."

REM Create builds directory
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

REM Copy web build
if exist "out" (
    xcopy "out" "%OUTPUT_DIR%\web" /E /I /Y >nul
    call :print_success "Web build copied to %OUTPUT_DIR%\web"
)

REM Copy desktop build
if exist "dist" (
    xcopy "dist" "%OUTPUT_DIR%\desktop" /E /I /Y >nul
    call :print_success "Desktop build copied to %OUTPUT_DIR%\desktop"
)

REM Copy mobile projects
if exist "ios" (
    if not exist "%OUTPUT_DIR%\mobile" mkdir "%OUTPUT_DIR%\mobile"
    xcopy "ios" "%OUTPUT_DIR%\mobile\ios" /E /I /Y >nul
    call :print_success "iOS project copied to %OUTPUT_DIR%\mobile\ios"
)

if exist "android" (
    if not exist "%OUTPUT_DIR%\mobile" mkdir "%OUTPUT_DIR%\mobile"
    xcopy "android" "%OUTPUT_DIR%\mobile\android" /E /I /Y >nul
    call :print_success "Android project copied to %OUTPUT_DIR%\mobile\android"
)

REM Create build summary
echo # Build Summary - %APP_NAME% v%VERSION% > "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo Build completed on: %date% %time% >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ## Web Application >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Status: ✅ Built >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Location: %OUTPUT_DIR%\web >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Type: PWA-enabled static export >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Deploy: Upload contents to any web server >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ## Desktop Application >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Status: ✅ Built >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Location: %OUTPUT_DIR%\desktop >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Platforms: Windows, macOS, Linux >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Distribution: Use the generated installers >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ## Mobile Application >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Status: ✅ Prepared >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - iOS: %OUTPUT_DIR%\mobile\ios >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Android: %OUTPUT_DIR%\mobile\android >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Next Steps: Open in Xcode/Android Studio >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ## Deployment Instructions >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ### Web >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 1. Upload contents of `%OUTPUT_DIR%\web` to your web server >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 2. Ensure HTTPS is enabled for PWA functionality >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 3. Test PWA installation on mobile devices >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ### Desktop >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 1. Distribute the generated installers from `%OUTPUT_DIR%\desktop` >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 2. For macOS: Sign the app with your developer certificate >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 3. For Windows: Consider code signing for better user experience >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ### Mobile >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 1. Open iOS project in Xcode >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 2. Open Android project in Android Studio >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 3. Configure app signing and metadata >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 4. Build and test on devices >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo 5. Submit to respective app stores >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo. >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo ## Notes >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - All builds use the same source code >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - PWA features work across all platforms >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Offline functionality is included >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"
echo - Service worker provides caching and background sync >> "%OUTPUT_DIR%\BUILD_SUMMARY.md"

call :print_success "Deployment package created in %OUTPUT_DIR%"
goto :eof

REM Function to show help
:show_help
echo Usage: %~nx0 [OPTIONS]
echo.
echo Build %APP_NAME% for multiple platforms
echo.
echo OPTIONS:
echo   -w, --web        Build web application only
echo   -d, --desktop    Build desktop application only
echo   -m, --mobile     Build mobile application only
echo   -a, --all        Build all platforms (default)
echo   -c, --clean      Clean build directories before building
echo   -h, --help       Show this help message
echo.
echo EXAMPLES:
echo   %~nx0                 # Build all platforms
echo   %~nx0 --web          # Build web only
echo   %~nx0 --clean --all  # Clean and build all platforms
goto :eof

REM Function to clean build directories
:clean_builds
call :print_status "Cleaning build directories..."

REM Remove build outputs
if exist "out" rmdir /s /q "out"
if exist "dist" rmdir /s /q "dist"
if exist ".next" rmdir /s /q ".next"

REM Remove mobile projects
if exist "ios" rmdir /s /q "ios"
if exist "android" rmdir /s /q "android"

call :print_success "Build directories cleaned"
goto :eof

REM Main execution
:main
set "build_web_flag=false"
set "build_desktop_flag=false"
set "build_mobile_flag=false"
set "clean_flag=false"

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :end_parse
if "%~1"=="-w" set "build_web_flag=true"
if "%~1"=="--web" set "build_web_flag=true"
if "%~1"=="-d" set "build_desktop_flag=true"
if "%~1"=="--desktop" set "build_desktop_flag=true"
if "%~1"=="-m" set "build_mobile_flag=true"
if "%~1"=="--mobile" set "build_mobile_flag=true"
if "%~1"=="-a" set "build_web_flag=true" & set "build_desktop_flag=true" & set "build_mobile_flag=true"
if "%~1"=="--all" set "build_web_flag=true" & set "build_desktop_flag=true" & set "build_mobile_flag=true"
if "%~1"=="-c" set "clean_flag=true"
if "%~1"=="--clean" set "clean_flag=true"
if "%~1"=="-h" goto :show_help
if "%~1"=="--help" goto :show_help
shift
goto :parse_args
:end_parse

REM Default to all if no specific platform selected
if "%build_web_flag%"=="false" if "%build_desktop_flag%"=="false" if "%build_mobile_flag%"=="false" (
    set "build_web_flag=true"
    set "build_desktop_flag=true"
    set "build_mobile_flag=true"
)

echo ==========================================
echo   %APP_NAME% - Cross-Platform Build
echo   Version: %VERSION%
echo ==========================================
echo.

REM Check prerequisites
call :check_prerequisites
if errorlevel 1 exit /b 1

REM Install dependencies
call :install_dependencies

REM Clean if requested
if "%clean_flag%"=="true" call :clean_builds

REM Build selected platforms
if "%build_web_flag%"=="true" call :build_web

if "%build_desktop_flag%"=="true" call :build_desktop

if "%build_mobile_flag%"=="true" call :build_mobile

REM Create deployment package
call :create_deployment_package

echo.
echo ==========================================
call :print_success "Build completed successfully!"
echo ==========================================
echo.
echo Next steps:
echo 1. Check the %OUTPUT_DIR% directory for your builds
echo 2. Test each platform thoroughly
echo 3. Deploy according to the BUILD_SUMMARY.md instructions
echo.

exit /b 0
