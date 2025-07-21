import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatAddress } from '../utils/format';

export const Leaderboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'offset' | 'trading' | 'staking'>('offset');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Mock leaderboard data
  const leaderboardData = {
    offset: [
      { rank: 1, address: '0x1234...5678', totalOffset: 150.5, achievements: 12, isAnonymous: false },
      { rank: 2, address: '0x2345...6789', totalOffset: 142.3, achievements: 10, isAnonymous: true },
      { rank: 3, address: '0x3456...7890', totalOffset: 138.7, achievements: 15, isAnonymous: false },
      { rank: 4, address: '0x4567...8901', totalOffset: 125.2, achievements: 8, isAnonymous: false },
      { rank: 5, address: '0x5678...9012', totalOffset: 118.9, achievements: 11, isAnonymous: true },
    ],
    trading: [
      { rank: 1, address: '0x2345...6789', volume: 2500000, profit: 125000, isAnonymous: false },
      { rank: 2, address: '0x1234...5678', volume: 2200000, profit: 118000, isAnonymous: false },
      { rank: 3, address: '0x3456...7890', volume: 1950000, profit: 95000, isAnonymous: true },
      { rank: 4, address: '0x5678...9012', volume: 1750000, profit: 87000, isAnonymous: false },
      { rank: 5, address: '0x4567...8901', volume: 1600000, profit: 78000, isAnonymous: false },
    ],
    staking: [
      { rank: 1, address: '0x3456...7890', totalStaked: 50000, rewards: 8500, isAnonymous: false },
      { rank: 2, address: '0x1234...5678', totalStaked: 45000, rewards: 7800, isAnonymous: true },
      { rank: 3, address: '0x5678...9012', totalStaked: 42000, rewards: 7200, isAnonymous: false },
      { rank: 4, address: '0x2345...6789', totalStaked: 38000, rewards: 6500, isAnonymous: false },
      { rank: 5, address: '0x4567...8901', totalStaked: 35000, rewards: 6000, isAnonymous: true },
    ],
  };

  const categories = [
    { id: 'offset', label: 'CO₂ Offset', icon: Trophy, description: 'Total carbon offset' },
    { id: 'trading', label: 'Trading Volume', icon: Medal, description: 'Trading activity' },
    { id: 'staking', label: 'Staking Rewards', icon: Award, description: 'Staking performance' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'from-gray-300 to-gray-500 text-white';
      case 3:
        return 'from-amber-400 to-amber-600 text-white';
      default:
        return 'from-emerald-100 to-emerald-200 text-emerald-800';
    }
  };

  const currentData = leaderboardData[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Community Leaderboard
            </h1>
            <p className="text-gray-600">
              Celebrate the top climate champions making real impact
            </p>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setIsAnonymous(!isAnonymous)}
              icon={isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            >
              {isAnonymous ? 'Show Identity' : 'Go Anonymous'}
            </Button>
          </div>

          {/* Category Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-2">
              {categories.find(c => c.id === selectedCategory)?.icon && (
                React.createElement(categories.find(c => c.id === selectedCategory)!.icon, {
                  className: "w-6 h-6 text-emerald-600"
                })
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                {categories.find(c => c.id === selectedCategory)?.label} Leaders
              </h2>
            </div>
            <p className="text-gray-600">
              {categories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>

          {/* Leaderboard */}
          <div className="space-y-4">
            {currentData.map((entry, index) => (
              <motion.div
                key={`${entry.address}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl shadow-sm ${
                  entry.rank <= 3 
                    ? `bg-gradient-to-r ${getRankColors(entry.rank)}` 
                    : 'bg-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${
                          entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                        }`}>
                          {entry.isAnonymous || isAnonymous ? 'Anonymous' : formatAddress(entry.address)}
                        </span>
                        {entry.isAnonymous && (
                          <EyeOff className={`w-4 h-4 ${
                            entry.rank <= 3 ? 'text-white' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      
                      {/* Stats based on category */}
                      <div className="grid grid-cols-2 gap-4">
                        {selectedCategory === 'offset' && (
                          <>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>CO₂ Offset</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>{entry.totalOffset} tons</p>
                            </div>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>Achievements</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>{entry.achievements}</p>
                            </div>
                          </>
                        )}
                        
                        {selectedCategory === 'trading' && (
                          <>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>Volume</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>${(entry.volume / 1000000).toFixed(1)}M</p>
                            </div>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>Profit</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>${(entry.profit / 1000).toFixed(0)}K</p>
                            </div>
                          </>
                        )}
                        
                        {selectedCategory === 'staking' && (
                          <>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>Total Staked</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>{(entry.totalStaked / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                              <p className={`text-sm ${
                                entry.rank <= 3 ? 'text-white/80' : 'text-gray-500'
                              }`}>Rewards</p>
                              <p className={`font-semibold ${
                                entry.rank <= 3 ? 'text-white' : 'text-gray-900'
                              }`}>${entry.rewards.toLocaleString()}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};