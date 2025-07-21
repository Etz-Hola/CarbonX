import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Leaf } from 'lucide-react';
import { FractionalToken } from '../../types/token';
import { formatCurrency, formatPercentage } from '../../utils/format';
import { Button } from '../ui/Button';

interface TokenCardProps {
  token: FractionalToken;
  onTrade: (tokenId: string) => void;
  onStake: (tokenId: string) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, onTrade, onStake }) => {
  const isPriceUp = token.priceChange24h > 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{token.name}</h3>
            <p className="text-sm text-gray-500">{token.symbol}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPriceUp 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isPriceUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {formatPercentage(Math.abs(token.priceChange24h))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Price</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(token.price)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">APY</p>
          <p className="text-lg font-semibold text-emerald-600">
            {formatPercentage(token.apy)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Available</p>
          <p className="text-sm font-medium text-gray-700">
            {token.availableSupply.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Volume 24h</p>
          <p className="text-sm font-medium text-gray-700">
            {formatCurrency(token.volume24h)}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onTrade(token.tokenId)}
        >
          Trade
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onStake(token.tokenId)}
        >
          Stake
        </Button>
      </div>
    </motion.div>
  );
};