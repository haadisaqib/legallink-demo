import React from 'react';
import { User, Building, Mail, Shield } from 'lucide-react';

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Account Profile</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">John Smith</h2>
            <p className="text-gray-400">Administrator</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-medium text-white">Company Information</h3>
            </div>
            <div className="space-y-3 text-base">
              <p className="text-gray-400">LegalLink Enterprise</p>
              <p className="text-gray-400">Enterprise Plan</p>
              <p className="text-gray-400">Account ID: ENTERPRISE-1234</p>
            </div>
          </div>

          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-medium text-white">Contact Information</h3>
            </div>
            <div className="space-y-3 text-base">
              <p className="text-gray-400">john.smith@legallink.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-medium text-white">Security</h3>
            </div>
            <div className="space-y-3 text-base">
              <p className="text-gray-400">Last login: 2 hours ago</p>
              <p className="text-gray-400">2FA: Enabled</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account; 