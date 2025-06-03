// src/components/FileUploadZone.tsx
import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

type FileUploadZoneProps = {
  onFileUpload: (file: File) => void;
  onUploadComplete?: () => void;
  fullScreen?: boolean;
};

export default function FileUploadZone({
  onFileUpload,
  onUploadComplete,
  fullScreen = false,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      }
    });
    onUploadComplete?.();
  };

  return (
    <div
      className={`
        ${fullScreen ? 'w-full h-full' : 'max-w-md mx-auto my-8'}
        flex flex-col items-center justify-center
        border-2 border-dashed border-blue-400
        rounded-lg p-8 cursor-pointer
        bg-gray-900 hover:bg-blue-900 transition shadow-lg
      `}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
    >
      <UploadCloud size={40} className="text-blue-400 mb-2" />
      <p className="text-white">Drag & drop PDFs here, or click to select</p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  );
}
