"use client";

import { useState, useEffect } from "react";
import { PortfolioHolding } from "@/types/token";
import { useAuth } from "@/hooks/useAuth";

interface PortfolioProps {
  onShowAuthModal?: () => void;
}

export default function Portfolio({ onShowAuthModal }: PortfolioProps) {
  const { isAuthenticated } = useAuth();
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolio();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Listen for portfolio updates
    const handlePortfolioUpdate = () => {
      if (isAuthenticated) {
        fetchPortfolio();
      }
    };

    window.addEventListener('portfolio-updated', handlePortfolioUpdate);
    return () => window.removeEventListener('portfolio-updated', handlePortfolioUpdate);
  }, [isAuthenticated]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setHoldings(data.holdings);
      setTotalValue(data.totalValue);
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      setHoldings([]);
      setTotalValue(0);
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
          <button 
            className="btn-primary"
            onClick={onShowAuthModal}
          >
            Login
          </button>
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


