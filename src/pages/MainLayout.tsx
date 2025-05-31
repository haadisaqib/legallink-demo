import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FileUploadZone from "../components/FileUploadZone";
import AIToolbar from "../components/AIToolbar";
import { FileText } from "lucide-react";

interface PDFDocument {
  id: string;
  file: File;
  url: string;
  name: string;
}

const MainLayout = () => {
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleFileUpload = (file: File) => {
    const newPdf: PDFDocument = {
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    };
    setPdfs(prev => [...prev, newPdf]);
    setSelectedPdfId(newPdf.id);
    setSidebarCollapsed(true);
  };

  const selectedPdf = pdfs.find(pdf => pdf.id === selectedPdfId);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapse={setSidebarCollapsed}
        pdfs={pdfs}
        selectedPdfId={selectedPdfId}
        onPdfSelect={setSelectedPdfId}
        onFileSelect={handleFileUpload}
      />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-0 h-[calc(100vh)] md:h-screen">
          <div className="w-full h-full flex items-center justify-center">
            {pdfs.length === 0 ? (
              <FileUploadZone 
                onFileUpload={handleFileUpload} 
                onUploadComplete={() => setSidebarCollapsed(true)} 
                fullScreen 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded shadow-lg border border-gray-800 p-0">
                {selectedPdf ? (
                  <iframe
                    src={selectedPdf.url}
                    title="PDF Viewer"
                    className="w-full h-full rounded border"
                  />
                ) : (
                  <div className="text-gray-500 flex flex-col items-center gap-2">
                    <FileText size={48} />
                    <p>Select a PDF from the sidebar</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {selectedPdf && <AIToolbar pdfFile={selectedPdf.file} allPdfs={pdfs} />}
      </main>
    </div>
  );
};

export default MainLayout; 