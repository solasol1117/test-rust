"use client";

import { useState, useEffect } from "react";
import { Token } from "@/types/token";
import TokenCard from "./TokenCard";
import TokenChart from "./TokenChart";

interface TokenListProps {
  onTokenSelect: (token: Token) => void;
  onAddToPortfolio: () => void;
}

export default function TokenList({
  onTokenSelect,
  onAddToPortfolio,
}: TokenListProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await fetch("/api/tokens");
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      setTokens(mockTokens);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    onTokenSelect(token);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Available Tokens</h2>
        <div className="grid gap-4">
          {tokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={() => handleTokenClick(token)}
              onAddToPortfolio={onAddToPortfolio}
            />
          ))}
        </div>
      </div>

      {selectedToken && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            {selectedToken.name} ({selectedToken.symbol}) Chart
          </h3>
          <TokenChart token={selectedToken} />
        </div>
      )}
    </div>
  );
}

const mockTokens: Token[] = [
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
];
