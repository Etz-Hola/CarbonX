import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Leaf,
  Award,
  DollarSign,
  Activity,
  Users,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatNumber } from '../utils/format';
import { TokenCard } from '../components/feature/TokenCard';
import { NFTCard } from '../components/feature/NFTCard';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'portfolio' | 'achievements'>('overview');

  // Mock data - replace with real data from hooks
  const mockStats = {
    totalValue: 12500.75,
    totalOffset: 25.5,
    activePositions: 8,
    totalRewards: 1250.32,
  };

  const mockTokens = [
    {
      tokenId: '1',
      name: 'Amazon Rainforest Credit',
      symbol: 'ARC',
      totalSupply: 10000,
      availableSupply: 7500,
      price: 12.50,
      priceChange24h: 5.2,
      volume24h: 125000,
      marketCap: 125000,
      apy: 15.5,
      metadata: {
        name: 'Amazon Rainforest Credit',
        description: 'Verified carbon credits from Amazon rainforest conservation',
        image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
        attributes: [],
        external_url: '',
      },
    },
    {
      tokenId: '2',
      name: 'Mangrove Restoration Credit',
      symbol: 'MRC',
      totalSupply: 5000,
      availableSupply: 3200,
      price: 18.75,
      priceChange24h: -2.1,
      volume24h: 85000,
      marketCap: 93750,
      apy: 12.8,
      metadata: {
        name: 'Mangrove Restoration Credit',
        description: 'Carbon credits from mangrove restoration projects',
        image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg',
        attributes: [],
        external_url: '',
      },
    },
  ];

  const mockAchievements = [
    {
      id: '1',
      name: 'First Trade',
      description: 'Completed your first carbon credit trade',
      imageUrl: '',
      boostPercentage: 1,
      unlockedAt: new Date('2024-01-15'),
      rarity: 'common' as const,
    },
    {
      id: '2',
      name: 'Tree Planter',
      description: 'Offset 10+ tons of CO₂',
      imageUrl: '',
      boostPercentage: 3,
      unlockedAt: new Date('2024-02-01'),
      rarity: 'rare' as const,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  const handleTrade = (tokenId: string) => {
    // Navigate to trade page or open trade modal
    console.log('Trade token:', tokenId);
  };

  const handleStake = (tokenId: string) => {
    // Navigate to stake page or open stake modal
    console.log('Stake token:', tokenId);
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {state.user?.address ? state.user.address.slice(0, 6) : 'User'}!
            </h1>
            <p className="text-gray-600">
              Track your carbon impact and manage your green investments
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: DollarSign,
                label: 'Total Portfolio Value',
                value: formatCurrency(mockStats.totalValue),
                change: '+12.5%',
                color: 'emerald',
              },
              {
                icon: Leaf,
                label: 'CO₂ Offset (tons)',
                value: mockStats.totalOffset.toString(),
                change: '+5.2 tons',
                color: 'green',
              },
              {
                icon: TrendingUp,
                label: 'Active Positions',
                value: mockStats.activePositions.toString(),
                change: '+2 positions',
                color: 'blue',
              },
              {
                icon: Award,
                label: 'Total Rewards',
                value: formatCurrency(mockStats.totalRewards),
                change: '+8.3%',
                color: 'yellow',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className={`text-sm text-${stat.color}-600 font-medium`}>
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {selectedTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Market Overview
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {mockTokens.map((token) => (
                      <TokenCard
                        key={token.tokenId}
                        token={token}
                        onTrade={handleTrade}
                        onStake={handleStake}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'portfolio' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your Holdings
                    </h3>
                    <Button variant="primary" size="sm">
                      View All Positions
                    </Button>
                  </div>
                  <div className="text-center py-12">
                    <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No positions yet</p>
                    <Button variant="primary" onClick={() => handleTrade('1')}>
                      Make Your First Trade
                    </Button>
                  </div>
                </div>
              )}

              {selectedTab === 'achievements' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockAchievements.map((achievement) => (
                      <NFTCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};