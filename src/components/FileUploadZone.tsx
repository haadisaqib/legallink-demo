import { useRef } from "react";
import { UploadCloud } from "lucide-react";

type FileUploadZoneProps = {
  onFileUpload: (file: File) => void;
  onUploadComplete?: () => void;
  fullScreen?: boolean;
};

const FileUploadZone = ({ onFileUpload, onUploadComplete, fullScreen = false }: FileUploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    onFileUpload(file);
    onUploadComplete?.();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type === "application/pdf") {
        handleFileUpload(file);
      }
    });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.type === "application/pdf") {
        handleFileUpload(file);
      }
    });
  };

  return (
    <div
      className={
        fullScreen
          ? "w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-8 cursor-pointer bg-gray-900 hover:bg-blue-900 transition shadow-lg"
          : "max-w-md mx-auto flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-8 my-8 cursor-pointer bg-gray-900 hover:bg-blue-900 transition shadow-lg"
      }
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onClick={handleClick}
    >
      <UploadCloud size={40} className="text-blue-400 mb-2" />
      <p className="text-white">Drag & drop PDFs here, or click to select</p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUploadZone; 