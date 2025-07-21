export interface User {
  address: string;
  balance: number;
  totalOffset: number;
  achievements: Achievement[];
  stakingPositions: StakingPosition[];
  tradeHistory: Trade[];
  leaderboardRank?: number;
  kycStatus: 'pending' | 'approved' | 'rejected';
  preferences: UserPreferences;
}

export interface UserPreferences {
  currency: 'USD' | 'EUR' | 'INR';
  language: 'en' | 'es' | 'hi';
  notifications: boolean;
  publicProfile: boolean;
  theme: 'light' | 'dark';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  boostPercentage: number;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  totalOffset: number;
  achievements: number;
  isAnonymous: boolean;
}