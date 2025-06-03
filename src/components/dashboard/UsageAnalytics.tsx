import React from 'react';

interface UsageFeature {
  name: string;
  usage: number;
  total: number;
}

interface UsageAnalyticsProps {
  features: UsageFeature[];
}

const UsageAnalytics: React.FC<UsageAnalyticsProps> = ({ features }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Usage Analytics</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{feature.name}</span>
                <span className="text-white">{feature.usage}/{feature.total} hours</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(feature.usage / feature.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics; 