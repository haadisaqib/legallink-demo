// AIToolbar.tsx
import React from 'react';
import { FileText, Scissors, Search, MessageCircle, Shield } from "lucide-react";

type AIToolbarProps = {
  pdfFile: File | null;
};

const BACKEND_API_URL = "http://localhost:4000/api/chat";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const AIToolbar = ({ pdfFile }: AIToolbarProps) => {
  const callBackend = async (tool: string, extra?: string) => {
    if (!pdfFile) {
      alert("No PDF uploaded!");
      return;
    }
    const base64PDF = await fileToBase64(pdfFile);

    try {
      const res = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          extra,
          file: {
            filename: pdfFile.name,
            file_data: `data:application/pdf;base64,${base64PDF}`
          }
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert("Error: " + (json.error || res.statusText));
        return;
      }
      alert(json.content);
    } catch (e) {
      alert("Network error: " + (e as Error).message);
    }
  };

  const toolHandlers: Record<string, () => void> = {
    Summarize:     () => callBackend("Summarize"),
    Redact:        () => callBackend("Redact"),
    "Clause Finder": () => {
      const term = prompt("Enter term for clause search:");
      callBackend("Clause Finder", term || "");
    },
    "Chat with Document": () => callBackend("Chat with Document"),
    "Analyze Risk":      () => callBackend("Analyze Risk"),
  };

  const aiTools = [
    { icon: FileText, label: "Summarize" },
    { icon: Scissors, label: "Redact" },
    { icon: Search, label: "Clause Finder" },
    { icon: MessageCircle, label: "Chat with Document" },
    { icon: Shield, label: "Analyze Risk" },
  ];

  return (
    <aside className="w-full md:w-72 border-l border-gray-800 bg-gray-900 flex flex-col p-4 gap-4 shadow-sm">
      <h3 className="text-lg font-semibold text-white mb-2">AI Tools</h3>
      <ul className="flex flex-col gap-2">
        {aiTools.map(({ icon: Icon, label }) => (
          <li key={label}>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 rounded bg-gray-900 hover:bg-blue-900 border border-gray-800 transition text-white"
              onClick={() => toolHandlers[label]?.()}
            >
              <Icon size={20} className="text-blue-400" />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AIToolbar;
