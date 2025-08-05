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
  const [refreshing, setRefreshing] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchTokens();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchTokens, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchTokens = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      }
      
      const response = await fetch("/api/tokens", {
        cache: 'no-store' // Ensure fresh data
      });
      const data = await response.json();
      setTokens(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      setTokens(mockTokens);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    fetchTokens(true);
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Available Tokens</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
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
