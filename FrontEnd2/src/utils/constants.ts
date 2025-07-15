// Application constants
export const CHAIN_IDS = {
  ETHEREUM: 1,
  ARBITRUM: 42161,
  POLYGON: 137,
  SEPOLIA: 11155111,
} as const;

export const CONTRACT_ADDRESSES = {
  [CHAIN_IDS.ARBITRUM]: {
    diamond: '0x1234567890123456789012345678901234567890',
    fractionalizer: '0x2345678901234567890123456789012345678901',
    yieldEngine: '0x3456789012345678901234567890123456789012',
    retirement: '0x4567890123456789012345678901234567890123',
    achievement: '0x5678901234567890123456789012345678901234',
  },
  [CHAIN_IDS.SEPOLIA]: {
    diamond: '0x1111111111111111111111111111111111111111',
    fractionalizer: '0x2222222222222222222222222222222222222222',
    yieldEngine: '0x3333333333333333333333333333333333333333',
    retirement: '0x4444444444444444444444444444444444444444',
    achievement: '0x5555555555555555555555555555555555555555',
  },
} as const;

export const SUPPORTED_TOKENS = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    addresses: {
      [CHAIN_IDS.ARBITRUM]: '0xA0b86a33E6417b8bf007e57cE2C3d2e12a8a3c3b',
      [CHAIN_IDS.ETHEREUM]: '0xA0b86a33E6417b8bf007e57cE2C3d2e12a8a3c3b',
    },
  },
  CARBONX: {
    symbol: 'CARBONX',
    name: 'CarbonX Token',
    decimals: 18,
    addresses: {
      [CHAIN_IDS.ARBITRUM]: '0x6789012345678901234567890123456789012345',
      [CHAIN_IDS.SEPOLIA]: '0x6666666666666666666666666666666666666666',
    },
  },
} as const;

export const ACHIEVEMENT_TYPES = {
  FIRST_TRADE: 'first_trade',
  TREE_PLANTER: 'tree_planter',
  CARBON_WARRIOR: 'carbon_warrior',
  STAKING_CHAMPION: 'staking_champion',
  RETIREMENT_HERO: 'retirement_hero',
  REFERRAL_MASTER: 'referral_master',
} as const;

export const RARITY_COLORS = {
  common: '#6B7280',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
} as const;

export const IMPACT_METRICS = {
  TREES_PLANTED: 'trees_planted',
  CARBON_OFFSET: 'carbon_offset',
  FOREST_AREA: 'forest_area',
  BIODIVERSITY: 'biodiversity',
} as const;

export const SUPPORTED_LANGUAGES = {
  EN: 'en',
  ES: 'es',
  HI: 'hi',
} as const;

export const FIAT_CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  INR: 'INR',
  KES: 'KES',
} as const;

export const PAYMENT_METHODS = {
  MOONPAY: 'moonpay',
  RAMP: 'ramp',
  MPESA: 'mpesa',
  UPI: 'upi',
} as const;

export const DEFAULT_SLIPPAGE = 0.5; // 0.5%
export const MAX_SLIPPAGE = 10; // 10%
export const TRADING_FEE = 0.003; // 0.3%
export const YIELD_FEE = 0.1; // 10%
export const STAKING_LOCK_PERIOD = 30 * 24 * 60 * 60; // 30 days in seconds
export const ORACLE_UPDATE_INTERVAL = 24 * 60 * 60; // 24 hours in seconds