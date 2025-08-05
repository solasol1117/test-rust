import { NextRequest, NextResponse } from "next/server";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  pairAddress: string;
  dexId: string;
  chainId: string;
}

interface PortfolioHolding {
  tokenId: string;
  token: Token;
  quantity: number;
  value: number;
}

const mockPortfolio: {
  holdings: PortfolioHolding[];
  totalValue: number;
} = {
  holdings: [],
  totalValue: 0,
};

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockPortfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tokenId, quantity, token } = await request.json();

    if (!tokenId || !quantity || !token) {
      return NextResponse.json(
        { error: "Token ID, quantity, and token data are required" },
        { status: 400 }
      );
    }

    // Calculate the value
    const value = token.price * quantity;
    
    // Find existing holding or create new one
    const existingHolding = mockPortfolio.holdings.find(h => h.tokenId === tokenId);
    
    if (existingHolding) {
      // Update existing holding
      console.log(`📊 Updating existing holding for ${token.symbol}: ${existingHolding.quantity} + ${quantity}`);
      existingHolding.quantity += quantity;
      existingHolding.value = existingHolding.quantity * token.price;
      existingHolding.token = token; // Update token data with latest prices
    } else {
      // Add new holding
      console.log(`📊 Adding new holding for ${token.symbol}: ${quantity}`);
      const newHolding = {
        tokenId,
        token,
        quantity,
        value
      };
      mockPortfolio.holdings.push(newHolding);
    }
    
    // Recalculate total value
    mockPortfolio.totalValue = mockPortfolio.holdings.reduce((total, holding) => total + holding.value, 0);

    return NextResponse.json({ success: true, message: `Added ${quantity} ${token.symbol} to portfolio` });
  } catch (error) {
    console.error("Error adding to portfolio:", error);
    return NextResponse.json(
      { error: "Failed to add to portfolio" },
      { status: 500 }
    );
  }
}
