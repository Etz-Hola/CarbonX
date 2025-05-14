import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, TrendingUp, ArrowUpRight, MoreHorizontal, BarChart3, ListFilter } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAccount } from 'wagmi';
import { formatCurrency, formatCarbonTons, formatDate } from '../utils/formatters';
import { mockPortfolio } from '../data/mockData';

const Portfolio = () => {
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [view, setView] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isConnected) {
    return (
      <div className="pt-16 md:pt-0 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your carbon credit holdings
          </p>
        </div>
        
        <Card className="py-12 text-center">
          <div className="flex justify-center mb-4">
            <PieChart className="h-16 w-16 text-primary-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Connect your wallet to view your carbon credit portfolio and track your environmental impact.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              // This will open the web3modal
              const connectButton = document.querySelector('[data-testid="web3modal-connect-button"]') as HTMLButtonElement;
              if (connectButton) connectButton.click();
            }}
          >
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-0 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your carbon credit holdings
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button
            className={`p-2 rounded-md ${view === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <BarChart3 className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-md ${view === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <ListFilter className="h-5 w-5" />
          </button>
          <Link to="/marketplace">
            <Button variant="primary">Buy Carbon Credits</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md h-40 p-6">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <h2 className="text-sm font-medium text-gray-500">Total Portfolio Value</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(portfolio.totalValue)}</p>
            <div className="mt-2 flex items-center text-success-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span>+8.2% this month</span>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-gray-500">Total Carbon Offset</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCarbonTons(portfolio.carbonOffset)}</p>
            <div className="mt-2 text-gray-500 text-sm">
              Equivalent to planting 1,275 trees
            </div>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-gray-500">Yield Earned</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(portfolio.yieldEarned)}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-gray-500 text-sm">8.4% avg APY</span>
              <Link to="/yield" className="text-primary-600 text-sm flex items-center">
                Farming <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </Link>
            </div>
          </Card>
        </div>
      )}

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Carbon Credits</h2>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<TrendingUp className="h-4 w-4" />}
          >
            Stake Holdings
          </Button>
        </div>

        {loading ? (
          view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-200 rounded mb-2"></div>
              ))}
            </div>
          )
        ) : portfolio.holdings.length === 0 ? (
          <div className="text-center py-12">
            <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Carbon Credits</h3>
            <p className="text-gray-500 mb-4">
              You don't own any carbon credits yet.
            </p>
            <Link to="/marketplace">
              <Button variant="primary">Browse Marketplace</Button>
            </Link>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.holdings.map((holding) => (
              <div key={holding.creditId} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img src={holding.imageUrl} alt={holding.creditName} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{holding.creditName}</h3>
                    <p className="text-xs text-gray-500">{holding.chain}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-medium">{formatCarbonTons(holding.amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Value</p>
                    <p className="font-medium">{formatCurrency(holding.value)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Purchased</p>
                    <p className="font-medium">{formatDate(holding.purchaseDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price Change</p>
                    <p className={`font-medium ${
                      holding.currentPrice > holding.averagePurchasePrice 
                        ? 'text-success-600' 
                        : holding.currentPrice < holding.averagePurchasePrice 
                        ? 'text-error-600' 
                        : ''
                    }`}>
                      {((holding.currentPrice / holding.averagePurchasePrice - 1) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Link to={`/marketplace/${holding.creditId}`}>
                    <Button size="sm" variant="outline">View Details</Button>
                  </Link>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 rounded-t-lg text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Credit</div>
              <div>Amount</div>
              <div>Value</div>
              <div>Price Change</div>
              <div></div>
            </div>
            <div className="space-y-2 mt-2">
              {portfolio.holdings.map((holding) => (
                <div key={holding.creditId} className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg items-center">
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img src={holding.imageUrl} alt={holding.creditName} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{holding.creditName}</h3>
                        <p className="text-xs text-gray-500">{holding.chain}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{formatCarbonTons(holding.amount)}</p>
                    <p className="text-xs text-gray-500 md:hidden">Amount</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{formatCurrency(holding.value)}</p>
                    <p className="text-xs text-gray-500 md:hidden">Value</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      holding.currentPrice > holding.averagePurchasePrice 
                        ? 'text-success-600' 
                        : holding.currentPrice < holding.averagePurchasePrice 
                        ? 'text-error-600' 
                        : ''
                    }`}>
                      {((holding.currentPrice / holding.averagePurchasePrice - 1) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500 md:hidden">Price Change</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Link to={`/marketplace/${holding.creditId}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Purchase Amazon Rainforest Credits</p>
                    <p className="text-xs text-gray-500">June 18, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">+2.5 tCO₂e</p>
                  <p className="text-xs text-gray-500">{formatCurrency(35.62)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-accent-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-accent-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Yield Farming Reward</p>
                    <p className="text-xs text-gray-500">June 15, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">+{formatCurrency(12.45)}</p>
                  <p className="text-xs text-gray-500">CBNX Tokens</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Purchase Solar Energy Credits</p>
                    <p className="text-xs text-gray-500">June 12, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">+1.8 tCO₂e</p>
                  <p className="text-xs text-gray-500">{formatCurrency(23.04)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-secondary-100 rounded-full">
                    <svg className="h-5 w-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Bridge Credits to Polygon</p>
                    <p className="text-xs text-gray-500">June 8, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">5.0 tCO₂e</p>
                  <p className="text-xs text-gray-500">ETH → Polygon</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Purchase Borneo Conservation Credits</p>
                    <p className="text-xs text-gray-500">June 5, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">+8.5 tCO₂e</p>
                  <p className="text-xs text-gray-500">{formatCurrency(156.83)}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center pb-8">
                <svg viewBox="0 0 200 200" width="200" height="200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="30" />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#4caf50" 
                    strokeWidth="30" 
                    strokeDasharray={2 * Math.PI * 80 * 0.36} 
                    strokeDashoffset={2 * Math.PI * 80 * 0.75}
                    transform="rotate(-90 100 100)"
                  />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#03a9f4" 
                    strokeWidth="30" 
                    strokeDasharray={2 * Math.PI * 80 * 0.25} 
                    strokeDashoffset={2 * Math.PI * 80 * 0.39}
                    transform="rotate(-90 100 100)"
                  />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#795548" 
                    strokeWidth="30" 
                    strokeDasharray={2 * Math.PI * 80 * 0.20} 
                    strokeDashoffset={2 * Math.PI * 80 * 0.14}
                    transform="rotate(-90 100 100)"
                  />
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#ff5722" 
                    strokeWidth="30" 
                    strokeDasharray={2 * Math.PI * 80 * 0.19} 
                    strokeDashoffset={2 * Math.PI * 80 * -0.06}
                    transform="rotate(-90 100 100)"
                  />
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#1f2937" fontSize="24" fontWeight="bold">
                    {portfolio.totalCredits} tCO₂e
                  </text>
                </svg>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Reforestation</p>
                    <p className="text-xs text-gray-500">36%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-accent-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Renewable Energy</p>
                    <p className="text-xs text-gray-500">25%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-secondary-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Conservation</p>
                    <p className="text-xs text-gray-500">20%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-highlight-500 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Ocean Credits</p>
                    <p className="text-xs text-gray-500">19%</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                We recommend diversifying your portfolio to include different types of carbon credits for maximum environmental impact.
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;