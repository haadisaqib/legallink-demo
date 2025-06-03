import React from 'react';

interface BillingRecord {
  date: string;
  amount: string;
  status: string;
  invoiceNumber: number;
}

interface BillingHistoryProps {
  records: BillingRecord[];
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ records }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Billing History</h2>
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