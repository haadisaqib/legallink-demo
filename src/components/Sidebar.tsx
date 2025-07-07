import { Menu, ChevronLeft, FileText, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth';
import ProfileCard from "./dashboard/ProfileCard";
import ProfileModal from "./dashboard/ProfileModal";

interface PDFDocument {
  id: string;
  name: string;
}

interface UserProfile {
  username?: string;
  name?: string;
  email?: string;
  website?: string;
  'custom:FirmName'?: string;
}

type SidebarProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  pdfs: PDFDocument[];
  selectedPdfId: string | null;
  onPdfSelect: (id: string) => void;
  onFileSelect: (file: File) => void;
};

const Sidebar = ({ collapsed, onCollapse, pdfs, selectedPdfId, onPdfSelect, onFileSelect }: SidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  // API Gateway base URL
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserDataAndImage = async () => {
      try {
        // 1. Fetch user attributes from Cognito
        const { username } = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const currentUser = { username, ...attributes };
        setUser(currentUser);

        // 2. Fetch the profile image URL from our new endpoint
        if (currentUser.email) {
          const getImageUrl = `${apiBaseUrl}/getprofilepic?userEmail=${encodeURIComponent(currentUser.email)}`;
          const response = await fetch(getImageUrl);
          
          if (response.ok) {
            const data = await response.json();
            setProfileImg(data.imageUrl);
          } else {
            // If no image is found (e.g., 404), clear the image
            setProfileImg(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user data or image:", error);
        setUser(null);
        setProfileImg(null);
      }
    };
    fetchUserDataAndImage();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  // Calculate initials from user data
  const initials = user?.name?.split(' ').map(n => n[0]).join('') || user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <aside
      className={`h-screen bg-gray-900 border-r border-gray-800 transition-all duration-200 flex flex-col text-white ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{ minHeight: '100vh' }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg text-white transition-all ${collapsed ? "hidden" : "block"}`}>
            Documents
          </span>
          {!collapsed && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1 rounded hover:bg-gray-800 text-blue-400 hover:text-blue-300"
              title="Add document"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
        <button
          className="p-1 rounded hover:bg-gray-800"
          onClick={() => onCollapse(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 mt-2">
          {pdfs.map((pdf) => (
            <li key={pdf.id}>
              <button
                onClick={() => onPdfSelect(pdf.id)}
                className={`flex items-center w-full px-4 py-2 text-left rounded transition text-white ${
                  selectedPdfId === pdf.id ? "bg-blue-800" : "hover:bg-blue-800"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <FileText className="mr-2 text-blue-400" size={18} />
                {!collapsed && <span className="truncate text-white">{pdf.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Profile Card or Avatar at the bottom */}
      <div className="p-4 border-t border-gray-800 mt-auto flex justify-center">
        {collapsed ? (
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg border-2 border-blue-400 hover:opacity-80 transition-all duration-300 aspect-square p-0"
            onClick={() => setProfileOpen(true)}
            aria-label="Open profile"
          >
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover aspect-square transition-all duration-300"
              />
            ) : (
              initials
            )}
          </button>
        ) : (
          <div className="w-full transition-all duration-300">
            <ProfileCard onClick={() => setProfileOpen(true)} user={user} profileImg={profileImg} />
          </div>
        )}
      </div>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} profileImg={profileImg} setProfileImg={setProfileImg} user={user} />
    </aside>
  );
};

export default Sidebar; 