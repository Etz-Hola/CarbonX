import { createWeb3Modal } from '@web3modal/wagmi/react';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';

// 1. Define wagmi config
export const projectId = 'YOUR_PROJECT_ID'; // Replace with your WalletConnect project ID

export const chains = [mainnet, polygon, arbitrum, base];

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
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