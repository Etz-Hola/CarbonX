import { useState, useRef, useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { ChevronDown } from 'lucide-react';
import { supportedChains, defaultChain } from '../../config/chains';

const NetworkSelector = () => {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentChain = 
    supportedChains.find(c => c.id === chain?.id) || 
    defaultChain;

  const handleChange = (chainId: number) => {
    switchChain({ chainId });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        type="button"
        className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span className="flex items-center">
          {/* If we had the chain icons, we would show them here */}
          <span className="ml-1">{currentChain.name}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
          <div className="py-1">
            {supportedChains.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChange(c.id)}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                  c.id === currentChain.id ? 'text-primary-600 font-medium' : 'text-gray-700'
                }`}
              >
                {/* If we had the chain icons, we would show them here */}
                <span className="ml-2">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;