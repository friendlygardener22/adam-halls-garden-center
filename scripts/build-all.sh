#!/bin/bash

# Adam Hall's Garden Center - Cross-Platform Build Script
# This script builds the application for web, desktop, and mobile platforms

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Adam Hall's Garden Center"
VERSION="1.0.0"
BUILD_DIR="dist"
OUTPUT_DIR="builds"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ ! -d "node_modules" ]; then
        npm install
    else
        npm ci
    fi
    
    print_success "Dependencies installed"
}

# Function to build web application
build_web() {
    print_status "Building web application..."
    
    # Build Next.js app
    npm run build
    
    # Export for static hosting (PWA)
    npm run pwa:build
    
    print_success "Web application built successfully"
}

# Function to build desktop application
build_desktop() {
    print_status "Building desktop application..."
    
    # Check if Electron is available
    if ! npm list electron &> /dev/null; then
        print_warning "Electron not found. Installing Electron dependencies..."
        npm install electron electron-builder --save-dev
    fi
    
    # Build desktop app
    npm run electron:dist
    
    print_success "Desktop application built successfully"
}

# Function to build mobile application
build_mobile() {
    print_status "Building mobile application..."
    
    # Check if Capacitor is available
    if ! npm list @capacitor/cli &> /dev/null; then
        print_warning "Capacitor not found. Installing Capacitor dependencies..."
        npm install @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android --save-dev
    fi
    
    # Build PWA first
    npm run pwa:build
    
    # Initialize Capacitor if not already done
    if [ ! -f "capacitor.config.ts" ]; then
        print_warning "Capacitor not initialized. Initializing..."
        npx cap init "$APP_NAME" com.adamhalls.gardencenter
    fi
    
    # Add platforms if not already added
    if [ ! -d "ios" ]; then
        print_status "Adding iOS platform..."
        npx cap add ios
    fi
    
    if [ ! -d "android" ]; then
        print_status "Adding Android platform..."
        npx cap add android
    fi
    
    # Sync web code to native projects
    npx cap sync
    
    print_success "Mobile application prepared successfully"
    print_warning "Open the native projects in Xcode (iOS) and Android Studio (Android) to complete the build"
}

# Function to create deployment package
create_deployment_package() {
    print_status "Creating deployment package..."
    
    # Create builds directory
    mkdir -p "$OUTPUT_DIR"
    
    # Copy web build
    if [ -d "out" ]; then
        cp -r out "$OUTPUT_DIR/web"
        print_success "Web build copied to $OUTPUT_DIR/web"
    fi
    
    # Copy desktop build
    if [ -d "dist" ]; then
        cp -r dist "$OUTPUT_DIR/desktop"
        print_success "Desktop build copied to $OUTPUT_DIR/desktop"
    fi
    
    # Copy mobile projects
    if [ -d "ios" ]; then
        cp -r ios "$OUTPUT_DIR/mobile/ios"
        print_success "iOS project copied to $OUTPUT_DIR/mobile/ios"
    fi
    
    if [ -d "android" ]; then
        cp -r android "$OUTPUT_DIR/mobile/android"
        print_success "Android project copied to $OUTPUT_DIR/mobile/android"
    fi
    
    # Create build summary
    cat > "$OUTPUT_DIR/BUILD_SUMMARY.md" << EOF
# Build Summary - $APP_NAME v$VERSION

Build completed on: $(date)

## Web Application
- Status: ✅ Built
- Location: $OUTPUT_DIR/web
- Type: PWA-enabled static export
- Deploy: Upload contents to any web server

## Desktop Application
- Status: ✅ Built
- Location: $OUTPUT_DIR/desktop
- Platforms: Windows, macOS, Linux
- Distribution: Use the generated installers

## Mobile Application
- Status: ✅ Prepared
- iOS: $OUTPUT_DIR/mobile/ios
- Android: $OUTPUT_DIR/mobile/android
- Next Steps: Open in Xcode/Android Studio

## Deployment Instructions

### Web
1. Upload contents of \`$OUTPUT_DIR/web\` to your web server
2. Ensure HTTPS is enabled for PWA functionality
3. Test PWA installation on mobile devices

### Desktop
1. Distribute the generated installers from \`$OUTPUT_DIR/desktop\`
2. For macOS: Sign the app with your developer certificate
3. For Windows: Consider code signing for better user experience

### Mobile
1. Open iOS project in Xcode
2. Open Android project in Android Studio
3. Configure app signing and metadata
4. Build and test on devices
5. Submit to respective app stores

## Notes
- All builds use the same source code
- PWA features work across all platforms
- Offline functionality is included
- Service worker provides caching and background sync
EOF
    
    print_success "Deployment package created in $OUTPUT_DIR"
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Build $APP_NAME for multiple platforms"
    echo ""
    echo "OPTIONS:"
    echo "  -w, --web        Build web application only"
    echo "  -d, --desktop    Build desktop application only"
    echo "  -m, --mobile     Build mobile application only"
    echo "  -a, --all        Build all platforms (default)"
    echo "  -c, --clean      Clean build directories before building"
    echo "  -h, --help       Show this help message"
    echo ""
    echo "EXAMPLES:"
    echo "  $0                 # Build all platforms"
    echo "  $0 --web          # Build web only"
    echo "  $0 --clean --all  # Clean and build all platforms"
}

# Function to clean build directories
clean_builds() {
    print_status "Cleaning build directories..."
    
    # Remove build outputs
    rm -rf out
    rm -rf dist
    rm -rf .next
    
    # Remove mobile projects
    rm -rf ios
    rm -rf android
    
    print_success "Build directories cleaned"
}

# Main execution
main() {
    local build_web_flag=false
    local build_desktop_flag=false
    local build_mobile_flag=false
    local clean_flag=false
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -w|--web)
                build_web_flag=true
                shift
                ;;
            -d|--desktop)
                build_desktop_flag=true
                shift
                ;;
            -m|--mobile)
                build_mobile_flag=true
                shift
                ;;
            -a|--all)
                build_web_flag=true
                build_desktop_flag=true
                build_mobile_flag=true
                shift
                ;;
            -c|--clean)
                clean_flag=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # Default to all if no specific platform selected
    if [ "$build_web_flag" = false ] && [ "$build_desktop_flag" = false ] && [ "$build_mobile_flag" = false ]; then
        build_web_flag=true
        build_desktop_flag=true
        build_mobile_flag=true
    fi
    
    echo "=========================================="
    echo "  $APP_NAME - Cross-Platform Build"
    echo "  Version: $VERSION"
    echo "=========================================="
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Install dependencies
    install_dependencies
    
    # Clean if requested
    if [ "$clean_flag" = true ]; then
        clean_builds
    fi
    
    # Build selected platforms
    if [ "$build_web_flag" = true ]; then
        build_web
    fi
    
    if [ "$build_desktop_flag" = true ]; then
        build_desktop
    fi
    
    if [ "$build_mobile_flag" = true ]; then
        build_mobile
    fi
    
    # Create deployment package
    create_deployment_package
    
    echo ""
    echo "=========================================="
    print_success "Build completed successfully!"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. Check the $OUTPUT_DIR directory for your builds"
    echo "2. Test each platform thoroughly"
    echo "3. Deploy according to the BUILD_SUMMARY.md instructions"
    echo ""
}

# Run main function with all arguments
main "$@"
