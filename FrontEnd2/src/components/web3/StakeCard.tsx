import React, { useState } from 'react';
import { StakingPosition } from '../../types/contract';
import { formatCurrency, formatNumber, formatTimeAgo } from '../../utils/format';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { TrendingUp, Clock, DollarSign, Award } from 'lucide-react';

interface StakeCardProps {
  position: StakingPosition;
  onStake?: (amount: number) => void;
  onUnstake?: (amount: number) => void;
  onClaimRewards?: () => void;
  isLoading?: boolean;
}

const StakeCard: React.FC<StakeCardProps> = ({
  position,
  onStake,
  onUnstake,
  onClaimRewards,
  isLoading = false,
}) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (amount > 0) {
      onStake?.(amount);
      setStakeAmount('');
      setShowStakeModal(false);
    }
  };

  const handleUnstake = () => {
    const amount = parseFloat(unstakeAmount);
    if (amount > 0 && amount <= position.amount) {
      onUnstake?.(amount);
      setUnstakeAmount('');
      setShowUnstakeModal(false);
    }
  };

  const stakingDuration = Date.now() - position.stakingStartTime;
  const stakingDays = Math.floor(stakingDuration / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Carbon Credit #{position.tokenId}
            </h3>
            <p className="text-sm text-gray-600">
              {position.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(position.apy, 1)}%
          </p>
          <p className="text-sm text-gray-600">APY</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Staked Amount</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">
            {formatNumber(position.amount)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Rewards</span>
          </div>
          <p className="text-xl font-semibold text-green-600">
            {formatCurrency(position.currentRewards)}
          </p>
        </div>
      </div>

      {/* Duration Info */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-900">Staking Duration</span>
        </div>
        <p className="text-lg font-semibold text-blue-900">
          {stakingDays} days
        </p>
        <p className="text-sm text-blue-700">
          Started {formatTimeAgo(new Date(position.stakingStartTime))}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button
            onClick={() => setShowStakeModal(true)}
            className="flex-1"
            loading={isLoading}
          >
            Stake More
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowUnstakeModal(true)}
            className="flex-1"
            disabled={!position.isActive || position.amount === 0}
            loading={isLoading}
          >
            Unstake
          </Button>
        </div>

        <Button
          variant="secondary"
          onClick={onClaimRewards}
          fullWidth
          disabled={parseFloat(position.currentRewards) === 0}
          loading={isLoading}
        >
          Claim Rewards ({formatCurrency(position.currentRewards)})
        </Button>
      </div>

      {/* Stake Modal */}
      <Modal
        isOpen={showStakeModal}
        onClose={() => setShowStakeModal(false)}
        title="Stake Tokens"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Add more tokens to your staking position to increase your rewards.
          </p>
          
          <Input
            label="Amount to Stake"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="0.0"
            helpText="Enter the amount of tokens you want to stake"
          />

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowStakeModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStake}
              className="flex-1"
              disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
            >
              Stake
            </Button>
          </div>
        </div>
      </Modal>

      {/* Unstake Modal */}
      <Modal
        isOpen={showUnstakeModal}
        onClose={() => setShowUnstakeModal(false)}
        title="Unstake Tokens"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Remove tokens from your staking position. You can unstake up to {formatNumber(position.amount)} tokens.
          </p>
          
          <Input
            label="Amount to Unstake"
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            placeholder="0.0"
            helpText={`Maximum: ${formatNumber(position.amount)} tokens`}
          />

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowUnstakeModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUnstake}
              className="flex-1"
              disabled={
                !unstakeAmount ||
                parseFloat(unstakeAmount) <= 0 ||
                parseFloat(unstakeAmount) > position.amount
              }
            >
              Unstake
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StakeCard;