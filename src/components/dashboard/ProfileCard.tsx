import React from "react";
import { ChevronDown } from "lucide-react";

interface UserProfile {
  username?: string;
  email?: string;
  website?: string;
  'custom:firmName'?: string;
}

interface ProfileCardProps {
  onClick: () => void;
  user: UserProfile | null;
  profileImg: string | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClick, user, profileImg }) => {
  const initials =
    user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <button
      className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition mt-4"
      onClick={onClick}
      aria-label="Open profile"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg overflow-hidden">
        {profileImg ? (
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold text-white">{user?.username || 'Unnamed User'}</div>
        <div className="text-xs text-gray-400">{user?.['custom:firmName'] || 'No Firm Name'}</div>
      </div>
      <ChevronDown className="text-gray-400" size={20} />
    </button>
  );
};

export default ProfileCard; 