import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, Leaf, ShoppingBag, ArrowRight, ArrowUpRight } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatCard from '../components/common/StatCard';
import { formatCurrency, formatCarbonTons, formatPercent, formatCompactNumber } from '../utils/formatters';
import { useAccount } from 'wagmi';

const Dashboard = () => {
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 md:pt-0 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your carbon credits portfolio and market activity
        </p>
      </div>

      {!isConnected ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to view your dashboard and portfolio.
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={() => {
                // This will open the web3modal
                const connectButton = document.querySelector('[data-testid="web3modal-connect-button"]') as HTMLButtonElement;
                if (connectButton) connectButton.click();
              }}
              leftIcon={<Wallet className="h-5 w-5" />}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 h-32 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Portfolio Value" 
              value={formatCurrency(12450.75)}
              icon={<Wallet className="h-6 w-6" />}
              change={{
                value: 8.2,
                isPositive: true
              }}
            />
            <StatCard 
              title="Carbon Offsets" 
              value={formatCarbonTons(42.5)}
              icon={<Leaf className="h-6 w-6" />}
              change={{
                value: 12.4,
                isPositive: true
              }}
            />
            <StatCard 
              title="Yield Earnings" 
              value={formatCurrency(382.45)}
              icon={<TrendingUp className="h-6 w-6" />}
              change={{
                value: 3.8,
                isPositive: true
              }}
            />
            <StatCard 
              title="Impact Score" 
              value="87/100"
              icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L7 13.5V7.5L12 5L17 7.5V13.5L12 16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 13.5L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 13.5L3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
              change={{
                value: 5.0,
                isPositive: true
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Market Activity</h2>
                  <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                              <img src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Amazon Rainforest</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">Reforestation</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(14.25)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-success-600 text-sm">+2.4%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatCompactNumber(125000)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to="/marketplace/1" className="text-primary-600 hover:text-primary-900">View</Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                              <img src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Solar Energy Project</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-800">Renewable Energy</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(12.80)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-error-600 text-sm">-1.2%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatCompactNumber(98000)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to="/marketplace/2" className="text-primary-600 hover:text-primary-900">View</Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                              <img src="https://images.pexels.com/photos/2412944/pexels-photo-2412944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Borneo Conservation</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">Avoided Deforestation</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(18.45)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-success-600 text-sm">+3.8%</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatCompactNumber(76000)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to="/marketplace/3" className="text-primary-600 hover:text-primary-900">View</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Top Yield Opportunities</h2>
                  <Link to="/yield" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Amazon Reforestation</h3>
                      <p className="text-xs text-gray-500">Verra Certified</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-primary-600">12.4%</p>
                      <Link to="/yield">
                        <Button size="sm" variant="outline" className="mt-1">
                          Stake
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Costa Rica Conservation</h3>
                      <p className="text-xs text-gray-500">Gold Standard</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-primary-600">10.8%</p>
                      <Link to="/yield">
                        <Button size="sm" variant="outline" className="mt-1">
                          Stake
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Tidal Energy Project</h3>
                      <p className="text-xs text-gray-500">Gold Standard</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-primary-600">9.5%</p>
                      <Link to="/yield">
                        <Button size="sm" variant="outline" className="mt-1">
                          Stake
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mb-6">
            <Card className="bg-gradient-to-r from-primary-600 to-primary-800 text-white border-none shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Your Environmental Impact</h2>
                  <p className="opacity-90 max-w-xl">
                    Your carbon offset portfolio has helped remove 42.5 tons of CO₂, equivalent to planting 1,275 trees.
                  </p>
                </div>
                <Link to="/impact">
                  <Button 
                    className="bg-white text-primary-700 hover:bg-gray-100"
                    rightIcon={<ArrowUpRight className="h-4 w-4" />}
                  >
                    View Impact Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Latest Transactions</h2>
                <Link to="/portfolio" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-primary-600" />
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
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
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
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-primary-600" />
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
              </div>
            </Card>
            
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Market Insights</h2>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Total Market Volume</p>
                    <p className="text-lg font-semibold">{formatCurrency(4250000)}</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-success-600">+12.5% this week</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Average Carbon Price</p>
                    <p className="text-lg font-semibold">{formatCurrency(15.42)}/ton</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-success-600">+3.8% this week</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Carbon Credit Price Forecast</p>
                  <div className="flex items-center">
                    <div className="flex-1 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-error-500"></div>
                        <div style={{ width: "40%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-warning-500"></div>
                        <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success-500"></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs font-semibold text-error-600">{formatCurrency(10)}</span>
                        <span className="text-xs font-semibold text-warning-600">{formatCurrency(20)}</span>
                        <span className="text-xs font-semibold text-success-600">{formatCurrency(30)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Analysts predict a 15-25% increase in carbon prices by Q4 2025
                  </p>
                </div>
                
                <Link to="/marketplace">
                  <Button variant="outline" fullWidth>Explore Market Trends</Button>
                </Link>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;