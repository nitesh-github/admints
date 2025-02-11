#!/bin/bash
set -e  # Exit on any error

# Define directories
SOURCE_DIR="/var/www/html/"
TEMP_DIR="/var/www/html_copy/"

# Step 1: Create a backup of the application
echo "Creating backup of the application..."
rsync -av --exclude='/var/www/html/install' "$SOURCE_DIR" "$TEMP_DIR"

# Step 2: Navigate to the backup directory
cd "$TEMP_DIR" || { echo "Failed to navigate to $TEMP_DIR! Exiting."; exit 1; }

# Install dependencies
echo "Installing dependencies..."
npm install --force

echo "Dependencies installed successfully!"

# Step 3: Clean and rebuild the application
echo "Removing old build..."
rm -rf build
echo "Clearing npm cache..."
npm cache clean --force
echo "Building the application..."
npm run build

# Step 4: Replace the old build with the new one
echo "Replacing old build with new build..."
cp -Rf build "$SOURCE_DIR"

# Step 5: Clean up temporary files
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "Application build and deployment completed successfully!"