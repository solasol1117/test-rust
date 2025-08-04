import { NextRequest, NextResponse } from "next/server";

const mockPortfolio = {
  holdings: [
    {
      tokenId: "1",
      token: {
        id: "1",
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
      quantity: 10.5,
      value: 1033.73,
    },
    {
      tokenId: "2",
      token: {
        id: "2",
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
      quantity: 1000000,
      value: 12.34,
    },
  ],
  totalValue: 1046.07,
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
    const { tokenId, quantity } = await request.json();

    if (!tokenId || !quantity) {
      return NextResponse.json(
        { error: "Token ID and quantity are required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to portfolio:", error);
    return NextResponse.json(
      { error: "Failed to add to portfolio" },
      { status: 500 }
    );
  }
}
