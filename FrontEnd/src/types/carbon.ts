export type CarbonCreditQuality = 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';

export interface CarbonCredit {
  id: string;
  name: string;
  description: string;
  type: 'reforestation' | 'avoided deforestation' | 'renewable energy' | 'methane capture' | 'ocean';
  location: {
    country: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  vintage: number;
  totalSupply: number;
  availableSupply: number;
  pricePerTon: number;
  quality: CarbonCreditQuality;
  registry: 'Verra' | 'Gold Standard' | 'ACR' | 'CAR' | 'Other';
  verified: boolean;
  imageUrl: string;
  projectDeveloper: string;
  methodology: string;
  expectedYield: number;
  chains: ('Ethereum' | 'Polygon' | 'Arbitrum' | 'Base')[];
}

export interface UserPortfolio {
  totalCredits: number;
  totalValue: number;
  carbonOffset: number;
  holdings: CarbonHolding[];
  impactScore: number;
  yieldEarned: number;
}

export interface CarbonHolding {
  creditId: string;
  creditName: string;
  amount: number;
  value: number;
  purchaseDate: Date;
  averagePurchasePrice: number;
  currentPrice: number;
  chain: string;
  imageUrl: string;
}

export interface MarketStats {
  totalVolume24h: number;
  percentChange24h: number;
  highestYield: number;
  averagePrice: number;
  totalLiquidity: number;
  totalSupply: number;
  totalRetired: number;
}

export interface ProjectImpact {
  id: string;
  name: string;
  treesPlanted: number;
  carbonSequestered: number;
  area: number; // hectares
  biodiversityImpact: 'low' | 'medium' | 'high';
  communityImpact: {
    jobsCreated: number;
    communitiesSupported: number;
  };
  timeline: {
    start: Date;
    end: Date;
    milestones: {
      date: Date;
      description: string;
    }[];
  };
}