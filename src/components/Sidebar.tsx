import { useState } from "react";
import { Menu, ChevronLeft, MessageCircle } from "lucide-react";

const dummyChats = [
  { id: 1, title: "Contract Review" },
  { id: 2, title: "NDA Analysis" },
  { id: 3, title: "Risk Assessment" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gray-900 border-r border-gray-800 transition-all duration-200 flex flex-col text-white ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{ minHeight: '100vh' }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <span className={`font-bold text-lg text-white transition-all ${collapsed ? "hidden" : "block"}`}>Chats</span>
        <button
          className="p-1 rounded hover:bg-gray-800"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 mt-2">
          {dummyChats.map((chat) => (
            <li key={chat.id}>
              <button
                className={`flex items-center w-full px-4 py-2 text-left rounded hover:bg-blue-800 transition text-white ${collapsed ? "justify-center" : ""}`}
              >
                <MessageCircle className="mr-2 text-blue-400" size={18} />
                {!collapsed && <span className="truncate text-white">{chat.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 