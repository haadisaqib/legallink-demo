import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { User, CreditCard, Users, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  onSignOut: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8, // 8px margin
        left: rect.right - 192 + window.scrollX // 192px = menu width
      });
    }
  }, [isOpen]);

  const handleOptionClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" style={{ zIndex: 1 }}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && menuPosition && ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className="fixed w-48 bg-gray-900 rounded-lg border border-gray-800 shadow-lg py-1 z-[99999]"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <button
            onClick={() => handleOptionClick('/account')}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <User className="w-4 h-4" />
            Account
          </button>
          <button
            onClick={() => handleOptionClick("/billing")}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Billing
          </button>
          <button
            onClick={() => handleOptionClick('/children')}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <Users className="w-4 h-4" />
            Children
          </button>
          <div className="border-t border-gray-800 my-1" />
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProfileDropdown; 