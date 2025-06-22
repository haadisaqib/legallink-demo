import React, { useState } from 'react';
import { 
  Activity,
  Users,
  DollarSign,
  Shield,
  Plus
} from 'lucide-react';

import StatCard from '../components/dashboard/StatCard';
import ChildAccountCard from '../components/dashboard/ChildAccountCard';
import BillingHistory from '../components/dashboard/BillingHistory';
import UsageAnalytics from '../components/dashboard/UsageAnalytics';
import CreateChildAccountModal from '../components/dashboard/CreateChildAccountModal';
import ProfileDropdown from '../components/dashboard/ProfileDropdown';
import AddPaymentMethodModal from '../components/dashboard/AddPaymentMethodModal';

interface ChildAccount {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  usage: number;
}

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [_childAccounts, _setChildAccounts] = useState<ChildAccount[]>([
    {
      id: '1',
      name: 'Law Firm A',
      email: 'admin@lawfirma.com',
      status: 'active',
      usage: 75
    },
    {
      id: '2',
      name: 'Law Firm B',
      email: 'admin@lawfirmb.com',
      status: 'active',
      usage: 45
    }
  ]);

  const stats = [
    {
      title: 'Total Usage',
      value: '1,234',
      unit: 'hours',
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      change: '+12%'
    },
    {
      title: 'Active Accounts',
      value: '12',
      unit: 'accounts',
      icon: <Users className="w-6 h-6 text-green-500" />,
      change: '+2'
    },
    {
      title: 'Monthly Billing',
      value: '$4,567',
      unit: 'USD',
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
      change: '+8%'
    },
    {
      title: 'Security Score',
      value: '98',
      unit: '/100',
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      change: '+2'
    }
  ];

  const billingRecords = [
    { date: 'Mar 2024', amount: '$4,567', status: 'Paid', invoiceNumber: 1001 },
    { date: 'Feb 2024', amount: '$4,123', status: 'Paid', invoiceNumber: 1002 },
    { date: 'Jan 2024', amount: '$3,890', status: 'Paid', invoiceNumber: 1003 }
  ];

  const usageFeatures = [
    { name: 'Document Review', usage: 45, total: 100 },
    { name: 'Legal Research', usage: 30, total: 100 },
    { name: 'Case Analytics', usage: 25, total: 100 }
  ];

  const handleViewAccountDetails = (id: string) => {
    // Handle viewing account details
    console.log('Viewing account:', id);
  };

  const handleCreateChildAccount = (email: string) => {
    // Handle creating child account
    console.log('Creating child account for:', email);
  };

  const handleSignOut = () => {
    // Handle sign out
    console.log('Signing out...');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create Child Account
              </button>
              <ProfileDropdown onSignOut={handleSignOut} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Child Accounts Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 mb-8">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Child Accounts</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {_childAccounts.map((account) => (
              <ChildAccountCard
                key={account.id}
                account={account}
                onViewDetails={handleViewAccountDetails}
              />
            ))}
          </div>
        </div>

        {/* Billing and Usage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BillingHistory records={billingRecords} onAddClick={() => setIsAddPaymentModalOpen(true)} />
          <UsageAnalytics features={usageFeatures} />
        </div>
      </main>

      {/* Create Child Account Modal */}
      <CreateChildAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateChildAccount}
      />
      <AddPaymentMethodModal isOpen={isAddPaymentModalOpen} onClose={() => setIsAddPaymentModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
