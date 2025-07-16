import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { signOut, fetchAuthSession } from '@aws-amplify/auth';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.idToken?.toString() || '';
    const uploadUrl = `${apiBaseUrl}/uploadprofilepic`;
    console.log(`Uploading to: ${uploadUrl}`);

    try {
      // Perform the upload
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const binary = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'Authorization': jwtToken
        },
        body: binary,
      });

      if (!uploadResponse.ok) {
        const result = await uploadResponse.json();
        throw new Error(result.message || 'Failed to upload image.');
      }

      console.log('Upload successful. Refreshing image...');
      
      // After a successful upload, fetch the new presigned URL to display the official image
      const getImageUrl = `${apiBaseUrl}/getprofilepic`;
      const newImageResponse = await fetch(getImageUrl, {
        headers: {
          'Authorization': jwtToken
        } as Record<string, string>
      });
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

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'delete account') {
      alert('Please type "delete account" to confirm.');
      return;
    }

    setIsDeleting(true);
    try {
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString() || '';
      
      const response = await fetch(`${apiBaseUrl}/deletemyaccount`, {
        method: 'DELETE',
        headers: {
          'Authorization': jwtToken
        } as Record<string, string>
      });

      if (response.ok) {
        alert('Account deleted successfully. You will be signed out.');
        await signOut();
        onClose();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete account';
      alert(`Delete account failed: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteConfirmation('');
    }
  };

  // Calculate initials from user data
  const initials = user?.name?.split(' ').map(n => n[0]).join('') || user?.username?.charAt(0).toUpperCase() || 'U';

  if (isLoading || isDeleting) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white">{isDeleting ? 'Deleting Account...' : 'Loading Profile...'}</div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm relative flex flex-col border border-gray-800" style={{ minHeight: 400 }}>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>×</button>
        
        {showDeleteConfirm ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-red-400 text-lg font-semibold">⚠️ Delete Account</div>
            <div className="text-gray-300 text-sm">
              This action cannot be undone. All your data will be permanently deleted.
            </div>
            <div className="text-gray-400 text-xs">
              Type "delete account" to confirm:
            </div>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="delete account"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-center"
            />
            <div className="flex gap-2 w-full">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'delete account'}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <>
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
            <div className="mt-6 pt-4 border-t border-gray-800 space-y-2">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Log Out</button>
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
