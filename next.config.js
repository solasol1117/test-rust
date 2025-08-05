const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    DEXSCREENER_API_URL: "https://api.dexscreener.com/latest/dex",
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://*.tradingview.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tradingview.com; connect-src 'self' https://api.coingecko.com https://*.tradingview.com wss://*.tradingview.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
