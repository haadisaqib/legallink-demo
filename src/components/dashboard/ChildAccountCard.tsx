import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

interface ChildAccount {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  usage: number;
}

interface ChildAccountCardProps {
  account: ChildAccount;
  onViewDetails: (id: string) => void;
}

const ChildAccountCard: React.FC<ChildAccountCardProps> = ({
  account,
  onViewDetails
}) => {
  return (
    <div className="p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-white font-medium">{account.name}</h3>
          <p className="text-gray-400 text-sm">{account.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-32">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Usage</span>
            <span className="text-white">{account.usage}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${account.usage}%` }}
            />
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-sm ${
          account.status === 'active' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {account.status}
        </span>
        <button 
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => onViewDetails(account.id)}
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChildAccountCard; 