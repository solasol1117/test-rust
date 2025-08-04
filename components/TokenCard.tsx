"use client";

import { Token } from "@/types/token";

interface TokenCardProps {
  token: Token;
  onClick: () => void;
  onAddToPortfolio: () => void;
}

export default function TokenCard({
  token,
  onClick,
  onAddToPortfolio,
}: TokenCardProps) {
  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toExponential(2);
    }
    return price.toFixed(4);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  return (
    <div
      className="card hover:bg-gray-700 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold">{token.name}</h3>
            <span className="text-sm text-gray-400">{token.symbol}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Price</p>
              <p className="font-mono">${formatPrice(token.price)}</p>
            </div>
            <div>
              <p className="text-gray-400">24h Change</p>
              <p
                className={`font-mono ${
                  token.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {token.priceChange24h >= 0 ? "+" : ""}
                {token.priceChange24h.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400">Volume</p>
              <p className="font-mono">{formatVolume(token.volume24h)}</p>
            </div>
            <div>
              <p className="text-gray-400">Liquidity</p>
              <p className="font-mono">{formatVolume(token.liquidity)}</p>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPortfolio();
          }}
          className="btn-primary text-sm"
        >
          Add to Portfolio
        </button>
      </div>
    </div>
  );
}
