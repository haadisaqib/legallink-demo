import { MessageCircle, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen bg-gray-900/90 backdrop-blur-xl border-r border-gray-800/50 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header with Profile */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold text-white ${isCollapsed ? 'hidden' : 'block'}`}>Chats</h2>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
        
        {/* Profile Section */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50`}>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
          </div>
          {!isCollapsed && (
            <div>
              <h3 className="font-semibold text-white">Demo User</h3>
              <p className="text-sm text-gray-400">Free Plan</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {["Contract Review", "NDA Analysis", "Risk Assessment"].map((chat, i) => (
          <button
            key={i}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-3 rounded-xl hover:bg-gray-800/50 transition-colors group`}
            title={isCollapsed ? chat : undefined}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600/10 to-blue-800/10 rounded-full flex items-center justify-center border border-blue-500/20">
                <MessageCircle className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            {!isCollapsed && (
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{chat}</span>
            )}
          </button>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className={`p-4 border-t border-gray-800/50 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-blue-800/10 border border-blue-500/20 text-center">
          <p className="text-white font-semibold mb-1">Upgrade to Pro</p>
          <p className="text-sm text-gray-400">Get unlimited document analysis</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 