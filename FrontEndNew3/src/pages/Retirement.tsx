import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileX, Download, Calendar, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { formatDate, formatCurrency } from '../utils/format';

export const Retirement: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState('1');
  const [retireAmount, setRetireAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [message, setMessage] = useState('');
  const [isRetireModalOpen, setIsRetireModalOpen] = useState(false);

  // Mock data
  const mockAvailableTokens = [
    { tokenId: '1', symbol: 'ARC', name: 'Amazon Rainforest Credit', balance: 500, price: 12.50 },
    { tokenId: '2', symbol: 'MRC', name: 'Mangrove Restoration Credit', balance: 300, price: 18.75 },
    { tokenId: '3', symbol: 'RFI', name: 'Reforestation Initiative', balance: 750, price: 9.25 },
  ];

  const mockCertificates = [
    {
      id: '1',
      tokenId: '1',
      amount: 100,
      retiredAt: new Date('2024-01-15'),
      beneficiary: 'Green Earth Foundation',
      message: 'Offset for annual corporate carbon footprint',
      certificateUrl: '#',
      txHash: '0x1234567890abcdef',
    },
    {
      id: '2',
      tokenId: '2',
      amount: 250,
      retiredAt: new Date('2024-02-01'),
      beneficiary: 'Climate Action Now',
      message: 'Supporting sustainable development goals',
      certificateUrl: '#',
      txHash: '0x2345678901bcdefg',
    },
  ];

  const selectedTokenData = mockAvailableTokens.find(t => t.tokenId === selectedToken);
  const estimatedCost = selectedTokenData ? parseFloat(retireAmount || '0') * selectedTokenData.price : 0;

  const handleRetire = () => {
    console.log('Retire tokens:', { selectedToken, retireAmount, beneficiary, message });
    setIsRetireModalOpen(false);
    setRetireAmount('');
    setBeneficiary('');
    setMessage('');
  };

  const handleDownloadCertificate = (certificateId: string) => {
    console.log('Download certificate:', certificateId);
  };

  const totalRetired = mockCertificates.reduce((sum, cert) => sum + cert.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-64">
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Carbon Credit Retirement
              </h1>
              <p className="text-gray-600">
                Permanently retire carbon credits and receive certificates
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsRetireModalOpen(true)}
            >
              <FileX className="w-4 h-4 mr-2" />
              Retire Credits
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: FileX,
                label: 'Total Retired',
                value: `${totalRetired} tons`,
                description: 'Lifetime CO₂ offset',
                color: 'emerald',
              },
              {
                icon: Award,
                label: 'Certificates',
                value: mockCertificates.length.toString(),
                description: 'Retirement certificates',
                color: 'blue',
              },
              {
                icon: Calendar,
                label: 'Last Retirement',
                value: mockCertificates.length > 0 ? formatDate(mockCertificates[0].retiredAt).split(',')[0] : 'N/A',
                description: 'Most recent activity',
                color: 'purple',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* How Retirement Works */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How Credit Retirement Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: 'Select Credits',
                  description: 'Choose the carbon credits you want to permanently retire',
                },
                {
                  step: 2,
                  title: 'Provide Details',
                  description: 'Add beneficiary information and optional message',
                },
                {
                  step: 3,
                  title: 'Receive Certificate',
                  description: 'Get a permanent, verifiable retirement certificate NFT',
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Retirement History */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Retirement History
              </h2>
              <p className="text-gray-600">
                Your permanent carbon offset certificates
              </p>
            </div>

            <div className="p-6">
              {mockCertificates.length > 0 ? (
                <div className="space-y-4">
                  {mockCertificates.map((certificate) => (
                    <motion.div
                      key={certificate.id}
                      whileHover={{ scale: 1.01 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileX className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-semibold text-gray-900">
                              Retirement Certificate #{certificate.id}
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-500">Amount Retired</p>
                              <p className="font-medium">{certificate.amount} tons CO₂</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Retirement Date</p>
                              <p className="font-medium">{formatDate(certificate.retiredAt)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Beneficiary</p>
                              <p className="font-medium">{certificate.beneficiary || 'Self'}</p>
                            </div>
                          </div>

                          {certificate.message && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Message</p>
                              <p className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                                "{certificate.message}"
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Transaction:</span>
                            <span className="font-mono">{certificate.txHash}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadCertificate(certificate.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Retirement Certificates Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start retiring carbon credits to make a permanent impact
                  </p>
                  <Button variant="primary" onClick={() => setIsRetireModalOpen(true)}>
                    Retire Your First Credits
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Retirement Modal */}
          <Modal
            isOpen={isRetireModalOpen}
            onClose={() => setIsRetireModalOpen(false)}
            title="Retire Carbon Credits"
            size="md"
          >
            <div className="space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Token to Retire
                </label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                >
                  {mockAvailableTokens.map((token) => (
                    <option key={token.tokenId} value={token.tokenId}>
                      {token.symbol} - {token.name} (Balance: {token.balance})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <Input
                label="Amount to Retire"
                type="number"
                value={retireAmount}
                onChange={(e) => setRetireAmount(e.target.value)}
                placeholder="0.00"
                helperText={selectedTokenData ? `Max: ${selectedTokenData.balance} ${selectedTokenData.symbol}` : ''}
              />

              {/* Beneficiary */}
              <Input
                label="Beneficiary (Optional)"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="e.g., Green Earth Foundation"
                helperText="Organization or cause this retirement is for"
              />

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message about why you're retiring these credits..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {message.length}/500 characters
                </p>
              </div>

              {/* Cost Summary */}
              {retireAmount && selectedTokenData && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileX className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium text-red-900">Retirement Summary</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-700">Amount:</span>
                      <span className="font-semibold text-red-700">
                        {retireAmount} {selectedTokenData.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700">CO₂ Impact:</span>
                      <span className="font-semibold text-red-700">
                        {retireAmount} tons permanently offset
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700">Cost:</span>
                      <span className="font-semibold text-red-700">
                        {formatCurrency(estimatedCost)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-600">
                      ⚠️ This action is permanent and cannot be undone. Tokens will be burned forever.
                    </p>
                  </div>
                </div>
              )}

              {/* Retire Button */}
              <Button
                variant="danger"
                className="w-full"
                onClick={handleRetire}
                disabled={!retireAmount || parseFloat(retireAmount) <= 0}
              >
                <FileX className="w-4 h-4 mr-2" />
                Permanently Retire Credits
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};