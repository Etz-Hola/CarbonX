import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="pt-16 md:pt-0 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button leftIcon={<HomeIcon className="h-5 w-5" />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;