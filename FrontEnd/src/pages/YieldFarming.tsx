import React, { useState } from 'react';
import { useAccount } from 'wagmi';

const YieldFarming: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [selectedPool, setSelectedPool] = useState<string>('');

  const farmingPools = [
    {
      id: 'pool1',
      name: 'CarbonX-USDC LP',
      apr: '12.5%',
      tvl: '$1.2M',
      staked: '0.0',
      rewards: '0.0',
    },
    {
      id: 'pool2',
      name: 'CarbonX-ETH LP',
      apr: '15.8%',
      tvl: '$2.5M',
      staked: '0.0',
      rewards: '0.0',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Yield Farming</h1>
      
      {!isConnected ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            Please connect your wallet to start farming
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {farmingPools.map((pool) => (
            <div
              key={pool.id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4">{pool.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">APR</p>
                  <p className="text-lg font-semibold">{pool.apr}</p>
                </div>
                <div>
                  <p className="text-gray-600">TVL</p>
                  <p className="text-lg font-semibold">{pool.tvl}</p>
                </div>
                <div>
                  <p className="text-gray-600">Your Stake</p>
                  <p className="text-lg font-semibold">{pool.staked}</p>
                </div>
                <div>
                  <p className="text-gray-600">Rewards</p>
                  <p className="text-lg font-semibold">{pool.rewards}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                  onClick={() => setSelectedPool(pool.id)}
                >
                  Stake
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setSelectedPool(pool.id)}
                >
                  Harvest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YieldFarming;
