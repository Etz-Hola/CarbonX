import { API_ENDPOINTS } from '../utils/constants';

// External API service for data fetching
export class APIService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.carbonx.io') {
    this.baseUrl = baseUrl;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Oracle data endpoints
  async getOracleData() {
    try {
      return await this.fetchWithAuth('/oracle/latest');
    } catch (error) {
      console.error('Failed to fetch oracle data:', error);
      // Return mock data as fallback
      return {
        forestGrowth: 8.5,
        carbonSequestration: 125000,
        lastUpdated: new Date(),
        verified: true,
      };
    }
  }

  async getImpactData() {
    try {
      return await this.fetchWithAuth('/impact/projects');
    } catch (error) {
      console.error('Failed to fetch impact data:', error);
      // Return mock data as fallback
      return [
        {
          id: '1',
          name: 'Amazon Rainforest Conservation',
          location: 'Brazil',
          totalArea: '15,000 hectares',
          co2Offset: 125000,
          growthRate: 8.5,
          coordinates: { lat: -3.4653, lng: -62.2159 },
          status: 'active',
          lastUpdate: '2024-02-15',
        }
      ];
    }
  }

  // Fiat currency rates
  async getFiatRates() {
    try {
      return await this.fetchWithAuth('/rates/fiat');
    } catch (error) {
      console.error('Failed to fetch fiat rates:', error);
      // Return mock data as fallback
      return {
        USD: 1,
        EUR: 0.85,
        INR: 83.12,
        lastUpdated: new Date(),
      };
    }
  }

  // User analytics
  async getUserAnalytics(address: string) {
    try {
      return await this.fetchWithAuth(`/analytics/user/${address}`);
    } catch (error) {
      console.error('Failed to fetch user analytics:', error);
      return null;
    }
  }

  async trackEvent(event: string, data: any) {
    try {
      await this.fetchWithAuth('/analytics/events', {
        method: 'POST',
        body: JSON.stringify({ event, data, timestamp: new Date() }),
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Leaderboard data
  async getLeaderboard(category: 'offset' | 'trading' | 'staking') {
    try {
      return await this.fetchWithAuth(`/leaderboard/${category}`);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      // Return mock data as fallback
      return [
        { rank: 1, address: '0x1234...5678', totalOffset: 150.5, achievements: 12, isAnonymous: false },
        { rank: 2, address: '0x2345...6789', totalOffset: 142.3, achievements: 10, isAnonymous: true },
        { rank: 3, address: '0x3456...7890', totalOffset: 138.7, achievements: 15, isAnonymous: false },
      ];
    }
  }

  // IPFS and metadata
  async uploadToIPFS(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${this.baseUrl}/ipfs/upload`, {
        method: 'POST',
        body: formData,
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to upload to IPFS:', error);
      throw error;
    }
  }

  async getMetadata(tokenId: string) {
    try {
      return await this.fetchWithAuth(`/metadata/${tokenId}`);
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      return null;
    }
  }

  // Fiat on/off-ramp integration
  async initiateFiatPurchase(amount: number, currency: string, paymentMethod: string) {
    try {
      return await this.fetchWithAuth('/fiat/purchase', {
        method: 'POST',
        body: JSON.stringify({ amount, currency, paymentMethod }),
      });
    } catch (error) {
      console.error('Failed to initiate fiat purchase:', error);
      throw error;
    }
  }

  async getFiatProviders() {
    try {
      return await this.fetchWithAuth('/fiat/providers');
    } catch (error) {
      console.error('Failed to fetch fiat providers:', error);
      return [
        { id: 'moonpay', name: 'MoonPay', currencies: ['USD', 'EUR'] },
        { id: 'ramp', name: 'Ramp', currencies: ['USD', 'EUR', 'GBP'] },
      ];
    }
  }

  // Notification service
  async registerForNotifications(address: string, pushToken: string) {
    try {
      await this.fetchWithAuth('/notifications/register', {
        method: 'POST',
        body: JSON.stringify({ address, pushToken }),
      });
    } catch (error) {
      console.error('Failed to register for notifications:', error);
    }
  }

  async getNotifications(address: string) {
    try {
      return await this.fetchWithAuth(`/notifications/${address}`);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    }
  }
}

export const apiService = new APIService();