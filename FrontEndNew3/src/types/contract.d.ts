export interface CarbonCredit {
  id: string;
  tokenId: string;
  fractionalTokens: number;
  totalSupply: number;
  currentPrice: number;
  apy: number;
  verified: boolean;
  projectName: string;
  location: string;
  vintage: number;
  methodology: string;
  imageUrl: string;
}

export interface StakingPosition {
  id: string;
  tokenId: string;
  amount: number;
  rewards: number;
  apy: number;
  stakingStart: Date;
  boostMultiplier: number;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  tokenId: string;
  amount: number;
  price: number;
  timestamp: Date;
  txHash: string;
}

export interface ContractConfig {
  fractionalizer: string;
  yieldEngine: string;
  achievement: string;
  retirement: string;
}

export interface OracleData {
  forestGrowth: number;
  carbonSequestration: number;
  lastUpdated: Date;
  verified: boolean;
}