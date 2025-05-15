import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import ConnectWallet from '../web3/ConnectWallet';
import NetworkSelector from '../web3/NetworkSelector';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = scrolled
    ? 'bg-white shadow-md'
    : 'bg-transparent';

  return (
    <header className={`${headerClass} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-primary-800">CarbonX</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NetworkSelector />
            <ConnectWallet />
          </div>
          <div className="flex md:hidden">
            <ConnectWallet minimal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;