import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coins, TrendingUp } from 'lucide-react';
import { StakingPosition } from '../../types/contract';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/format';
import { Button } from '../ui/Button';

interface StakeCardProps {
  position: StakingPosition;
  onUnstake: (id: string) => void;
  onClaim: (id: string) => void;
}

export const StakeCard: React.FC<StakeCardProps> = ({ position, onUnstake, onClaim }) => {
  const stakingDuration = Math.floor(
    (Date.now() - position.stakingStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Staking Position #{position.id.slice(0, 8)}
          </h3>
          <p className="text-sm text-gray-600">
            Started {formatDate(position.stakingStart)}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          position.boostMultiplier > 1
            ? 'bg-gold-100 text-gold-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}>
          {position.boostMultiplier > 1 ? `${position.boostMultiplier}x Boost` : 'Standard'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-500">Staked Amount</p>
            <p className="text-sm font-semibold text-gray-900">
              {position.amount.toLocaleString()} tokens
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-500">Current APY</p>
            <p className="text-sm font-semibold text-emerald-600">
              {formatPercentage(position.apy)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-semibold text-gray-900">
              {stakingDuration} days
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-gold-600" />
          <div>
            <p className="text-xs text-gray-500">Rewards</p>
            <p className="text-sm font-semibold text-gold-600">
              {formatCurrency(position.rewards)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onClaim(position.id)}
          disabled={position.rewards === 0}
        >
          Claim Rewards
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onUnstake(position.id)}
        >
          Unstake
        </Button>
      </div>
    </motion.div>
  );
};