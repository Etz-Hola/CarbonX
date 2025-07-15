import React from 'react';
import { Achievement } from '../../types/contract';
import { formatDate } from '../../utils/format';
import { getColorFromRarity } from '../../utils/helpers';
import { Award, Star, TrendingUp } from 'lucide-react';

interface NFTCardProps {
  achievement: Achievement;
  showDetails?: boolean;
  onViewDetails?: (achievementId: string) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({
  achievement,
  showDetails = false,
  onViewDetails,
}) => {
  const rarityColor = getColorFromRarity(achievement.rarity);
  
  const rarityLabels = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={() => onViewDetails?.(achievement.id)}
    >
      {/* NFT Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {achievement.imageUrl ? (
          <img
            src={achievement.imageUrl}
            alt={achievement.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Award className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Rarity Badge */}
        <div 
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: rarityColor }}
        >
          {rarityLabels[achievement.rarity]}
        </div>

        {/* Yield Boost Badge */}
        {achievement.yieldBoost > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{achievement.yieldBoost}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {achievement.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">NFT</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {achievement.description}
        </p>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Earned</span>
            <span className="text-sm font-medium text-gray-900">
              {formatDate(achievement.earnedAt)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Token ID</span>
            <span className="text-sm font-medium text-gray-900">
              #{achievement.tokenId}
            </span>
          </div>

          {achievement.yieldBoost > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Yield Boost</span>
              <span className="text-sm font-medium text-green-600">
                +{achievement.yieldBoost}%
              </span>
            </div>
          )}
        </div>

        {/* Rarity Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Rarity</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: rarityColor }}
              />
              <span 
                className="text-sm font-medium capitalize"
                style={{ color: rarityColor }}
              >
                {rarityLabels[achievement.rarity]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;