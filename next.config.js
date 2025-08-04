const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    DEXSCREENER_API_URL: "https://api.dexscreener.com/latest/dex",
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  },
};

module.exports = nextConfig;
