export interface ConnectedWallet {
  address: string;
  chainId: number;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'stake' | 'unstake' | 'bridge' | 'claim' | 'retire';
  status: 'pending' | 'confirmed' | 'failed';
  hash: string;
  timestamp: Date;
  amount: number;
  token: string;
  chainId: number;
}

export interface GasEstimate {
  slow: {
    price: number;
    time: number; // seconds
  };
  normal: {
    price: number;
    time: number;
  };
  fast: {
    price: number;
    time: number;
  };
}