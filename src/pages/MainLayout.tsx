// src/layouts/MainLayout.tsx
import { useState } from 'react';
import Sidebar         from '../components/Sidebar';
import FileUploadZone  from '../components/FileUploadZone';
import AIToolbar       from '../components/AIToolbar';
import { FileText }    from 'lucide-react';
import { fetchAuthSession } from '@aws-amplify/auth';

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

  // API Gateway base URL from environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleFileUpload = async (file: File) => {
    try {
      // Get current user for the upload
      const session = await fetchAuthSession();
      const jwtToken = session.tokens?.idToken?.toString() || '';

      if (!jwtToken) {
        alert("Could not upload document: user token not found.");
        return;
      }

      // Upload the document to the API
      const uploadUrl = `${apiBaseUrl}/uploadDocuments`;
      console.log(`Uploading document to: ${uploadUrl}`);

      const base64Content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // Remove data URL prefix (e.g., "data:application/pdf;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken
        } as Record<string, string>,
        body: JSON.stringify({
          fileName: file.name,
          content: base64Content
        }),
      });

      if (!uploadResponse.ok) {
        const result = await uploadResponse.json();
        throw new Error(result.message || 'Failed to upload document.');
      }

      console.log('Document upload successful');

      // Create local PDF document object for UI
      const newPdf: PDFDocument = {
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      };
      setPdfs((p) => [...p, newPdf]);
      setSelectedPdf(newPdf.id);
      setSidebar(true);

    } catch (error) {
      console.error('Error uploading document:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      alert(`Document upload failed: ${errorMessage}`);
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
