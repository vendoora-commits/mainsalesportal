#!/bin/bash

# Vendoora Deployment Script
# This script handles the deployment process for the smart hotel platform

set -e

echo "🚀 Starting Vendoora deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

print_status "Checking environment variables..."

# Check for required environment variables
if [ ! -f ".env.production" ]; then
    print_warning ".env.production not found. Creating from template..."
    cp .env.example .env.production
    print_warning "Please update .env.production with your actual values before deploying."
fi

print_status "Installing dependencies..."
npm install

print_status "Running type check..."
npm run type-check

print_status "Running linting..."
npm run lint

print_status "Building application..."
npm run build

print_status "Deploying to Vercel..."
vercel --prod

print_success "Deployment completed successfully! 🎉"
print_status "Your application should be available at the URL provided by Vercel."

# Optional: Run post-deployment checks
read -p "Would you like to run post-deployment checks? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Running post-deployment checks..."
    
    # Get the deployment URL (this would need to be customized based on your Vercel setup)
    DEPLOYMENT_URL=$(vercel ls | grep "vendoora" | head -1 | awk '{print $2}')
    
    if [ ! -z "$DEPLOYMENT_URL" ]; then
        print_status "Checking deployment at $DEPLOYMENT_URL..."
        
        # Check if the site is responding
        if curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL" | grep -q "200"; then
            print_success "Site is responding correctly!"
        else
            print_warning "Site might not be responding correctly. Please check manually."
        fi
    else
        print_warning "Could not determine deployment URL. Please check manually."
    fi
fi

print_success "Deployment process completed! 🚀"
