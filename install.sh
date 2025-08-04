#!/bin/bash

echo "🚀 Setting up Crypto Portfolio App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local file
echo "🔧 Creating environment file..."
cat > .env.local << EOF
JWT_SECRET=your-super-secret-jwt-key-here
DEXSCREENER_API_URL=https://api.dexscreener.com/latest/dex
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Start coding your demo!"
echo ""
echo "📚 Features included:"
echo "- Token listing with mock data"
echo "- Authentication with recovery phrases"
echo "- Portfolio management"
echo "- Responsive UI with Tailwind CSS"
echo "- TypeScript types and interfaces"
echo "- API route structure" 