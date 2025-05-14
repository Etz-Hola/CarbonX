import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">CarbonX</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Revolutionizing carbon markets through Web3 technology with fractionalized carbon credits and dynamic DeFi incentives.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-white text-sm">
                  Carbon Marketplace
                </Link>
              </li>
              <li>
                <Link to="/yield" className="text-gray-300 hover:text-white text-sm">
                  Yield Farming
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-white text-sm">
                  Impact Tracking
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white text-sm">
                  Portfolio Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Carbon Market Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} CarbonX. All rights reserved.
          </p>
          <p className="text-sm text-gray-300 mt-2 md:mt-0">
            Created by QADIR ADESOYE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;