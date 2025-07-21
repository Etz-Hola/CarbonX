import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Coins,
  MapPin,
  Trophy,
  FileX,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { state } = useAppContext();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Trade', path: '/trade' },
    { icon: Coins, label: 'Stake', path: '/stake' },
    { icon: MapPin, label: 'Impact', path: '/impact' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: FileX, label: 'Retirement', path: '/retirement' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!state.user) return null;

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  isActive(item.path) ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'
                }`}
              />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 pt-4 border-t border-gray-200">
          <Link
            to="/settings"
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/settings')
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            <Settings className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-emerald-500" />
            Settings
          </Link>
          
          <button className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};