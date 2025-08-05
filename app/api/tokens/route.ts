import { NextResponse } from "next/server";

// CoinGecko token IDs mapping
const TOKEN_IDS_MAP = {
  "solana": "solana",
  "bonk": "bonk",
  "jupiter-exchange-solana": "jupiter-exchange-solana", 
  "raydium": "raydium",
  "serum": "serum"
};

// Fallback data in case API fails
const fallbackTokens = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 98.45,
    priceChange24h: 5.2,
    volume24h: 1234567,
    liquidity: 9876543,
    pairAddress: "0x123...",
    dexId: "raydium",
    chainId: "solana",
  },
  {
    id: "bonk",
    name: "Bonk",
    symbol: "BONK",
    price: 0.00001234,
    priceChange24h: -2.1,
    volume24h: 567890,
    liquidity: 1234567,
    pairAddress: "0x456...",
    dexId: "raydium",
    chainId: "solana",
  },
  {
    id: "jupiter-exchange-solana",
    name: "Jupiter",
    symbol: "JUP",
    price: 0.45,
    priceChange24h: 12.5,
    volume24h: 890123,
    liquidity: 2345678,
    pairAddress: "0x789...",
    dexId: "raydium",
    chainId: "solana",
  },
  {
    id: "raydium",
    name: "Raydium",
    symbol: "RAY",
    price: 2.34,
    priceChange24h: 3.7,
    volume24h: 345678,
    liquidity: 5678901,
    pairAddress: "0xabc...",
    dexId: "raydium",
    chainId: "solana",
  },
  {
    id: "serum",
    name: "Serum", 
    symbol: "SRM",
    price: 0.12,
    priceChange24h: -1.8,
    volume24h: 234567,
    liquidity: 3456789,
    pairAddress: "0xdef...",
    dexId: "raydium",
    chainId: "solana",
  },
];

async function fetchLivePrices() {
  const tokenIds = Object.values(TOKEN_IDS_MAP).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'max-age=30'
      }
    });
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from CoinGecko:", error);
    return null;
  }
}

export async function GET() {
  try {
    const liveData = await fetchLivePrices();
    
    if (!liveData) {
      console.log("Using fallback data due to API failure");
      return NextResponse.json(fallbackTokens);
    }

    // Map live data to our token format
    const liveTokens = fallbackTokens.map(fallbackToken => {
      const coinGeckoData = liveData[fallbackToken.id];
      
      if (coinGeckoData) {
        return {
          ...fallbackToken,
          price: coinGeckoData.usd || fallbackToken.price,
          priceChange24h: coinGeckoData.usd_24h_change || fallbackToken.priceChange24h,
          volume24h: coinGeckoData.usd_24h_vol || fallbackToken.volume24h,
          liquidity: coinGeckoData.usd_market_cap || fallbackToken.liquidity
        };
      }
      
      return fallbackToken;
    });

    return NextResponse.json(liveTokens);
  } catch (error) {
    console.error("Error fetching live token data:", error);
    return NextResponse.json(fallbackTokens);
  }
}
