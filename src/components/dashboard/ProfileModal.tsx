import React, { useEffect } from 'react';
import { X, User, Building, Mail, LogOut, Shield } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSignOut
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md my-8">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900 rounded-t-xl">
          <h2 className="text-xl font-semibold text-white">
            Account Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-white truncate">John Smith</h3>
              <p className="text-gray-400 truncate">Administrator</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <h4 className="text-white font-medium truncate">Company Information</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 truncate">LegalLink Enterprise</p>
                <p className="text-gray-400 truncate">Enterprise Plan</p>
                <p className="text-gray-400 truncate">Account ID: ENTERPRISE-1234</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <h4 className="text-white font-medium truncate">Contact Information</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 truncate">john.smith@legallink.com</p>
                <p className="text-gray-400 truncate">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <h4 className="text-white font-medium truncate">Security</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 truncate">Last login: 2 hours ago</p>
                <p className="text-gray-400 truncate">2FA: Enabled</p>
              </div>
            </div>
          </div>

          {/* Footer - Sticky */}
          <div className="sticky bottom-0 mt-8 pt-6 border-t border-gray-800 bg-gray-900">
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 