// User data types
export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  totalCarbonOffset: number;
  totalTokensHeld: number;
  totalStaked: number;
  leaderboardRank: number;
  isWeb3User: boolean;
  kycVerified: boolean;
  createdAt: string;
  lastActiveAt: string;
}

export interface UserPortfolio {
  totalValue: string;
  totalCarbonOffset: number;
  holdings: TokenHolding[];
  stakingPositions: StakingPosition[];
  achievements: Achievement[];
  retirementCertificates: RetirementCertificate[];
}

export interface TokenHolding {
  creditId: string;
  tokenId: number;
  amount: number;
  currentValue: string;
  purchasePrice: string;
  profitLoss: string;
  profitLossPercentage: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  totalCarbonOffset: number;
  totalValue: string;
  achievements: number;
  isCurrentUser: boolean;
}