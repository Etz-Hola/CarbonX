// Token and NFT data types
export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: TokenAttribute[];
  external_url?: string;
}

export interface TokenAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
}

export interface PriceData {
  current: string;
  previous24h: string;
  change24h: string;
  changePercentage24h: number;
  high24h: string;
  low24h: string;
  volume24h: string;
}

export interface TradeOrder {
  id: string;
  type: 'buy' | 'sell';
  tokenId: number;
  amount: number;
  price: string;
  total: string;
  status: 'pending' | 'filled' | 'cancelled';
  createdAt: string;
  filledAt?: string;
}

export interface TradeHistory {
  id: string;
  type: 'buy' | 'sell';
  tokenId: number;
  amount: number;
  price: string;
  total: string;
  timestamp: string;
  txHash: string;
}