import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, PieChart, Leaf, TrendingUp, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  closeSidebar: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'Impact', href: '/impact', icon: Leaf },
  { name: 'Yield Farming', href: '/yield', icon: TrendingUp },
];

const Sidebar = ({ isOpen, isMobile, closeSidebar }: SidebarProps) => {
  const location = useLocation();

  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}
      <aside 
        className={cn(
          "bg-white h-screen w-64 shadow-md fixed top-0 left-0 z-50 pt-20 transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && "sticky top-0 mt-16 z-10 h-[calc(100vh-4rem)]"
        )}
      >
        {isMobile && (
          <button 
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            onClick={closeSidebar}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const ItemIcon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary-50 text-primary-800"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={isMobile ? closeSidebar : undefined}
                  >
                    <ItemIcon className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-primary-600" : "text-gray-400"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-primary-800">Carbon Impact</h3>
            <p className="text-xs text-primary-600 mt-1">You've offset 15.8 tons of CO₂</p>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className="h-2 bg-primary-500 rounded-full" 
                style={{ width: '65%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">65% to next impact level</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;