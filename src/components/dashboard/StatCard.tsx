import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  change
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-800 rounded-lg">
          {icon}
        </div>
        <span className="text-sm text-gray-400">{change}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-gray-400 ml-1">{unit}</span>
      </div>
    </div>
  );
};

export default StatCard; 