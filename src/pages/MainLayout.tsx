import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FileUploadZone from "../components/FileUploadZone";
import AIToolbar from "../components/AIToolbar";

const MainLayout = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setPdfFile(file);
    setPdfUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-0 h-[calc(100vh)] md:h-screen">
          <div className="w-full h-full flex items-center justify-center">
            {!pdfFile ? (
              <FileUploadZone onFileUpload={handleFileUpload} fullScreen />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded shadow-lg border border-gray-800 p-0">
                {/* Dummy PDF viewer placeholder */}
                <iframe
                  src={pdfUrl || undefined}
                  title="PDF Viewer"
                  className="w-full h-full rounded border"
                />
              </div>
            )}
          </div>
        </div>
        <AIToolbar />
      </main>
    </div>
  );
};

export default MainLayout; 