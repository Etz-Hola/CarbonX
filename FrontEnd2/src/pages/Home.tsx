import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { TrendingUp, DollarSign, Award, Leaf, ArrowRight, BarChart3 } from 'lucide-react';
import Button from '../components/common/Button';
import { formatCurrency, formatNumber, formatCarbonOffset } from '../utils/format';

const Home: React.FC = () => {
  const { user, portfolio } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to CarbonX
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please connect your wallet to access the dashboard
          </p>
          {/* <p className="text-lg text-gray-600 mb-8">
            Please connect your wallet to access the dashboard
          </p> */}
          <Link to="/">
            <Button size="lg">Connect Wallet</Button>
          </Link>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Trade Credits',
      description: 'Buy and sell fractionalized carbon credits',
      icon: <TrendingUp className="w-8 h-8" />,
      href: '/trade',
      color: 'bg-green-600',
    },
    {
      title: 'Stake Tokens',
      description: 'Earn yield rewards by staking your credits',
      icon: <DollarSign className="w-8 h-8" />,
      href: '/stake',
      color: 'bg-blue-600',
    },
    {
      title: 'View Impact',
      description: 'Track real-world environmental impact',
      icon: <Leaf className="w-8 h-8" />,
      href: '/impact',
      color: 'bg-green-500',
    },
    {
      title: 'Leaderboard',
      description: 'See your ranking among other traders',
      icon: <Award className="w-8 h-8" />,
      href: '/leaderboard',
      color: 'bg-purple-600',
    },
  ];

  const recentActivity = [
    {
      type: 'trade',
      title: 'Bought 100 carbon credits',
      time: '2 hours ago',
      amount: '+$2,500',
      positive: true,
    },
    {
      type: 'stake',
      title: 'Staked 50 credits',
      time: '1 day ago',
      amount: '+12.5% APY',
      positive: true,
    },
    {
      type: 'reward',
      title: 'Earned staking rewards',
      time: '2 days ago',
      amount: '+$125.50',
      positive: true,
    },
    {
      type: 'achievement',
      title: 'Unlocked "Tree Planter" NFT',
      time: '3 days ago',
      amount: '+1% yield boost',
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.displayName}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your carbon investments
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  #{user.leaderboardRank}
                </div>
                <div className="text-sm text-gray-600">Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolio?.totalValue || '0')}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">+12.5%</span>
              <span className="text-sm text-gray-600 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Carbon Offset</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCarbonOffset(user.totalCarbonOffset)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600">+2.3 tons</span>
              <span className="text-sm text-gray-600 ml-2">this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Staked Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(user.totalStaked)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-blue-600">12.5% APY</span>
              <span className="text-sm text-gray-600 ml-2">current rate</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolio?.achievements.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-purple-600">+{portfolio?.achievements.reduce((sum, a) => sum + a.yieldBoost, 0) || 0}%</span>
              <span className="text-sm text-gray-600 ml-2">yield boost</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Portfolio Overview
                </h2>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              
              {portfolio?.holdings.slice(0, 3).map((holding, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Credit #{holding.creditId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatNumber(holding.amount)} tokens
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(holding.currentValue)}
                    </p>
                    <p className={`text-sm ${holding.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.profitLossPercentage >= 0 ? '+' : ''}{holding.profitLossPercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${activity.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" fullWidth>
                    View All Activity
                  </Button>
                </Link>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Market Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Price</span>
                  <span className="text-sm font-medium text-gray-900">$25.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h Volume</span>
                  <span className="text-sm font-medium text-gray-900">$125,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Market Cap</span>
                  <span className="text-sm font-medium text-gray-900">$2.1M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Credits</span>
                  <span className="text-sm font-medium text-gray-900">84,000</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/trade">
                  <Button size="sm" fullWidth>
                    View Market
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;