import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, TreePine, ArrowLeft, Share2, Info, TrendingUp, DollarSign, Clock, Check, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { CarbonCredit } from '../types/carbon';
import { formatCurrency, formatCarbonTons, formatYield } from '../utils/formatters';
import { mockCredits } from '../data/mockData';

const CreditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [credit, setCredit] = useState<CarbonCredit | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundCredit = mockCredits.find(c => c.id === id);
      if (foundCredit) {
        setCredit(foundCredit);
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (loading) {
    return (
      <div className="pt-16 md:pt-0 animate-pulse">
        <div className="mb-4 h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="rounded-lg overflow-hidden mb-8 h-96 bg-gray-200"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!credit) {
    return (
      <div className="pt-16 md:pt-0">
        <Link to="/marketplace" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace
        </Link>
        <Card className="p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Credit Not Found</h2>
          <p className="text-gray-600 mb-6">
            The carbon credit you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/marketplace">
            <Button variant="primary">Return to Marketplace</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const qualityColorMap = {
    'A+': 'bg-success-100 text-success-800',
    'A': 'bg-success-100 text-success-800',
    'B+': 'bg-lime-100 text-lime-800',
    'B': 'bg-lime-100 text-lime-800',
    'C+': 'bg-amber-100 text-amber-800',
    'C': 'bg-amber-100 text-amber-800',
    'D': 'bg-error-100 text-error-800',
  };

  const typeIconMap = {
    'reforestation': <TreePine className="h-6 w-6 text-primary-600" />,
    'avoided deforestation': <TreePine className="h-6 w-6 text-primary-600" />,
    'renewable energy': <svg className="h-6 w-6 text-accent-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    'methane capture': <svg className="h-6 w-6 text-secondary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 16.2V14.5H3V9.5H7V7.8C7 6.12 7.5 4.86 8.5 4.03C9.5 3.17 10.83 2.75 12.5 2.75C14.17 2.75 15.5 3.17 16.5 4.03C17.5 4.86 18 6.12 18 7.8V9.5H22V14.5H18V16.2C18 17.88 17.5 19.14 16.5 19.97C15.5 20.83 14.17 21.25 12.5 21.25C10.83 21.25 9.5 20.83 8.5 19.97C7.5 19.14 7 17.88 7 16.2Z" stroke="currentColor" strokeWidth="2" />
    </svg>,
    'ocean': <Globe className="h-6 w-6 text-accent-600" />,
  };

  return (
    <div className="pt-16 md:pt-0 animate-fade-in">
      <Link to="/marketplace" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Marketplace
      </Link>
      
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 mb-8 shadow-md">
        <img 
          src={credit.imageUrl} 
          alt={credit.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${qualityColorMap[credit.quality]}`}>
              Quality: {credit.quality}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-white text-xs">
              {typeIconMap[credit.type]}
              <span className="ml-1 capitalize">{credit.type}</span>
            </span>
            {credit.verified && (
              <span className="inline-flex items-center rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-medium text-success-800">
                <Check className="h-3 w-3 mr-1" /> Verified
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {credit.name}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">About This Project</h2>
            <p className="text-gray-700 mb-4">
              {credit.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Globe className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium">{credit.location.country}, {credit.location.region}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <svg className="h-5 w-5 text-gray-500 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V8H4V12M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M20 12H4M8 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-xs text-gray-500">Registry</p>
                <p className="font-medium">{credit.registry}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Clock className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-xs text-gray-500">Vintage</p>
                <p className="font-medium">{credit.vintage}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Info className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-xs text-gray-500">Methodology</p>
                <p className="font-medium">{credit.methodology}</p>
              </div>
            </div>
          </Card>
          
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
            
            <div className="bg-primary-50 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <Leaf className="h-8 w-8 text-primary-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium text-primary-900">Carbon Sequestration</h3>
                  <p className="text-sm text-primary-800">
                    This project has already sequestered {formatCarbonTons(credit.totalSupply - credit.availableSupply)} of CO₂ equivalent, with a total potential of {formatCarbonTons(credit.totalSupply)}.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">
              When you purchase carbon credits from this project, you're directly supporting:
            </p>
            
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-center">
                <div className="rounded-full bg-success-100 p-1 mr-2">
                  <Check className="h-4 w-4 text-success-600" />
                </div>
                <span>Biodiversity preservation and habitat protection</span>
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-success-100 p-1 mr-2">
                  <Check className="h-4 w-4 text-success-600" />
                </div>
                <span>Sustainable development for local communities</span>
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-success-100 p-1 mr-2">
                  <Check className="h-4 w-4 text-success-600" />
                </div>
                <span>Reduced greenhouse gas emissions and climate change mitigation</span>
              </li>
              <li className="flex items-center">
                <div className="rounded-full bg-success-100 p-1 mr-2">
                  <Check className="h-4 w-4 text-success-600" />
                </div>
                <span>Protection of natural ecosystems and resources</span>
              </li>
            </ul>
          </Card>
          
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Project Developer</h2>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {credit.projectDeveloper.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{credit.projectDeveloper}</h3>
                <p className="text-sm text-gray-500">Verified Developer</p>
              </div>
            </div>
            <p className="text-gray-700">
              {credit.projectDeveloper} is a leading carbon project developer with a focus on high-quality, verified projects that deliver real environmental and social benefits. They have been developing carbon offset projects since 2010 and have a strong track record of successful implementation.
            </p>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Purchase Carbon Credits</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Current Price</span>
                <span className="font-semibold">{formatCurrency(credit.pricePerTon)}/ton</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Available Supply</span>
                <span>{formatCarbonTons(credit.availableSupply)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Expected Yield</span>
                <span className="text-primary-600 font-semibold">{formatYield(credit.expectedYield)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Supported Chains</span>
                <div className="flex space-x-1">
                  {credit.chains.map(chain => (
                    <span key={chain} className="inline-block text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {chain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (tCO₂e)
              </label>
              <div className="flex">
                <button
                  className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-l-md text-gray-500 hover:bg-gray-100"
                  onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center border-y border-gray-300 py-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-r-md text-gray-500 hover:bg-gray-100"
                  onClick={() => setPurchaseAmount(purchaseAmount + 1)}
                >
                  +
                </button>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">Total Cost</span>
                <span className="font-semibold">{formatCurrency(credit.pricePerTon * purchaseAmount)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<ShoppingBag className="h-5 w-5" />}
              >
                Buy Carbon Credits
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth 
                leftIcon={<TrendingUp className="h-5 w-5" />}
              >
                Stake for Yield
              </Button>
              
              <button className="w-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-sm py-2">
                <Share2 className="h-4 w-4 mr-1" /> Share Project
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;