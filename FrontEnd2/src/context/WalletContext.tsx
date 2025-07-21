import React, { createContext, useContext, ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains, mainnet, arbitrum, sepolia } from 'wagmi';
import { http } from 'wagmi';
import { alchemy } from 'wagmi/connectors';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet, arbitrum, sepolia],
  [
    alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY || '' }),
    http()
  ]
);

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

const { wallets } = getDefaultWallets({
  appName: 'CarbonX',
  projectId,
  chains
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'CarbonX', chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
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
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={{
            blurs: {
              modalOverlay: 'blur(4px)',
            },
            colors: {
              accentColor: '#10B981',
              accentColorForeground: 'white',
              actionButtonBorder: 'transparent',
              actionButtonBorderMobile: 'transparent',
              actionButtonSecondaryBackground: '#F3F4F6',
              closeButton: '#6B7280',
              closeButtonBackground: '#F3F4F6',
              connectButtonBackground: '#10B981',
              connectButtonBackgroundError: '#EF4444',
              connectButtonInnerBackground: '#059669',
              connectButtonText: 'white',
              connectButtonTextError: 'white',
              connectionIndicator: '#10B981',
              downloadBottomCardBackground: '#F9FAFB',
              downloadTopCardBackground: '#F3F4F6',
              error: '#EF4444',
              generalBorder: '#E5E7EB',
              generalBorderDim: '#F3F4F6',
              menuItemBackground: '#F9FAFB',
              modalBackdrop: 'rgba(0, 0, 0, 0.4)',
              modalBackground: 'white',
              modalBorder: '#E5E7EB',
              modalText: '#111827',
              modalTextDim: '#6B7280',
              modalTextSecondary: '#374151',
              profileAction: '#F3F4F6',
              profileActionHover: '#E5E7EB',
              profileForeground: '#F9FAFB',
              selectedOptionBorder: '#10B981',
              standby: '#F59E0B',
            },
          }}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletContext.Provider>
  );
};