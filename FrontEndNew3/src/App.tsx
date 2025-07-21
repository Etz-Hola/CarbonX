import React from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes';
import { Toast } from './components/ui/Toast';

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrum, polygon],
  [publicProvider()]
);

// Configure connectors
const connectors = [
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'default-project-id',
    },
  }),
  new InjectedConnector({ chains }),
];

// Create wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <AppProvider>
        <div className="App">
          <AppRoutes />
          <Toast />
        </div>
      </AppProvider>
    </WagmiConfig>
  );
}

export default App;