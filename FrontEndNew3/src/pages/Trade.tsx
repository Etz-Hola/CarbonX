import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, TrendingUp, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TokenCard } from '../components/feature/TokenCard';
import { Modal } from '../components/ui/Modal';
import { formatCurrency } from '../utils/format';

export const Trade: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  // Mock token data
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
    {
      tokenId: '3',
      name: 'Reforestation Initiative',
      symbol: 'RFI',
      totalSupply: 8000,
      availableSupply: 5500,
      price: 9.25,
      priceChange24h: 3.8,
      volume24h: 65000,
      marketCap: 74000,
      apy: 18.2,
      metadata: {
        name: 'Reforestation Initiative',
        description: 'Carbon credits from global reforestation projects',
        image: 'https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg',
        attributes: [],
        external_url: '',
      },
    },
  ];

  const handleTrade = (tokenId: string) => {
    setSelectedToken(tokenId);
    setIsTradeModalOpen(true);
  };

  const handleStake = (tokenId: string) => {
    // Navigate to stake page or open stake modal
    console.log('Stake token:', tokenId);
  };

  const executeTradeClick = () => {
    // Execute trade logic here
    console.log('Execute trade:', { selectedToken, tradeType, amount });
    setIsTradeModalOpen(false);
    setAmount('');
  };

  const selectedTokenData = mockTokens.find(t => t.tokenId === selectedToken);
  const estimatedTotal = selectedTokenData ? parseFloat(amount || '0') * selectedTokenData.price : 0;

  const filteredTokens = mockTokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Carbon Credit Trading
            </h1>
            <p className="text-gray-600">
              Trade fractionalized carbon credits with zero slippage
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Volume (24h)', value: formatCurrency(275000), change: '+15.2%' },
              { label: 'Active Markets', value: '12', change: '+2' },
              { label: 'Avg. APY', value: '14.8%', change: '+0.5%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search carbon credits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Token Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTokens.map((token) => (
              <TokenCard
                key={token.tokenId}
                token={token}
                onTrade={handleTrade}
                onStake={handleStake}
              />
            ))}
          </div>

          {/* Trade Modal */}
          <Modal
            isOpen={isTradeModalOpen}
            onClose={() => setIsTradeModalOpen(false)}
            title={`Trade ${selectedTokenData?.name}`}
            size="md"
          >
            <div className="space-y-6">
              {/* Trade Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Token Info */}
              {selectedTokenData && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{selectedTokenData.symbol}</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(selectedTokenData.price)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Available: {selectedTokenData.availableSupply.toLocaleString()} tokens
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div>
                <Input
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  rightIcon={
                    <span className="text-sm text-gray-500">
                      {selectedTokenData?.symbol}
                    </span>
                  }
                />
              </div>

              {/* Estimated Total */}
              {amount && selectedTokenData && (
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-700">Estimated Total:</span>
                    <span className="font-semibold text-emerald-700">
                      {formatCurrency(estimatedTotal)}
                    </span>
                  </div>
                </div>
              )}

              {/* Trade Button */}
              <Button
                variant="primary"
                className="w-full"
                onClick={executeTradeClick}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedTokenData?.symbol}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};