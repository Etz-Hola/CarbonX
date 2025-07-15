import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPortfolio } from '../types/user';

interface UserContextType {
  user: User | null;
  portfolio: UserPortfolio | null;
  isLoading: boolean;
  error: string | null;
  login: (address: string, isWeb3?: boolean) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshPortfolio: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<UserPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (address: string, isWeb3: boolean = true) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to login/register user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        walletAddress: address,
        displayName: `User ${address.slice(0, 6)}`,
        totalCarbonOffset: 12.5,
        totalTokensHeld: 1000,
        totalStaked: 500,
        leaderboardRank: 42,
        isWeb3User: isWeb3,
        kycVerified: false,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('carbonx_user', JSON.stringify(mockUser));
      
      // Load portfolio
      await refreshPortfolio();
    } catch (err) {
      setError('Failed to login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPortfolio(null);
    localStorage.removeItem('carbonx_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('carbonx_user', JSON.stringify(updatedUser));
  };

  const refreshPortfolio = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to get portfolio data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPortfolio: UserPortfolio = {
        totalValue: '25000.00',
        totalCarbonOffset: 12.5,
        holdings: [
          {
            creditId: '1',
            tokenId: 1,
            amount: 500,
            currentValue: '12500.00',
            purchasePrice: '10000.00',
            profitLoss: '2500.00',
            profitLossPercentage: 25,
          },
          {
            creditId: '2',
            tokenId: 2,
            amount: 300,
            currentValue: '7500.00',
            purchasePrice: '6000.00',
            profitLoss: '1500.00',
            profitLossPercentage: 25,
          },
        ],
        stakingPositions: [
          {
            id: '1',
            tokenId: 1,
            amount: 250,
            stakingStartTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
            currentRewards: '125.50',
            apy: 12.5,
            isActive: true,
          },
        ],
        achievements: [
          {
            id: '1',
            tokenId: 1,
            name: 'First Trade',
            description: 'Completed your first carbon credit trade',
            imageUrl: '/assets/images/icons/achievement-first-trade.png',
            earnedAt: new Date().toISOString(),
            yieldBoost: 1,
            rarity: 'common',
          },
        ],
        retirementCertificates: [],
      };
      
      setPortfolio(mockPortfolio);
    } catch (err) {
      setError('Failed to load portfolio');
      console.error('Portfolio error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem('carbonx_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        refreshPortfolio();
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('carbonx_user');
      }
    }
  }, []);

  const value: UserContextType = {
    user,
    portfolio,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    refreshPortfolio,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};