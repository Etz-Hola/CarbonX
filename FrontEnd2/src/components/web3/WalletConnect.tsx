import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useUser } from '../../context/UserContext';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { Wallet, CreditCard, Shield, ArrowRight } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { user, login } = useUser();

  const handleConnect = async () => {
    if (isConnected && address) {
      await login(address, true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const onboardingSteps = [
    {
      icon: <Wallet className="w-8 h-8 text-green-600" />,
      title: 'Connect Your Wallet',
      description: 'Link your crypto wallet to start trading carbon credits.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: 'Fund Your Account',
      description: 'Add funds using crypto or fiat currency through our secure payment partners.',
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Start Trading',
      description: 'Trade fractionalized carbon credits and earn rewards while helping the planet.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Onboarding Modal */}
      <Modal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        title="Welcome to CarbonX"
        size="lg"
      >
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Get Started in 3 Easy Steps
            </h3>
            <p className="text-gray-600">
              Join thousands of users trading carbon credits on the blockchain
            </p>
          </div>

          <div className="space-y-6">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setShowOnboarding(false)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Modal>

      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Wallet Connection</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOnboarding(true)}
          >
            Need Help?
          </Button>
        </div>

        <div className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your crypto wallet to start trading carbon credits
              </p>
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button onClick={openConnectModal} size="lg">
                    Connect Wallet
                  </Button>
                )}
              </ConnectButton.Custom>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    Wallet Connected
                  </p>
                  <p className="text-sm text-green-700">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
              </div>

              {!user && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 mb-3">
                    Complete your setup to start trading
                  </p>
                  <Button onClick={handleConnect} size="sm">
                    Complete Setup
                  </Button>
                </div>
              )}

              <div className="flex space-x-3">
                <ConnectButton.Custom>
                  {({ openAccountModal }) => (
                    <Button variant="outline" onClick={openAccountModal}>
                      Account Details
                    </Button>
                  )}
                </ConnectButton.Custom>
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Why Connect Your Wallet?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-600">
              Trade fractionalized carbon credits with low fees
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-600">
              Earn yield rewards through staking
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-600">
              Participate in governance decisions
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-600">
              Access exclusive achievement NFTs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;