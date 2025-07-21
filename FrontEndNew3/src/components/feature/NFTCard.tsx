import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { Achievement } from '../../types/user';
import { formatDate } from '../../utils/format';

interface NFTCardProps {
  achievement: Achievement;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600',
};

const rarityBorders = {
  common: 'border-gray-300',
  rare: 'border-blue-300',
  epic: 'border-purple-300',
  legendary: 'border-yellow-300',
};

export const NFTCard: React.FC<NFTCardProps> = ({ achievement }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white rounded-xl border-2 ${rarityBorders[achievement.rarity]} p-4 shadow-sm hover:shadow-lg transition-shadow`}
    >
      <div className="relative mb-3">
        <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${rarityColors[achievement.rarity]} rounded-full flex items-center justify-center`}>
          <Award className="w-8 h-8 text-white" />
        </div>
        {achievement.boostPercentage > 0 && (
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            +{achievement.boostPercentage}%
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{achievement.name}</h3>
        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
        
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {formatDate(achievement.unlockedAt)}
        </div>

        <div className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${
          achievement.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
          achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
          achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {achievement.rarity}
        </div>
      </div>
    </motion.div>
  );
};