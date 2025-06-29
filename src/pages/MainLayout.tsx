// src/layouts/MainLayout.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { LogOut } from 'lucide-react';
import Sidebar         from '../components/Sidebar';
import FileUploadZone  from '../components/FileUploadZone';
import AIToolbar       from '../components/AIToolbar';
import { FileText }    from 'lucide-react';

interface PDFDocument {
  id: string;
  file: File;
  url: string;
  name: string;
}

const MainLayout = () => {
  const [pdfs, setPdfs]                 = useState<PDFDocument[]>([]);
  const [selectedPdfId, setSelectedPdf] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebar]  = useState(false);
  const { signOut } = useAuthenticator();
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    const newPdf: PDFDocument = {
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    };
    setPdfs((p) => [...p, newPdf]);
    setSelectedPdf(newPdf.id);
    setSidebar(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const selectedPdf = pdfs.find((p) => p.id === selectedPdfId) || null;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebar}
        pdfs={pdfs}
        selectedPdfId={selectedPdfId}
        onPdfSelect={setSelectedPdf}
        onFileSelect={handleFileUpload}
      />

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex items-center justify-center h-[calc(100vh)] md:h-screen">
          {pdfs.length === 0 ? (
            <FileUploadZone
              onFileUpload={handleFileUpload}
              onUploadComplete={() => setSidebar(true)}
              fullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded shadow-lg border border-gray-800">
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

        {selectedPdf && (
          <AIToolbar pdfFile={selectedPdf.file} allPdfs={pdfs} />
        )}
      </main>
    </div>
  );
};

export default MainLayout;
