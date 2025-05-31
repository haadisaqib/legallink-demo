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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Aurora Streaks */}
        <div 
          className="absolute top-1/4 left-0 w-[200%] h-40"
          style={{
            animation: 'streakAurora1 25s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'rotate(-15deg)',
            transformOrigin: 'center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-300/10 to-transparent blur-xl"></div>
        </div>

        <div 
          className="absolute bottom-1/3 left-0 w-[180%] h-32"
          style={{
            animation: 'streakAurora2 30s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'rotate(-20deg)',
            animationDelay: '5s',
            transformOrigin: 'center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-200/15 to-transparent blur-lg"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-4 h-[calc(100vh-4rem)] md:h-screen">
            <div className="w-full h-full flex items-center justify-center">
              {!pdfFile ? (
                <div className="w-full max-w-3xl h-full flex items-center justify-center">
                  <div className="w-full h-[95%] bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-4 shadow-2xl">
                    <FileUploadZone onFileUpload={handleFileUpload} fullScreen />
                  </div>
                </div>
              ) : (
                <div className="w-full h-[95%] flex items-center justify-center bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl">
                  <iframe
                    src={pdfUrl || undefined}
                    title="PDF Viewer"
                    className="w-full h-full rounded-2xl"
                    style={{ padding: '0.5rem' }}
                  />
                </div>
              )}
            </div>
          </div>
          {pdfFile && (
            <div className="relative w-[32rem] h-screen flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border-l border-gray-800/50"></div>
              <div className="relative z-10 flex flex-col h-full">
                <AIToolbar pdfFile={pdfFile} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 