import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { CarbonCredit } from '../types/contract';
import TokenCard from '../components/web3/TokenCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { formatCurrency } from '../utils/format';

const Trade: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  // Mock data - in real app, this would come from your API
  const mockCredits: CarbonCredit[] = [
    {
      id: '1',
      tokenId: 1,
      totalSupply: 10000,
      availableSupply: 7500,
      pricePerToken: '25.00',
      verified: true,
      registry: 'Verra',
      location: 'Amazon Rainforest, Brazil',
      vintageYear: 2024,
      methodology: 'Afforestation and Reforestation',
      issuanceDate: '2024-01-15',
      imageUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: '2',
      tokenId: 2,
      totalSupply: 8000,
      availableSupply: 3200,
      pricePerToken: '32.50',
      verified: true,
      registry: 'Gold Standard',
      location: 'Kenya',
      vintageYear: 2023,
      methodology: 'Renewable Energy',
      issuanceDate: '2023-08-20',
      imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      id: '3',
      tokenId: 3,
      totalSupply: 12000,
      availableSupply: 9800,
      pricePerToken: '18.75',
      verified: true,
      registry: 'ACR',
      location: 'California, USA',
      vintageYear: 2024,
      methodology: 'Forest Carbon Management',
      issuanceDate: '2024-03-10',
      imageUrl: 'https://images.pexels.com/photos/1888883/pexels-photo-1888883.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
  ];

  const filteredCredits = mockCredits.filter(credit =>
    credit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credit.methodology.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credit.registry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrade = (creditId: string) => {
    const credit = mockCredits.find(c => c.id === creditId);
    if (credit) {
      setSelectedCredit(credit);
      setShowTradeModal(true);
    }
  };

  const handleTradeSubmit = () => {
    // Handle trade submission logic here
    console.log('Trade submitted:', {
      creditId: selectedCredit?.id,
      amount: tradeAmount,
      type: tradeType,
    });
    setShowTradeModal(false);
    setTradeAmount('');
    setSelectedCredit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Carbon Credit Trading
          </h1>
          <p className="text-gray-600">
            Trade fractionalized carbon credits from verified environmental projects
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">$2.1M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">+12.5%</span>
              <span className="text-sm text-gray-600 ml-2">24h</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Price</p>
                <p className="text-2xl font-bold text-gray-900">$25.42</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">+3.2%</span>
              <span className="text-sm text-gray-600 ml-2">24h</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">84,500</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">-1.8%</span>
              <span className="text-sm text-gray-600 ml-2">24h</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Traders</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">+8.3%</span>
              <span className="text-sm text-gray-600 ml-2">24h</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search by location, methodology, or registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-5 h-5" />}>
            Filters
          </Button>
        </div>

        {/* Credits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredits.map((credit) => (
            <TokenCard
              key={credit.id}
              credit={credit}
              onTrade={handleTrade}
              onViewDetails={(id) => console.log('View details for:', id)}
            />
          ))}
        </div>

        {/* Trade Modal */}
        <Modal
          isOpen={showTradeModal}
          onClose={() => setShowTradeModal(false)}
          title={`Trade Credit #${selectedCredit?.id}`}
          size="lg"
        >
          {selectedCredit && (
            <div className="space-y-6">
              {/* Credit Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedCredit.methodology}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedCredit.location} • {selectedCredit.registry}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedCredit.pricePerToken)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedCredit.availableSupply} available
                  </span>
                </div>
              </div>

              {/* Trade Type */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Trade Amount */}
              <Input
                label="Amount"
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                placeholder="0.0"
                helpText={`Max: ${selectedCredit.availableSupply} tokens`}
              />

              {/* Trade Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Trade Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{tradeAmount || '0'} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per token:</span>
                    <span className="font-medium">{formatCurrency(selectedCredit.pricePerToken)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trading fee (0.3%):</span>
                    <span className="font-medium">
                      {formatCurrency(((parseFloat(tradeAmount) || 0) * parseFloat(selectedCredit.pricePerToken) * 0.003).toString())}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      {formatCurrency(((parseFloat(tradeAmount) || 0) * parseFloat(selectedCredit.pricePerToken) * 1.003).toString())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTradeSubmit}
                  className="flex-1"
                  disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
                >
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} Tokens
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Trade;