export const CONTRACT_ADDRESSES = {
  FRACTIONALIZER: '0x1234567890123456789012345678901234567890',
  YIELD_ENGINE: '0x2345678901234567890123456789012345678901',
  ACHIEVEMENT: '0x3456789012345678901234567890123456789012',
  RETIREMENT: '0x4567890123456789012345678901234567890123',
  GOVERNANCE: '0x5678901234567890123456789012345678901234',
} as const;

export const SUPPORTED_CHAINS = {
  ARBITRUM: 42161,
  POLYGON: 137,
  ETHEREUM: 1,
} as const;

export const API_ENDPOINTS = {
  ORACLE_DATA: 'https://api.carbonx.io/oracle',
  IMPACT_DATA: 'https://api.carbonx.io/impact',
  FIAT_RATES: 'https://api.carbonx.io/rates',
  ANALYTICS: 'https://api.carbonx.io/analytics',
} as const;

export const ACHIEVEMENT_TYPES = {
  FIRST_TRADE: 'first_trade',
  TREE_PLANTER: 'tree_planter',
  CARBON_CHAMPION: 'carbon_champion',
  YIELD_MASTER: 'yield_master',
  COMMUNITY_LEADER: 'community_leader',
} as const;

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  INR: '₹',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;