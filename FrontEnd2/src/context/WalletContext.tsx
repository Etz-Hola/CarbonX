import React, { createContext, useContext, ReactNode } from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, arbitrum, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

const { wallets } = getDefaultWallets({
  appName: 'CarbonX',
  projectId,
  chains: [mainnet, arbitrum, sepolia],
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains: [mainnet, arbitrum, sepolia] }),
      coinbaseWallet({ appName: 'CarbonX', chains: [mainnet, arbitrum, sepolia] }),
      walletConnectWallet({ projectId, chains: [mainnet, arbitrum, sepolia] }),
    ],
  },
]);

const config = createConfig({
  connectors,
  chains: [mainnet, arbitrum, sepolia],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
});

interface WalletContextType {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
});

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const value: WalletContextType = {
    isConnected: false,
  };

  return (
    <WalletContext.Provider value={value}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={[mainnet, arbitrum, sepolia]}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletContext.Provider>
  );
};