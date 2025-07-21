import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '../ui/Button';
import { formatAddress } from '../../utils/format';
import { Wallet, LogOut } from 'lucide-react';

export const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {formatAddress(address)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          icon={<LogOut className="w-4 h-4" />}
        >
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="primary"
          size="sm"
          loading={isPending}
          onClick={() => connect({ connector })}
          icon={<Wallet className="w-4 h-4" />}
        >
          Connect {connector.name}
        </Button>
      ))}
    </div>
  );
};