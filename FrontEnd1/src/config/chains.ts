export const supportedChains = [
  {
    id: 1,
    name: 'Ethereum',
    icon: '/icons/ethereum.svg',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    testnet: false,
  },
  {
    id: 137,
    name: 'Polygon',
    icon: '/icons/polygon.svg',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    testnet: false,
  },
  {
    id: 42161,
    name: 'Arbitrum',
    icon: '/icons/arbitrum.svg',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    testnet: false,
  },
  {
    id: 8453,
    name: 'Base',
    icon: '/icons/base.svg',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    testnet: false,
  },
];

export const defaultChain = supportedChains[0];