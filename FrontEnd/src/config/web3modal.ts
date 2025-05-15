import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@wagmi/core';
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';

// 1. Define wagmi config
export const projectId = 'YOUR_PROJECT_ID'; // Replace with your WalletConnect project ID

export const chains = [mainnet, polygon, arbitrum, base];

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'CarbonX',
    description: 'Fractionalized Carbon Credit Trading with Dynamic DeFi Incentives',
    url: 'https://carbonx.io',
    icons: ['https://carbonx.io/icon.png'],
  },
});

// 3. Create modal
export const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#388e3c',
    '--w3m-color-mix': '#8D6E63',
    '--w3m-color-mix-strength': 20,
  },
});