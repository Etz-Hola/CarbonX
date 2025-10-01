import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 mx-auto bg-emerald-600 rounded-full flex items-center justify-center"
            >
              <Leaf className="w-16 h-16 text-white" />
            </motion.div>
            <div className="mt-6">
              <h1 className="text-8xl font-bold text-emerald-600 mb-2">404</h1>
              <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full" />
            </div>
            {/* <div className="mt-6">
              <h1 className="text-8xl-- -"></ */}

          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              The page you're looking for seems to have wandered off into the carbon forest. 
              Let's get you back on the right path to save the planet!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Link to="/dashboard" className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Go to Dashboard
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Climate Fact</h3>
            </div>
            <p className="text-sm text-gray-600">
              While you were here, trees around the world absorbed approximately 
              <span className="font-semibold text-emerald-600"> 2.6 tons of CO₂</span> from the atmosphere!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};