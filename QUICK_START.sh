#!/bin/bash
# Clarity Planner - Quick Start Script

echo "🎯 Clarity Weekly Planner - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install it first:"
    echo "   brew install node"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project
cd "$(dirname "$0")" || exit
echo "📁 Project: $(pwd)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "�� Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting development server..."
echo "📍 Open: http://localhost:3000"
echo ""

# Start the dev server
npm run dev
