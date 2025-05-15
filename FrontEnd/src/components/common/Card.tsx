import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className, 
  hover = false, 
  shadow = 'md',
  padding = 'md'
}: CardProps) => {
  const shadowClasses = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
  };

  const paddingClasses = {
    'none': 'p-0',
    'sm': 'p-3',
    'md': 'p-4',
    'lg': 'p-6',
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-lg overflow-hidden', 
        shadowClasses[shadow],
        paddingClasses[padding],
        hover && 'transition-all duration-200 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;