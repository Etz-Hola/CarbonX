import React from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon } from 'wagmi/chains';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes';
import { Toast } from './components/ui/Toast';

// Configure wagmi config for v1.x+
const config = createConfig({
  chains: [mainnet, arbitrum, polygon],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    metaMask(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'default-project-id',
    }),
    injected(),
  ],
  ssr: false,
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <AppProvider>
          <div className="App">
            <AppRoutes />
            <Toast />
          </div>
        </AppProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default App;