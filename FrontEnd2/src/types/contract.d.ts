// TypeScript definitions for smart contracts
export interface ContractAddresses {
  diamond: string;
  fractionalizer: string;
  yieldEngine: string;
  retirement: string;
  achievement: string;
}

export interface CarbonCredit {
  id: string;
  tokenId: number;
  totalSupply: number;
  availableSupply: number;
  pricePerToken: string;
  verified: boolean;
  registry: string;
  location: string;
  vintageYear: number;
  methodology: string;
  issuanceDate: string;
  imageUrl?: string;
}

export interface FractionalToken {
  id: string;
  creditId: string;
  amount: number;
  pricePerToken: string;
  lastUpdated: string;
}

export interface StakingPosition {
  id: string;
  tokenId: number;
  amount: number;
  stakingStartTime: number;
  currentRewards: string;
  apy: number;
  isActive: boolean;
}

export interface Achievement {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
  yieldBoost: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface RetirementCertificate {
  id: string;
  tokenId: number;
  creditId: string;
  amount: number;
  retiredAt: string;
  reason: string;
  certificateUrl: string;
}