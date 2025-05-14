import { CarbonCredit } from '../types/carbon';

// Mock data for demonstration
export const mockCredits: CarbonCredit[] = [
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

export const mockPortfolio = {
  totalCredits: 42.5,
  totalValue: 12450.75,
  carbonOffset: 42.5,
  impactScore: 87,
  yieldEarned: 382.45,
  holdings: [
    {
      creditId: '1',
      creditName: 'Amazon Rainforest Conservation',
      amount: 15.2,
      value: 4500.25,
      purchaseDate: new Date(2025, 3, 10),
      averagePurchasePrice: 13.75,
      currentPrice: 14.25,
      chain: 'Ethereum',
      imageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      creditId: '2',
      creditName: 'Solar Energy Project India',
      amount: 10.8,
      value: 3200.5,
      purchaseDate: new Date(2025, 4, 5),
      averagePurchasePrice: 12.25,
      currentPrice: 12.8,
      chain: 'Polygon',
      imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      creditId: '3',
      creditName: 'Borneo Peatland Conservation',
      amount: 8.5,
      value: 2450,
      purchaseDate: new Date(2025, 4, 15),
      averagePurchasePrice: 18.15,
      currentPrice: 18.45,
      chain: 'Arbitrum',
      imageUrl: 'https://images.pexels.com/photos/2412944/pexels-photo-2412944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
      creditId: '6',
      creditName: 'Mangrove Restoration Southeast Asia',
      amount: 8.0,
      value: 2300,
      purchaseDate: new Date(2025, 5, 1),
      averagePurchasePrice: 19.5,
      currentPrice: 19.8,
      chain: 'Base',
      imageUrl: 'https://images.pexels.com/photos/5234638/pexels-photo-5234638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
  ]
};

export const mockMarketStats = {
  totalVolume24h: 4250000,
  percentChange24h: 12.5,
  highestYield: 11.2,
  averagePrice: 15.42,
  totalLiquidity: 85000000,
  totalSupply: 5200000,
  totalRetired: 1850000,
};

export const mockProjectImpact = {
  id: '1',
  name: 'Amazon Rainforest Conservation Project',
  treesPlanted: 125000,
  carbonSequestered: 25000,
  area: 10000,
  biodiversityImpact: 'high' as const,
  communityImpact: {
    jobsCreated: 150,
    communitiesSupported: 12,
  },
  timeline: {
    start: new Date(2022, 0, 1),
    end: new Date(2032, 0, 1),
    milestones: [
      {
        date: new Date(2022, 3, 1),
        description: 'Project inception and land acquisition'
      },
      {
        date: new Date(2022, 6, 1),
        description: 'Community engagement and training programs'
      },
      {
        date: new Date(2023, 0, 1),
        description: 'First phase of reforestation completed'
      },
      {
        date: new Date(2023, 6, 1),
        description: 'Carbon credit verification and initial tokenization'
      },
      {
        date: new Date(2024, 0, 1),
        description: 'Biodiversity monitoring system established'
      },
    ]
  }
};