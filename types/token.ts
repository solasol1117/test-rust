export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  pairAddress: string;
  dexId: string;
  chainId: string;
}

export interface PortfolioHolding {
  tokenId: string;
  token: Token;
  quantity: number;
  value: number;
}

export interface User {
  id: string;
  username: string;
  recoveryPhrase: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}
