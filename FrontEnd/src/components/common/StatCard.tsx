import { ReactNode } from 'react';
import Card from './Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  footer?: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, icon, change, footer, className }: StatCardProps) => {
  return (
    <Card className={cn('h-full', className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  'text-sm font-medium',
                  change.isPositive ? 'text-success-600' : 'text-error-600'
                )}
              >
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <svg
                className={cn(
                  'w-5 h-5 ml-1',
                  change.isPositive ? 'text-success-600' : 'text-error-600'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d={
                    change.isPositive
                      ? 'M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                      : 'M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
                  }
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {footer && <div className="mt-4 border-t border-gray-100 pt-4">{footer}</div>}
    </Card>
  );
};

export default StatCard;