import { Link } from 'react-router-dom';
import { TreePine, Globe, ArrowUpRight } from 'lucide-react';
import { CarbonCredit } from '../../types/carbon';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatCarbonTons, formatYield } from '../../utils/formatters';

interface CarbonCreditCardProps {
  credit: CarbonCredit;
}

const CarbonCreditCard = ({ credit }: CarbonCreditCardProps) => {
  const qualityColorMap = {
    'A+': 'bg-success-100 text-success-800',
    'A': 'bg-success-100 text-success-800',
    'B+': 'bg-lime-100 text-lime-800',
    'B': 'bg-lime-100 text-lime-800',
    'C+': 'bg-amber-100 text-amber-800',
    'C': 'bg-amber-100 text-amber-800',
    'D': 'bg-error-100 text-error-800',
  };

  const typeIconMap = {
    'reforestation': <TreePine className="h-5 w-5 text-primary-600" />,
    'avoided deforestation': <TreePine className="h-5 w-5 text-primary-600" />,
    'renewable energy': <svg className="h-5 w-5 text-accent-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    'methane capture': <svg className="h-5 w-5 text-secondary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 16.2V14.5H3V9.5H7V7.8C7 6.12 7.5 4.86 8.5 4.03C9.5 3.17 10.83 2.75 12.5 2.75C14.17 2.75 15.5 3.17 16.5 4.03C17.5 4.86 18 6.12 18 7.8V9.5H22V14.5H18V16.2C18 17.88 17.5 19.14 16.5 19.97C15.5 20.83 14.17 21.25 12.5 21.25C10.83 21.25 9.5 20.83 8.5 19.97C7.5 19.14 7 17.88 7 16.2Z" stroke="currentColor" strokeWidth="2" />
    </svg>,
    'ocean': <Globe className="h-5 w-5 text-accent-600" />,
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <img 
          src={credit.imageUrl} 
          alt={credit.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${qualityColorMap[credit.quality]}`}>
            {credit.quality}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black/70 to-transparent w-full">
          <div className="flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-white text-xs">
              {typeIconMap[credit.type]}
              <span className="ml-1 capitalize">{credit.type}</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {credit.name}
          </h3>
          <div className="flex flex-shrink-0 ml-2">
            {credit.verified && (
              <span className="inline-flex items-center rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-medium text-success-800">
                Verified
              </span>
            )}
          </div>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {credit.description}
        </p>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Globe className="h-4 w-4 text-gray-400 mr-1" />
          <span>{credit.location.country}, {credit.location.region}</span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="font-medium">{formatCurrency(credit.pricePerTon)}/ton</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Available</p>
            <p className="font-medium">{formatCarbonTons(credit.availableSupply)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Registry</p>
            <p className="font-medium">{credit.registry}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expected Yield</p>
            <p className="font-medium text-primary-600">{formatYield(credit.expectedYield)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <Link to={`/marketplace/${credit.id}`}>
          <Button 
            variant="primary" 
            fullWidth 
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CarbonCreditCard;