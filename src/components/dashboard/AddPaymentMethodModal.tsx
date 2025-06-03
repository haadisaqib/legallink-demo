import React from 'react';
import { X, CreditCard } from 'lucide-react';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-500" />
            Add Payment Method
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-gray-300 mb-6">
            This is a placeholder for Stripe integration.<br />
            Here you will be able to add or connect a payment method.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-not-allowed opacity-60"
            disabled
          >
            Connect to Stripe (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal; 