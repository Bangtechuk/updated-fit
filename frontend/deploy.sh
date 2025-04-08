#!/bin/bash

# Deployment script for Fittribe.fitness frontend

# Load environment variables
set -a
source .env.production
set +a

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# If using a static hosting service like Netlify or Vercel
# The build output will be in the .next directory
# For static export (optional)
# echo "Exporting static files..."
# npm run export
# The static export will be in the out directory

echo "Frontend build complete!"
echo "Deploy the .next directory to your hosting service"
echo "For Vercel: Just connect your repository and Vercel will handle the build"
echo "For Netlify: Upload the .next directory or connect your repository"
