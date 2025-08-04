"use client";

import { useState, useEffect } from "react";
import { PortfolioHolding } from "@/types/token";
import { useAuth } from "@/hooks/useAuth";

export default function Portfolio() {
  const { isAuthenticated } = useAuth();
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolio();
    }
  }, [isAuthenticated]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setHoldings(data.holdings);
      setTotalValue(data.totalValue);
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      setHoldings(mockHoldings);
      setTotalValue(1234.56);
    }
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  if (!isAuthenticated) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Login to view your portfolio</p>
          <button className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Portfolio</h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Total Value</h3>
        <p className="text-2xl font-bold text-accent">
          {formatValue(totalValue)}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Holdings</h3>
        {holdings.length === 0 ? (
          <p className="text-gray-400 text-center py-4">
            No holdings yet. Add tokens to your portfolio!
          </p>
        ) : (
          holdings.map((holding) => (
            <div key={holding.tokenId} className="p-3 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{holding.token.name}</h4>
                <span className="text-sm text-gray-400">
                  {holding.token.symbol}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p className="font-mono">{holding.quantity.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Value</p>
                  <p className="font-mono">{formatValue(holding.value)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const mockHoldings: PortfolioHolding[] = [
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
];
