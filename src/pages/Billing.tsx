import React, { useState } from 'react';
import BillingHistory from '../components/dashboard/BillingHistory';
import AddPaymentMethodModal from '../components/dashboard/AddPaymentMethodModal';

const billingRecords = [
  { date: 'Mar 2024', amount: '$4,567', status: 'Paid', invoiceNumber: 1001 },
  { date: 'Feb 2024', amount: '$4,123', status: 'Paid', invoiceNumber: 1002 },
  { date: 'Jan 2024', amount: '$3,890', status: 'Paid', invoiceNumber: 1003 }
];

const Billing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Billing</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BillingHistory records={billingRecords} onAddClick={() => setIsModalOpen(true)} />
      </main>
      <AddPaymentMethodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Billing; 