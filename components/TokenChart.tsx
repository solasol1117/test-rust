"use client";

import { useEffect, useState } from "react";
import { Token } from "@/types/token";

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

  useEffect(() => {
    setIsLoading(true);
    setChartKey(prev => prev + 1);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [token]);

  const generateTradingViewChart = () => {
    const symbol = getTradingViewSymbol(token);
    
    // Primary chart - Advanced Chart
    const advancedChartUrl = new URL('https://s.tradingview.com/widgetembed/');
    advancedChartUrl.searchParams.set('frameElementId', `tradingview_${chartKey}`);
    advancedChartUrl.searchParams.set('symbol', symbol);
    advancedChartUrl.searchParams.set('interval', '15');
    advancedChartUrl.searchParams.set('hidesidetoolbar', '1');
    advancedChartUrl.searchParams.set('symboledit', '1');
    advancedChartUrl.searchParams.set('saveimage', '1');
    advancedChartUrl.searchParams.set('toolbarbg', '1f2937');
    advancedChartUrl.searchParams.set('studies', 'Volume@tv-basicstudies');
    advancedChartUrl.searchParams.set('theme', 'dark');
    advancedChartUrl.searchParams.set('style', '1');
    advancedChartUrl.searchParams.set('timezone', 'Etc/UTC');
    advancedChartUrl.searchParams.set('locale', 'en');
    
    // Fallback - Symbol Overview widget (more reliable)
    const overviewUrl = new URL('https://s.tradingview.com/embed-widget/symbol-overview/');
    overviewUrl.searchParams.set('frameElementId', `tradingview_overview_${chartKey}`);
    overviewUrl.searchParams.set('symbols', JSON.stringify([[symbol, symbol.split(':')[1] || symbol]]));
    overviewUrl.searchParams.set('chartOnly', 'false');
    overviewUrl.searchParams.set('width', '100%');
    overviewUrl.searchParams.set('height', '500');
    overviewUrl.searchParams.set('locale', 'en');
    overviewUrl.searchParams.set('colorTheme', 'dark');
    overviewUrl.searchParams.set('autosize', 'true');
    overviewUrl.searchParams.set('showVolume', 'true');
    overviewUrl.searchParams.set('showMA', 'false');
    overviewUrl.searchParams.set('hideDateRanges', 'false');
    overviewUrl.searchParams.set('hideMarketStatus', 'false');
    overviewUrl.searchParams.set('hideSymbolLogo', 'false');
    overviewUrl.searchParams.set('scalePosition', 'right');
    overviewUrl.searchParams.set('scaleMode', '1');
    overviewUrl.searchParams.set('fontFamily', '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif');
    overviewUrl.searchParams.set('fontSize', '10');
    overviewUrl.searchParams.set('noTimeScale', 'false');
    overviewUrl.searchParams.set('valuesTracking', '1');
    overviewUrl.searchParams.set('changeMode', 'price-and-percent');
    overviewUrl.searchParams.set('chartType', '1');
    overviewUrl.searchParams.set('maLineColor', '#2962FF');
    overviewUrl.searchParams.set('maLineWidth', '1');
    overviewUrl.searchParams.set('maLength', '9');
    overviewUrl.searchParams.set('backgroundColor', 'rgba(19, 23, 34, 1)');
    overviewUrl.searchParams.set('lineWidth', '2');
    overviewUrl.searchParams.set('lineType', '0');
    overviewUrl.searchParams.set('dateRanges', '1D|1W|1M|3M|6M|YTD|1Y|ALL');
    
    return (
      <div key={chartKey} className="w-full h-[500px] bg-gray-900 rounded">
        <div className="grid grid-cols-1 gap-0 h-full">
          {/* Primary TradingView Chart */}
          <div className="h-full">
            <iframe
              src={advancedChartUrl.toString()}
              width="100%"
              height="500"
              frameBorder="0"
              allowTransparency={true}
              scrolling="no"
              allowFullScreen={true}
              className="rounded"
              style={{ 
                background: 'transparent',
                minHeight: '500px'
              }}
              title={`${token.name} TradingView Chart`}
              onError={() => {
                // If primary chart fails, the component will continue showing the overview
                console.log('Primary chart failed to load, showing overview widget');
              }}
            />
          </div>
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
          <p className="text-sm text-gray-400">Live TradingView Chart</p>
        </div>
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
      </div>
      
      <div className="w-full bg-gray-800 rounded-lg relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-gray-400">Loading chart...</p>
            </div>
          </div>
        )}
        {generateTradingViewChart()}
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
