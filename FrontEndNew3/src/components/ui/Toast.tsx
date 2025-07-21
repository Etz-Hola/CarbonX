import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const toastStyles = {
  success: {
    icon: CheckCircle,
    className: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 text-red-900 border-red-200',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 text-blue-900 border-blue-200',
    iconColor: 'text-blue-500',
  },
};

const CustomToast: React.FC<{
  type: keyof typeof toastStyles;
  message: string;
}> = ({ type, message }) => {
  const { icon: Icon, className, iconColor } = toastStyles[type];

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${className}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export const toast = {
  success: (message: string) =>
    hotToast.custom(<CustomToast type="success" message={message} />, {
      duration: 4000,
    }),
  error: (message: string) =>
    hotToast.custom(<CustomToast type="error" message={message} />, {
      duration: 5000,
    }),
  warning: (message: string) =>
    hotToast.custom(<CustomToast type="warning" message={message} />, {
      duration: 4000,
    }),
  info: (message: string) =>
    hotToast.custom(<CustomToast type="info" message={message} />, {
      duration: 3000,
    }),
};

export const Toast: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
    />
  );
};