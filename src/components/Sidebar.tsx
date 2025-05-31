import { Menu, ChevronLeft, MessageCircle, FileText, Plus } from "lucide-react";
import { useRef } from "react";

interface PDFDocument {
  id: string;
  name: string;
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

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
    </aside>
  );
};

export default Sidebar; 