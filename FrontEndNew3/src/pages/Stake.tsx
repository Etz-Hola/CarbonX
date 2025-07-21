import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { StakeCard } from '../components/feature/StakeCard';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { formatCurrency, formatPercentage } from '../utils/format';

export const Stake: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string>('1');
  const [stakeAmount, setStakeAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState('30');
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  // Mock data
  const mockStakingPositions = [
    {
      id: '1',
      tokenId: '1',
      amount: 1500,
      rewards: 125.50,
      apy: 15.5,
      stakingStart: new Date('2024-01-15'),
      boostMultiplier: 1,
    },
    {
      id: '2',
      tokenId: '2',
      amount: 2000,
      rewards: 280.75,
      apy: 12.8,
      stakingStart: new Date('2024-02-01'),
      boostMultiplier: 1.5,
    },
  ];

  const mockAvailableTokens = [
    { tokenId: '1', symbol: 'ARC', name: 'Amazon Rainforest Credit', balance: 500, apy: 15.5 },
    { tokenId: '2', symbol: 'MRC', name: 'Mangrove Restoration Credit', balance: 300, apy: 12.8 },
    { tokenId: '3', symbol: 'RFI', name: 'Reforestation Initiative', balance: 750, apy: 18.2 },
  ];

  const lockPeriods = [
    { value: '30', label: '30 days', multiplier: 1.0 },
    { value: '90', label: '90 days', multiplier: 1.2 },
    { value: '180', label: '180 days', multiplier: 1.5 },
    { value: '365', label: '365 days', multiplier: 2.0 },
  ];

  const selectedTokenData = mockAvailableTokens.find(t => t.tokenId === selectedToken);
  const selectedLockData = lockPeriods.find(p => p.value === lockPeriod);
  const estimatedApy = selectedTokenData && selectedLockData 
    ? selectedTokenData.apy * selectedLockData.multiplier 
    : 0;

  const handleUnstake = (id: string) => {
    console.log('Unstake position:', id);
  };

  const handleClaim = (id: string) => {
    console.log('Claim rewards:', id);
  };

  const handleStake = () => {
    console.log('Stake:', { selectedToken, stakeAmount, lockPeriod });
    setIsStakeModalOpen(false);
    setStakeAmount('');
  };

  const totalStaked = mockStakingPositions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalRewards = mockStakingPositions.reduce((sum, pos) => sum + pos.rewards, 0);
  const averageApy = mockStakingPositions.reduce((sum, pos) => sum + pos.apy, 0) / mockStakingPositions.length;

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Staking Dashboard
              </h1>
              <p className="text-gray-600">
                Stake your carbon credits to earn dynamic yield rewards
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsStakeModalOpen(true)}
            >
              <Coins className="w-4 h-4 mr-2" />
              New Stake
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Coins,
                label: 'Total Staked',
                value: `${totalStaked.toLocaleString()} tokens`,
                change: '+12.5%',
                color: 'emerald',
              },
              {
                icon: TrendingUp,
                label: 'Total Rewards',
                value: formatCurrency(totalRewards),
                change: '+8.3%',
                color: 'yellow',
              },
              {
                icon: Clock,
                label: 'Average APY',
                value: formatPercentage(averageApy),
                change: '+0.5%',
                color: 'blue',
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

          {/* Active Positions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Staking Positions
            </h2>
            {mockStakingPositions.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockStakingPositions.map((position) => (
                  <StakeCard
                    key={position.id}
                    position={position}
                    onUnstake={handleUnstake}
                    onClaim={handleClaim}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Active Stakes
                </h3>
                <p className="text-gray-600 mb-6">
                  Start staking your carbon credits to earn dynamic yield rewards
                </p>
                <Button variant="primary" onClick={() => setIsStakeModalOpen(true)}>
                  Stake Now
                </Button>
              </div>
            )}
          </div>

          {/* Staking Modal */}
          <Modal
            isOpen={isStakeModalOpen}
            onClose={() => setIsStakeModalOpen(false)}
            title="Stake Carbon Credits"
            size="md"
          >
            <div className="space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Token
                </label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                >
                  {mockAvailableTokens.map((token) => (
                    <option key={token.tokenId} value={token.tokenId}>
                      {token.symbol} - {token.name} (Balance: {token.balance})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <Input
                label="Amount to Stake"
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.00"
                helperText={selectedTokenData ? `Max: ${selectedTokenData.balance} ${selectedTokenData.symbol}` : ''}
              />

              {/* Lock Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lock Period
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {lockPeriods.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setLockPeriod(period.value)}
                      className={`p-3 rounded-lg border transition-colors ${
                        lockPeriod === period.value
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-200'
                      }`}
                    >
                      <div className="font-medium">{period.label}</div>
                      <div className="text-xs text-gray-500">
                        {period.multiplier}x multiplier
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Rewards */}
              {stakeAmount && selectedTokenData && (
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-700">Estimated APY:</span>
                      <span className="font-semibold text-emerald-700">
                        {formatPercentage(estimatedApy)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-emerald-700">Lock Period:</span>
                      <span className="font-semibold text-emerald-700">
                        {selectedLockData?.label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stake Button */}
              <Button
                variant="primary"
                className="w-full"
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
              >
                <Coins className="w-4 h-4 mr-2" />
                Stake Tokens
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};