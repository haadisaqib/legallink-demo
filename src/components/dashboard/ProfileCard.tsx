import React from "react";
import { ChevronDown } from "lucide-react";

interface ProfileCardProps {
  onClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClick }) => {
  // Placeholder user info
  const user = {
    name: "Jane Doe",
    lawFirm: "Doe & Associates",
    email: "jane.doe@example.com",
  };
  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <button
      className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition mt-4"
      onClick={onClick}
      aria-label="Open profile"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
        {initials}
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold text-white">{user.name}</div>
        <div className="text-xs text-gray-400">{user.lawFirm}</div>
      </div>
      <ChevronDown className="text-gray-400" size={20} />
    </button>
  );
};

export default ProfileCard; 