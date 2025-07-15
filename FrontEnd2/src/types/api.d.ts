// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface OracleData {
  forestGrowth: number;
  carbonSequestration: number;
  lastUpdated: string;
  source: string;
  verified: boolean;
}

export interface ImpactData {
  location: {
    lat: number;
    lng: number;
  };
  forestCover: number;
  carbonStored: number;
  growthRate: number;
  lastUpdated: string;
  projectId: string;
  projectName: string;
}

export interface FiatOnRampQuote {
  cryptoAmount: string;
  fiatAmount: string;
  currency: string;
  paymentMethod: string;
  fees: string;
  total: string;
  estimatedTime: string;
  redirectUrl: string;
}