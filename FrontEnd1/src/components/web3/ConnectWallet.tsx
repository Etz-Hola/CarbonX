import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { ChevronDown, LogOut, Wallet } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { truncateAddress } from '../../utils/formatters';

interface ConnectWalletProps {
  minimal?: boolean;
}

const ConnectWallet = ({ minimal = false }: ConnectWalletProps) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className={minimal 
          ? "inline-flex items-center justify-center p-2 rounded-md text-gray-700"
          : "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors duration-200"
        }
      >
        {minimal ? <Wallet className="h-6 w-6" /> : "Connect Wallet"}
      </button>
    );
  }

  if (minimal) {
    return (
      <button 
        onClick={handleConnect}
        className="inline-flex items-center justify-center p-2 rounded-md text-primary-700 bg-primary-50"
      >
        <Wallet className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors duration-200"
      >
        <span className="mr-1">{truncateAddress(address)}</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
          <div className="py-1">
            <button
              onClick={handleConnect}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Switch Wallet
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;