import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import { CONTRACT_ADDRESSES } from '../utils/constants';
import { toast } from '../components/ui/Toast';

// Mock ABI - replace with actual contract ABIs
const FRACTIONALIZER_ABI = [
  {
    name: 'fractionalize',
    type: 'function',
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'getTokenInfo',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      { name: 'totalSupply', type: 'uint256' },
      { name: 'availableSupply', type: 'uint256' },
      { name: 'price', type: 'uint256' }
    ],
    stateMutability: 'view'
  }
];

const YIELD_ENGINE_ABI = [
  {
    name: 'stake',
    type: 'function',
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'lockPeriod', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'unstake',
    type: 'function',
    inputs: [{ name: 'positionId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'claimRewards',
    type: 'function',
    inputs: [{ name: 'positionId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  }
];

export const useContract = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Fractionalizer contract functions
  const { data: tokenInfo, isLoading: tokenInfoLoading } = useContractRead({
    address: CONTRACT_ADDRESSES.FRACTIONALIZER,
    abi: FRACTIONALIZER_ABI,
    functionName: 'getTokenInfo',
    args: [1], // Example token ID
  });

  const { write: fractionalize, data: fractionalizeData } = useContractWrite({
    address: CONTRACT_ADDRESSES.FRACTIONALIZER,
    abi: FRACTIONALIZER_ABI,
    functionName: 'fractionalize',
    onSuccess() {
      toast.success('Fractionalization initiated!');
    },
    onError(error) {
      toast.error(`Fractionalization failed: ${error.message}`);
    },
  });

  // Yield Engine contract functions
  const { write: stake, data: stakeData } = useContractWrite({
    address: CONTRACT_ADDRESSES.YIELD_ENGINE,
    abi: YIELD_ENGINE_ABI,
    functionName: 'stake',
    onSuccess() {
      toast.success('Staking successful!');
    },
    onError(error) {
      toast.error(`Staking failed: ${error.message}`);
    },
  });

  const { write: unstake, data: unstakeData } = useContractWrite({
    address: CONTRACT_ADDRESSES.YIELD_ENGINE,
    abi: YIELD_ENGINE_ABI,
    functionName: 'unstake',
    onSuccess() {
      toast.success('Unstaking successful!');
    },
    onError(error) {
      toast.error(`Unstaking failed: ${error.message}`);
    },
  });

  const { write: claimRewards, data: claimData } = useContractWrite({
    address: CONTRACT_ADDRESSES.YIELD_ENGINE,
    abi: YIELD_ENGINE_ABI,
    functionName: 'claimRewards',
    onSuccess() {
      toast.success('Rewards claimed!');
    },
    onError(error) {
      toast.error(`Claiming failed: ${error.message}`);
    },
  });

  // Transaction status hooks
  const { isLoading: fractionalizeLoading } = useWaitForTransaction({
    hash: fractionalizeData?.hash,
  });

  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
  });

  const { isLoading: unstakeLoading } = useWaitForTransaction({
    hash: unstakeData?.hash,
  });

  const { isLoading: claimLoading } = useWaitForTransaction({
    hash: claimData?.hash,
  });

  // Helper functions
  const fractionalizeToken = async (tokenId: string, amount: number) => {
    setIsLoading(true);
    try {
      await fractionalize({
        args: [BigInt(tokenId), BigInt(amount)]
      });
    } catch (error) {
      console.error('Fractionalize error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stakeTokens = async (tokenId: string, amount: number, lockPeriod: number) => {
    setIsLoading(true);
    try {
      await stake({
        args: [BigInt(tokenId), BigInt(amount), BigInt(lockPeriod)]
      });
    } catch (error) {
      console.error('Stake error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const unstakeTokens = async (positionId: string) => {
    setIsLoading(true);
    try {
      await unstake({
        args: [BigInt(positionId)]
      });
    } catch (error) {
      console.error('Unstake error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const claimStakingRewards = async (positionId: string) => {
    setIsLoading(true);
    try {
      await claimRewards({
        args: [BigInt(positionId)]
      });
    } catch (error) {
      console.error('Claim error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    tokenInfo,
    
    // Loading states
    isLoading: isLoading || fractionalizeLoading || stakeLoading || unstakeLoading || claimLoading,
    tokenInfoLoading,
    
    // Functions
    fractionalizeToken,
    stakeTokens,
    unstakeTokens,
    claimStakingRewards,
  };
};