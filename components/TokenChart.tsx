"use client";

import { useEffect, useState, useRef } from "react";
import { Token } from "@/types/token";

// Import lightweight-charts dynamically to avoid SSR issues
let LightweightCharts: any = null;
if (typeof window !== 'undefined') {
  import('lightweight-charts').then((module) => {
    LightweightCharts = module;
  });
}

interface TokenChartProps {
  token: Token;
}

// TradingView symbol mapping for different tokens
const getTradingViewSymbol = (token: Token): string => {
  const symbolMap: { [key: string]: string } = {
    SOL: "BINANCE:SOLUSDT",
    BONK: "MEXC:BONKUSDT", 
    JUP: "BINANCE:JUPUSDT",
    RAY: "BINANCE:RAYUSDT",
    SRM: "BINANCE:SRMUSDT"
  };
  
  return symbolMap[token.symbol] || `BINANCE:${token.symbol}USDT`;
};

export default function TokenChart({ token }: TokenChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  const [useFallbackChart, setUseFallbackChart] = useState(false); // Try TradingView first
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setChartKey(prev => prev + 1);
    
    // Faster loading for fallback chart
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, useFallbackChart ? 500 : 2000);
    
    return () => clearTimeout(timer);
  }, [token, useFallbackChart]);

  // Create simple price display chart
  const createFallbackChart = () => {
    if (!chartContainerRef.current) return;

    try {
      // Clear existing content
      chartContainerRef.current.innerHTML = '';
      
      // Create a simple, clean price display
      const chartDiv = document.createElement('div');
      chartDiv.className = 'flex flex-col items-center justify-center h-full text-center';
      chartDiv.innerHTML = `
        <div class="mb-8">
          <div class="text-6xl font-bold mb-4">$${token.price.toFixed(token.price < 0.01 ? 6 : 4)}</div>
          <div class="text-2xl ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}">
            ${token.priceChange24h >= 0 ? '+' : ''}${token.priceChange24h.toFixed(2)}%
          </div>
          <div class="text-lg text-gray-400 mt-2">24h Change</div>
        </div>
        
        <div class="grid grid-cols-2 gap-8 text-center">
          <div>
            <div class="text-2xl font-semibold">${(token.volume24h / 1000000).toFixed(1)}M</div>
            <div class="text-gray-400">24h Volume</div>
          </div>
          <div>
            <div class="text-2xl font-semibold">${(token.liquidity / 1000000).toFixed(1)}M</div>
            <div class="text-gray-400">Market Cap</div>
          </div>
        </div>
        
        <div class="mt-8 text-sm text-gray-500">
          <div class="mb-2">Real-time price data from CoinGecko</div>
          <div class="text-xs">Updates automatically every 30 seconds</div>
        </div>
      `;
      
      chartContainerRef.current.appendChild(chartDiv);
      
    } catch (error) {
      console.error('Failed to create fallback chart:', error);
    }
  };

  useEffect(() => {
    if (useFallbackChart && chartContainerRef.current) {
      createFallbackChart();
    }
  }, [useFallbackChart, token]);

  // Add timeout for TradingView chart loading
  useEffect(() => {
    if (!useFallbackChart) {
      // Set loading timeout for TradingView
      const loadingTimeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Stop loading after 3 seconds

      return () => {
        clearTimeout(loadingTimeoutId);
      };
    }
  }, [useFallbackChart, chartKey]);

  const generateTradingViewChart = () => {
    const symbol = getTradingViewSymbol(token);
    
    // Use direct iframe approach - more reliable than script embedding
    const tradingViewUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${chartKey}&symbol=${encodeURIComponent(symbol)}&interval=15&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=1f2937&studies=Volume@tv-basicstudies&theme=dark&style=1&timezone=Etc/UTC&locale=en&withdateranges=1&range=1D&hidevolume=0&hidecontrols=0&details=1&calendar=0&hotlist=0`;
    
    return (
      <div key={chartKey} className="w-full h-[500px] bg-gray-900 rounded relative">
        <iframe
          src={tradingViewUrl}
          width="100%"
          height="500"
          frameBorder="0"
          allowTransparency={true}
          scrolling="no"
          allowFullScreen={true}
          className="rounded"
          style={{ 
            border: 'none',
            background: '#1f2937'
          }}
          title={`${token.name} TradingView Chart`}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 z-10 rounded">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-3"></div>
              <p className="text-gray-300 font-medium">Loading Chart...</p>
            </div>
          </div>
        )}
        

        
        {/* View on TradingView link */}
        <div className="absolute bottom-2 right-2 z-20">
          <a
            href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(symbol)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 bg-gray-800 bg-opacity-75 px-2 py-1 rounded backdrop-blur-sm transition-colors"
          >
            Open in TradingView →
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-semibold">
            {token.name} ({token.symbol}) Chart
          </h4>
          <p className="text-sm text-gray-400">
            {useFallbackChart ? "Live Price Summary" : "TradingView Chart"}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-lg font-mono font-semibold">
              ${token.price.toFixed(token.price < 0.01 ? 6 : 4)}
            </p>
            <p className={`text-sm font-mono ${
              token.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
            }`}>
              {token.priceChange24h >= 0 ? "+" : ""}
              {token.priceChange24h.toFixed(2)}%
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setUseFallbackChart(!useFallbackChart)}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Switch chart type"
            >
              {useFallbackChart ? "📊 TradingView Chart" : "📋 Price Summary"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="w-full bg-gray-800 rounded-lg relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-gray-400">Loading chart...</p>
            </div>
          </div>
        )}
        
        {useFallbackChart ? (
          <div 
            ref={chartContainerRef}
            className="w-full h-[500px] bg-gray-900 rounded"
          />
        ) : (
          generateTradingViewChart()
        )}
      </div>
      

      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-800 p-3 rounded">
          <p className="text-gray-400">24h Volume</p>
          <p className="font-mono">
            {token.volume24h >= 1000000 ? 
              `$${(token.volume24h / 1000000).toFixed(1)}M` : 
              `$${(token.volume24h / 1000).toFixed(1)}K`
            }
          </p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <p className="text-gray-400">Market Cap</p>
          <p className="font-mono">
            {token.liquidity >= 1000000 ? 
              `$${(token.liquidity / 1000000).toFixed(1)}M` : 
              `$${(token.liquidity / 1000).toFixed(1)}K`
            }
          </p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <p className="text-gray-400">DEX</p>
          <p className="capitalize">{token.dexId}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <p className="text-gray-400">Chain</p>
          <p className="capitalize">{token.chainId}</p>
        </div>
      </div>
    </div>
  );
}
