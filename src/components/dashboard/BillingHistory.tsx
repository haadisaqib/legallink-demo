import React from 'react';
import { Plus } from 'lucide-react';

interface BillingRecord {
  date: string;
  amount: string;
  status: string;
  invoiceNumber: number;
}

interface BillingHistoryProps {
  records: BillingRecord[];
  onAddClick?: () => void;
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ records, onAddClick }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Billing History</h2>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Add Payment Method"
          >
            <Plus size={18} />
            Add
          </button>
        )}
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {records.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-white font-medium">{bill.date}</p>
                <p className="text-gray-400 text-sm">Invoice #{bill.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{bill.amount}</p>
                <p className="text-green-400 text-sm">{bill.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingHistory; 