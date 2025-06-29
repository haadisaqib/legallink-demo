import React, { useRef } from "react";
import { Camera } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileImg: string | null;
  setProfileImg: (img: string | null) => void;
}

const user = {
  name: "Jane Doe",
  lawFirm: "Doe & Associates",
  email: "jane.doe@example.com",
  phone: "+1 555-123-4567",
};

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, profileImg, setProfileImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = user.name.split(' ').map(n => n[0]).join('');

  const handleLogout = () => {
    // Placeholder: just close the modal for now
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative flex flex-col border border-gray-800" style={{ minHeight: 400 }}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close profile modal"
        >
          ×
        </button>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative mb-2">
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-2xl">
                {initials}
              </div>
            )}
            <button
              className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 border border-gray-700 shadow hover:bg-gray-700"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload profile picture"
              type="button"
              style={{ lineHeight: 0 }}
            >
              <Camera className="w-4 h-4 text-blue-400" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="font-semibold text-lg mt-2 mb-1 text-white">{user.name}</div>
          <div className="text-gray-300">{user.lawFirm}</div>
          <div className="text-gray-400 text-sm mt-2">{user.email}</div>
          <div className="text-gray-400 text-sm">{user.phone}</div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 