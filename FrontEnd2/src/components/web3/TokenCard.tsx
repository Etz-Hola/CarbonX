import React from 'react';
import { CarbonCredit } from '../../types/contract';
import { formatCurrency, formatNumber, formatDate } from '../../utils/format';
import Button from '../common/Button';
import { Badge } from '@headlessui/react';
import { MapPin, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

interface TokenCardProps {
  credit: CarbonCredit;
  showActions?: boolean;
  onTrade?: (creditId: string) => void;
  onViewDetails?: (creditId: string) => void;
}

const TokenCard: React.FC<TokenCardProps> = ({
  credit,
  showActions = true,
  onTrade,
  onViewDetails,
}) => {
  const availabilityPercentage = (credit.availableSupply / credit.totalSupply) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600">
        {credit.imageUrl ? (
          <img
            src={credit.imageUrl}
            alt={`Carbon credit ${credit.id}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-lg font-semibold">Carbon Credit</p>
            </div>
          </div>
        )}
        
        {/* Verification Badge */}
        {credit.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Basic Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Credit #{credit.id}
            </h3>
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(credit.pricePerToken)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {credit.methodology}
          </p>
        </div>

        {/* Location and Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{credit.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{credit.vintageYear}</span>
          </div>
        </div>

        {/* Supply Info */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Available Supply</span>
            <span className="text-sm font-medium text-gray-900">
              {formatNumber(credit.availableSupply)} / {formatNumber(credit.totalSupply)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {availabilityPercentage.toFixed(1)}% available
          </p>
        </div>

        {/* Registry Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Registry</span>
            <span className="text-sm font-medium text-gray-900">
              {credit.registry}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Issuance Date</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(credit.issuanceDate)}
            </span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3">
            <Button
              onClick={() => onTrade?.(credit.id)}
              className="flex-1"
              disabled={credit.availableSupply === 0}
            >
              {credit.availableSupply === 0 ? 'Sold Out' : 'Trade'}
            </Button>
            <Button
              variant="outline"
              onClick={() => onViewDetails?.(credit.id)}
              className="flex-1"
            >
              Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCard;