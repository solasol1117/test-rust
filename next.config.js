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
            value: "frame-src 'self' https://s.tradingview.com https://www.tradingview.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://s3.tradingview.com https://s.tradingview.com; connect-src 'self' https://api.coingecko.com https://s.tradingview.com https://www.tradingview.com;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
