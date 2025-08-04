"use client";

import { Token } from "@/types/token";

interface TokenChartProps {
  token: Token;
}

export default function TokenChart({ token }: TokenChartProps) {
  return (
    <div className="w-full">
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">
            {token.name} ({token.symbol}) Chart
          </h4>
          <p className="text-gray-400 mb-4">
            TradingView integration would be here
          </p>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">
              Current Price: ${token.price.toFixed(4)}
            </p>
            <p className="text-sm text-gray-300">
              24h Change: {token.priceChange24h >= 0 ? "+" : ""}
              {token.priceChange24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
