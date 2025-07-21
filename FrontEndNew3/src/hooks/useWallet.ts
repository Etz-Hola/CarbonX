import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const useWallet = () => {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { setUser, setError } = useAppContext();

  useEffect(() => {
    if (isConnected && address) {
      // Create or update user when wallet is connected
      const user = {
        address,
        balance: balance ? parseFloat(balance.formatted) : 0,
        totalOffset: 0,
        achievements: [],
        stakingPositions: [],
        tradeHistory: [],
        kycStatus: 'pending' as const,
        preferences: {
          currency: 'USD' as const,
          language: 'en' as const,
          notifications: true,
          publicProfile: false,
          theme: 'light' as const,
        },
      };
      setUser(user);
    } else {
      setUser(null);
    }
  }, [isConnected, address, balance, setUser]);

  const connectWallet = async (connectorUid?: string) => {
    try {
      const connector = connectorUid 
        ? connectors.find(c => c.uid === connectorUid)
        : connectors[0];
      
      if (connector) {
        await connect({ connector });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setUser(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      setError('Failed to disconnect wallet.');
    }
  };

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting,
    isPending,
    balance: balance ? parseFloat(balance.formatted) : 0,
    connectors,
    connect: connectWallet,
    disconnect: disconnectWallet,
  };
};