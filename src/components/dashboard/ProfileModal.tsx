import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { signOut } from '@aws-amplify/auth';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileImg: string | null;
  setProfileImg: (img: string | null) => void;
  user: UserProfile | null;
}

interface UserProfile {
  username?: string;
  name?: string;
  email?: string;
  website?: string;
  'custom:FirmName'?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, profileImg, setProfileImg, user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // API Gateway base URL from environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!open) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.email) {
      alert("Could not upload image: user email not found.");
      return;
    }

    setIsLoading(true);

    // Show a local preview immediately for better UX
    const reader = new FileReader();
    reader.onload = (ev) => setProfileImg(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Construct the upload URL
    const uploadUrl = `${apiBaseUrl}/uploadprofilepic?userEmail=${encodeURIComponent(user.email)}`;
    console.log(`Uploading to: ${uploadUrl}`);

    try {
      // Perform the upload
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        const result = await uploadResponse.json();
        throw new Error(result.message || 'Failed to upload image.');
      }

      console.log('Upload successful. Refreshing image...');
      
      // After a successful upload, fetch the new presigned URL to display the official image
      // CORRECTED ENDPOINT PATH
      const getImageUrl = `${apiBaseUrl}/getprofilepic?userEmail=${encodeURIComponent(user.email)}`;
      const newImageResponse = await fetch(getImageUrl);
      if (newImageResponse.ok) {
        const data = await newImageResponse.json();
        setProfileImg(data.imageUrl); // Update with the new, official URL
      }

    } catch (error) {
      console.error('Error during upload process:', error);
      // Revert image on failure
      setProfileImg(profileImg); 
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
      onClose();
    }
  };

  // Calculate initials from user data
  const initials = user?.name?.split(' ').map(n => n[0]).join('') || user?.username?.charAt(0).toUpperCase() || 'U';

  if (isLoading) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white">Loading Profile...</div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative flex flex-col border border-gray-800" style={{ minHeight: 400 }}>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>×</button>
        <div className="flex flex-col items-center gap-2 flex-1 text-center">
          <div className="relative mb-2">
            {profileImg ? (
              <img src={profileImg} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"/>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-2xl">{initials}</div>
            )}
            <button className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 border border-gray-700" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-4 h-4 text-blue-400" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleImageChange} />
          </div>
          <div className="font-semibold text-lg mt-2 mb-1 text-white">{user?.name || 'Unnamed User'}</div>
          <div className="text-sm text-gray-400">@{user?.username || '...'}</div>
          <div className="text-gray-300 mt-2">{user?.['custom:FirmName'] || 'No Firm Name'}</div>
          <div className="text-gray-400 text-sm mt-2">{user?.email}</div>
          <div className="text-gray-400 text-sm">{user?.website ? <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{user.website}</a> : 'No website'}</div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
