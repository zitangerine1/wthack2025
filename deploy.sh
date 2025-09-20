#!/bin/bash

# Smart Pillow Frontend Deployment Script
# Usage: ./deploy.sh [environment]
# Environment: dev, staging, prod (default: dev)

set -e  # Exit on any error

# Configuration
PROJECT_NAME="smart-pillow-frontend"
FRONTEND_DIR="frontend"
BUILD_DIR="dist"
BACKUP_DIR="backup"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Environment (default to dev)
ENV=${1:-dev}

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."

    if ! command_exists bun; then
        print_error "Bun is not installed. Please install Bun first."
        exit 1
    fi

    if ! command_exists git; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi

    print_success "Prerequisites check passed"
}

# Backup current deployment
backup_current() {
    if [ -d "$FRONTEND_DIR/$BUILD_DIR" ]; then
        print_status "Creating backup of current deployment..."
        mkdir -p "$BACKUP_DIR"
        cp -r "$FRONTEND_DIR/$BUILD_DIR" "$BACKUP_DIR/dist-$(date +%Y%m%d_%H%M%S)"
        print_success "Backup created"
    fi
}

# Build the frontend
build_frontend() {
    print_status "Building frontend for $ENV environment..."

    cd "$FRONTEND_DIR"

    # Install dependencies
    print_status "Installing dependencies..."
    bun install

    # Set environment file
    if [ -f ".env.$ENV" ]; then
        print_status "Using environment file: .env.$ENV"
        cp ".env.$ENV" ".env"
    elif [ -f ".env.example" ]; then
        print_warning "Environment file .env.$ENV not found, using .env.example"
        cp ".env.example" ".env"
    else
        print_warning "No environment file found, using defaults"
    fi

    # Run build
    print_status "Running build process..."
    bun run build

    if [ ! -d "$BUILD_DIR" ]; then
        print_error "Build failed - dist directory not found"
        exit 1
    fi

    cd ..
    print_success "Frontend build completed"
}

# Validate build
validate_build() {
    print_status "Validating build..."

    # Check if essential files exist
    if [ ! -f "$FRONTEND_DIR/$BUILD_DIR/index.html" ]; then
        print_error "Build validation failed - index.html not found"
        exit 1
    fi

    # Check build size (warn if too large)
    BUILD_SIZE=$(du -sh "$FRONTEND_DIR/$BUILD_DIR" | cut -f1)
    print_status "Build size: $BUILD_SIZE"

    print_success "Build validation passed"
}

# Deploy to development server
deploy_dev() {
    print_status "Starting development server..."
    cd "$FRONTEND_DIR"
    print_success "Development server starting at http://localhost:5173"
    bun run dev --host
}

# Deploy to staging/production
deploy_server() {
    print_status "Deploying to $ENV server..."

    # Start preview server
    cd "$FRONTEND_DIR"
    print_status "Starting preview server for $ENV environment..."
    print_success "Server starting at http://localhost:4173"
    bun run preview --host --port 4173
}

# Deploy to static hosting (copy files)
deploy_static() {
    print_status "Preparing static files for deployment..."

    # Create deployment package
    DEPLOY_PACKAGE="smart-pillow-frontend-$ENV-$(date +%Y%m%d_%H%M%S).tar.gz"

    cd "$FRONTEND_DIR"
    tar -czf "../$DEPLOY_PACKAGE" -C "$BUILD_DIR" .
    cd ..

    print_success "Deployment package created: $DEPLOY_PACKAGE"
    print_status "Upload this package to your static hosting service"
    print_status "Extract contents to your web server's document root"
}

# Rollback function
rollback() {
    print_warning "Rolling back to previous deployment..."

    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/dist-* 2>/dev/null | head -1)

    if [ -n "$LATEST_BACKUP" ]; then
        rm -rf "$FRONTEND_DIR/$BUILD_DIR"
        cp -r "$LATEST_BACKUP" "$FRONTEND_DIR/$BUILD_DIR"
        print_success "Rollback completed"
    else
        print_error "No backup found for rollback"
        exit 1
    fi
}

# Health check
health_check() {
    print_status "Performing health check..."

    # Check if server is responding (for server deployments)
    if command_exists curl; then
        if curl -f -s http://localhost:4173 >/dev/null 2>&1; then
            print_success "Health check passed - server is responding"
        else
            print_warning "Health check failed - server not responding"
        fi
    else
        print_warning "curl not available, skipping health check"
    fi
}

# Main deployment function
deploy() {
    print_status "Starting deployment for $ENV environment..."
    print_status "Timestamp: $(date)"

    # Run deployment steps
    check_prerequisites
    backup_current
    build_frontend
    validate_build

    case $ENV in
        "dev")
            deploy_dev
            ;;
        "staging"|"prod")
            deploy_server
            ;;
        "static")
            deploy_static
            ;;
        *)
            print_error "Unknown environment: $ENV"
            print_status "Available environments: dev, staging, prod, static"
            exit 1
            ;;
    esac
}

# Handle script arguments
case "${1:-}" in
    "rollback")
        rollback
        ;;
    "health")
        health_check
        ;;
    "help"|"-h"|"--help")
        echo "Smart Pillow Frontend Deployment Script"
        echo ""
        echo "Usage: $0 [command|environment]"
        echo ""
        echo "Environments:"
        echo "  dev      - Start development server (default)"
        echo "  staging  - Deploy to staging server"
        echo "  prod     - Deploy to production server"
        echo "  static   - Create static deployment package"
        echo ""
        echo "Commands:"
        echo "  rollback - Rollback to previous deployment"
        echo "  health   - Perform health check"
        echo "  help     - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0               # Start development server"
        echo "  $0 dev           # Start development server"
        echo "  $0 prod          # Deploy to production"
        echo "  $0 static        # Create static deployment package"
        echo "  $0 rollback      # Rollback to previous version"
        ;;
    *)
        deploy
        ;;
esac
