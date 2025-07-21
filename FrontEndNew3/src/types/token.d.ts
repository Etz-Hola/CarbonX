export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: TokenAttribute[];
  external_url: string;
}

export interface TokenAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface FractionalToken {
  tokenId: string;
  name: string;
  symbol: string;
  totalSupply: number;
  availableSupply: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  apy: number;
  metadata: TokenMetadata;
}

export interface RetirementCertificate {
  id: string;
  tokenId: string;
  amount: number;
  retiredAt: Date;
  certificateUrl: string;
  txHash: string;
  beneficiary?: string;
  message?: string;
}