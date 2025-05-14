import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import Button from '../components/common/Button';
import { CarbonCredit } from '../types/carbon';
import CarbonCreditCard from '../components/carbon/CarbonCreditCard';

// Mock data for demonstration
const mockCredits: CarbonCredit[] = [
  {
    id: '1',
    name: 'Amazon Rainforest Conservation Project',
    description: 'Protecting the Amazon rainforest from deforestation and promoting sustainable development for local communities.',
    type: 'avoided deforestation',
    location: {
      country: 'Brazil',
      region: 'Amazon Basin',
      coordinates: {
        lat: -3.4653,
        lng: -62.2159
      }
    },
    vintage: 2024,
    totalSupply: 100000,
    availableSupply: 75000,
    pricePerTon: 14.25,
    quality: 'A+',
    registry: 'Verra',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'Rainforest Trust',
    methodology: 'VM0015',
    expectedYield: 8.5,
    chains: ['Ethereum', 'Polygon']
  },
  {
    id: '2',
    name: 'Solar Energy Project India',
    description: 'Large-scale solar energy installation in rural India, providing clean electricity and reducing dependence on fossil fuels.',
    type: 'renewable energy',
    location: {
      country: 'India',
      region: 'Rajasthan',
      coordinates: {
        lat: 27.0238,
        lng: 74.2179
      }
    },
    vintage: 2023,
    totalSupply: 80000,
    availableSupply: 45000,
    pricePerTon: 12.8,
    quality: 'A',
    registry: 'Gold Standard',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'SunPower Solutions',
    methodology: 'GS-RE-FM-1',
    expectedYield: 7.2,
    chains: ['Ethereum', 'Arbitrum']
  },
  {
    id: '3',
    name: 'Borneo Peatland Conservation',
    description: 'Conserving critical peatland ecosystems in Borneo while supporting sustainable livelihoods for indigenous communities.',
    type: 'avoided deforestation',
    location: {
      country: 'Indonesia',
      region: 'Borneo',
      coordinates: {
        lat: 0.9619,
        lng: 114.5548
      }
    },
    vintage: 2024,
    totalSupply: 120000,
    availableSupply: 98000,
    pricePerTon: 18.45,
    quality: 'A',
    registry: 'Verra',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/2412944/pexels-photo-2412944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'Asia Conservation Trust',
    methodology: 'VM0007',
    expectedYield: 10.3,
    chains: ['Ethereum', 'Polygon']
  },
  {
    id: '4',
    name: 'Costa Rica Reforestation Initiative',
    description: 'Reforesting degraded farmland in Costa Rica to create biodiversity corridors and capture carbon.',
    type: 'reforestation',
    location: {
      country: 'Costa Rica',
      region: 'Guanacaste',
      coordinates: {
        lat: 10.2751,
        lng: -85.5801
      }
    },
    vintage: 2023,
    totalSupply: 60000,
    availableSupply: 32000,
    pricePerTon: 16.9,
    quality: 'A',
    registry: 'Gold Standard',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/3608579/pexels-photo-3608579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'Reforest Action',
    methodology: 'GS-AR-FM-1',
    expectedYield: 9.1,
    chains: ['Ethereum', 'Base']
  },
  {
    id: '5',
    name: 'Wind Farm Project Scotland',
    description: 'Offshore wind energy generation along the Scottish coast, providing clean energy to local communities.',
    type: 'renewable energy',
    location: {
      country: 'United Kingdom',
      region: 'Scotland',
      coordinates: {
        lat: 56.4907,
        lng: -2.9976
      }
    },
    vintage: 2024,
    totalSupply: 90000,
    availableSupply: 75000,
    pricePerTon: 13.5,
    quality: 'B+',
    registry: 'Gold Standard',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/2908895/pexels-photo-2908895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'WindPower UK',
    methodology: 'GS-RE-FM-2',
    expectedYield: 6.8,
    chains: ['Ethereum', 'Arbitrum']
  },
  {
    id: '6',
    name: 'Mangrove Restoration Southeast Asia',
    description: 'Restoring critical mangrove ecosystems in Thailand to protect coastlines and capture blue carbon.',
    type: 'reforestation',
    location: {
      country: 'Thailand',
      region: 'Phang Nga',
      coordinates: {
        lat: 8.4519,
        lng: 98.5257
      }
    },
    vintage: 2023,
    totalSupply: 50000,
    availableSupply: 28000,
    pricePerTon: 19.8,
    quality: 'A+',
    registry: 'Verra',
    verified: true,
    imageUrl: 'https://images.pexels.com/photos/5234638/pexels-photo-5234638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    projectDeveloper: 'Ocean Conservancy',
    methodology: 'VM0033',
    expectedYield: 11.2,
    chains: ['Ethereum', 'Polygon', 'Base']
  },
];

const Marketplace = () => {
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    quality: '',
    registry: '',
    priceRange: [0, 50],
    chain: '',
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCredits(mockCredits);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          credit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          credit.location.country.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesType = filters.type === '' || credit.type === filters.type;
    const matchesQuality = filters.quality === '' || credit.quality === filters.quality;
    const matchesRegistry = filters.registry === '' || credit.registry === filters.registry;
    const matchesChain = filters.chain === '' || credit.chains.includes(filters.chain as any);
    
    return matchesSearch && matchesType && matchesQuality && matchesRegistry && matchesChain;
  });

  return (
    <div className="pt-16 md:pt-0 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and purchase fractionalized carbon credits verified by leading registries
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search projects, locations, or types..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <Button 
            variant="outline" 
            leftIcon={<SlidersHorizontal className="h-5 w-5" />}
            onClick={toggleFilters}
          >
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="mb-6 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="reforestation">Reforestation</option>
                <option value="avoided deforestation">Avoided Deforestation</option>
                <option value="renewable energy">Renewable Energy</option>
                <option value="methane capture">Methane Capture</option>
                <option value="ocean">Ocean</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.quality}
                onChange={(e) => setFilters({...filters, quality: e.target.value})}
              >
                <option value="">All Qualities</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registry
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.registry}
                onChange={(e) => setFilters({...filters, registry: e.target.value})}
              >
                <option value="">All Registries</option>
                <option value="Verra">Verra</option>
                <option value="Gold Standard">Gold Standard</option>
                <option value="ACR">American Carbon Registry</option>
                <option value="CAR">Climate Action Reserve</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chain
              </label>
              <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.chain}
                onChange={(e) => setFilters({...filters, chain: e.target.value})}
              >
                <option value="">All Chains</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Arbitrum">Arbitrum</option>
                <option value="Base">Base</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => setFilters({
                type: '',
                quality: '',
                registry: '',
                priceRange: [0, 50],
                chain: '',
              })}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCredits.length === 0 ? (
        <Card className="py-12 text-center">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No carbon credits found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilters({
                type: '',
                quality: '',
                registry: '',
                priceRange: [0, 50],
                chain: '',
              });
            }}
          >
            Clear All Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredits.map((credit) => (
            <CarbonCreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;