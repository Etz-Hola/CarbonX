import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, useToast } from '../common/Toast';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default Layout;