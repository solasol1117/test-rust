import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mockTokens = [
      {
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
      {
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
      {
        id: "3",
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
        id: "4",
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
        id: "5",
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

    return NextResponse.json(mockTokens);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
