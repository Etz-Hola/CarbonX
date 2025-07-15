import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { useToast } from '../common/Toast';
import { Recycle, FileText, Download } from 'lucide-react';

interface RetirementFormData {
  amount: number;
  reason: string;
  beneficiary?: string;
  retirementDate: string;
}

const schema = yup.object().shape({
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  reason: yup
    .string()
    .min(10, 'Reason must be at least 10 characters')
    .required('Retirement reason is required'),
  beneficiary: yup.string().optional(),
  retirementDate: yup.string().required('Retirement date is required'),
});

interface RetirementFormProps {
  isOpen: boolean;
  onClose: () => void;
  creditId: string;
  maxAmount: number;
  onRetire: (data: RetirementFormData) => Promise<void>;
}

const RetirementForm: React.FC<RetirementFormProps> = ({
  isOpen,
  onClose,
  creditId,
  maxAmount,
  onRetire,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [retirementData, setRetirementData] = useState<RetirementFormData | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RetirementFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      retirementDate: new Date().toISOString().split('T')[0],
    },
  });

  const watchedAmount = watch('amount');

  const onSubmit = async (data: RetirementFormData) => {
    setRetirementData(data);
    setShowConfirmation(true);
  };

  const handleConfirmRetirement = async () => {
    if (!retirementData) return;

    setIsLoading(true);
    try {
      await onRetire(retirementData);
      toast.success('Carbon credits retired successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to retire carbon credits');
      console.error('Retirement error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setRetirementData(null);
    setShowConfirmation(false);
    onClose();
  };

  const carbonImpact = watchedAmount * 1; // 1 token = 1 ton CO2

  return (
    <>
      <Modal
        isOpen={isOpen && !showConfirmation}
        onClose={handleClose}
        title="Retire Carbon Credits"
        size="lg"
      >
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Recycle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">
                  About Carbon Credit Retirement
                </h4>
                <p className="text-sm text-blue-800 mt-1">
                  Retiring carbon credits permanently removes them from circulation,
                  representing your commitment to offset carbon emissions. You'll receive
                  a certificate as proof of your environmental impact.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Amount to Retire"
              type="number"
              step="0.01"
              max={maxAmount}
              error={errors.amount?.message}
              helpText={`Maximum available: ${maxAmount} tokens`}
              {...register('amount')}
            />

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-green-900">
                  Environmental Impact
                </span>
              </div>
              <p className="text-lg font-semibold text-green-900">
                {carbonImpact || 0} tons CO₂ offset
              </p>
              <p className="text-sm text-green-700">
                Equivalent to planting {Math.round((carbonImpact || 0) * 40)} trees
              </p>
            </div>

            <Input
              label="Retirement Reason"
              as="textarea"
              rows={3}
              error={errors.reason?.message}
              placeholder="e.g., Offsetting company emissions for Q1 2024"
              helpText="Explain why you're retiring these credits"
              {...register('reason')}
            />

            <Input
              label="Beneficiary (Optional)"
              error={errors.beneficiary?.message}
              placeholder="e.g., Company Name or Personal"
              helpText="Who or what organization is this retirement for?"
              {...register('beneficiary')}
            />

            <Input
              label="Retirement Date"
              type="date"
              error={errors.retirementDate?.message}
              {...register('retirementDate')}
            />

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!watchedAmount || watchedAmount <= 0}
              >
                Review Retirement
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Retirement"
        preventClose={isLoading}
      >
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-900">
                  Permanent Action
                </h4>
                <p className="text-sm text-yellow-800 mt-1">
                  This action cannot be undone. The carbon credits will be permanently
                  removed from circulation.
                </p>
              </div>
            </div>
          </div>

          {retirementData && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Retirement Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{retirementData.amount} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CO₂ Offset:</span>
                    <span className="font-medium">{retirementData.amount} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{retirementData.retirementDate}</span>
                  </div>
                  {retirementData.beneficiary && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beneficiary:</span>
                      <span className="font-medium">{retirementData.beneficiary}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                <p className="text-sm text-gray-700">{retirementData.reason}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={handleConfirmRetirement}
              className="flex-1"
              loading={isLoading}
              leftIcon={<Recycle className="w-4 h-4" />}
            >
              Confirm Retirement
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RetirementForm;