# Crypto Portfolio App

A modern web application for tracking cryptocurrency tokens, viewing live data, and managing portfolios with decentralized authentication.

## Features

### 🚀 Core Functionality

- **Live Token Data**: Real-time prices, 24h changes, volume, and liquidity from Dexscreener API
- **Interactive Charts**: TradingView integration for price visualization
- **Portfolio Management**: Add/remove tokens, track holdings, and calculate total value
- **Decentralized Authentication**: Username/password with 12-word recovery phrases

### 🔐 Authentication System

- No email or phone verification required
- Secure 12-word recovery phrase generation
- Password recovery using seed phrases
- JWT-based session management

### 📊 Data Display

- Token cards with live price updates
- Color-coded 24h changes (green for gains, red for losses)
- Volume and liquidity metrics
- Portfolio summary with total value

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: TradingView Widget
- **Authentication**: JWT tokens, bcrypt for password hashing
- **API**: Next.js API routes
- **Data**: Dexscreener API (Solana tokens)

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── tokens/            # Token data endpoint
│   │   └── portfolio/         # Portfolio management
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard
├── components/                # Shared components
├── hooks/                     # Custom hooks
├── types/                     # TypeScript types
└── package.json               # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crypto-portfolio-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   JWT_SECRET=your-secret-key-here
   DEXSCREENER_API_URL=https://api.dexscreener.com/latest/dex
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### For Users

1. **Browse Tokens**: View available Solana tokens with live data
2. **View Charts**: Click on any token to see its price chart
3. **Register/Login**: Create an account with username/password
4. **Save Recovery Phrase**: Write down the 12-word recovery phrase
5. **Add to Portfolio**: Click "Add to Portfolio" on any token
6. **Manage Holdings**: View your portfolio with total value

### For Developers

- **API Routes**: All endpoints are in `/app/api/`
- **Components**: Reusable UI components in `/components/`
- **Types**: TypeScript definitions in `/types/`
- **Hooks**: Custom React hooks in `/hooks/`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration with recovery phrase
- `POST /api/auth/login` - User login

### Data

- `GET /api/tokens` - Fetch available tokens
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio` - Add token to portfolio

## Development Notes

### Current Implementation

- **Mock Data**: Uses mock data for development (no real API calls)
- **In-Memory Storage**: User data stored in memory (resets on restart)
- **Basic Charts**: Placeholder for TradingView integration

### Production Considerations

- **Database**: Replace in-memory storage with PostgreSQL/MongoDB
- **Real API**: Connect to actual Dexscreener API
- **Security**: Implement proper JWT validation and bcrypt hashing
- **Charts**: Integrate full TradingView widget
- **Real-time**: Add WebSocket connections for live updates

## Demo Features

### 2-Hour Coding Demo

This skeleton demonstrates:

- ✅ Complete UI structure with Tailwind CSS
- ✅ Token listing with mock data
- ✅ Authentication modal with recovery phrases
- ✅ Portfolio management interface
- ✅ API route structure
- ✅ TypeScript types and interfaces
- ✅ Responsive design
- ✅ Component architecture

### What's Included

- **5 Mock Tokens**: SOL, BONK, JUP, RAY, SRM with realistic data
- **Authentication Flow**: Registration with recovery phrase generation
- **Portfolio Display**: Mock holdings with total value calculation
- **Responsive Layout**: Works on desktop and mobile
- **Type Safety**: Full TypeScript implementation

## Next Steps

1. **Install Dependencies**: Run `npm install`
2. **Start Development**: Run `npm run dev`
3. **Test Features**:
   - Browse tokens
   - Register/login
   - View portfolio
   - Add tokens to portfolio
4. **Customize**: Modify mock data, styling, or add real API integration

## Contributing

This is a demo project for a 2-hour coding session. For production use, consider:

- Adding proper error handling
- Implementing real-time data updates
- Adding more security measures
- Integrating with real blockchain data
- Adding more chart options and timeframes

## License

This project is for demonstration purposes.
