// AIToolbar.tsx
import React, { useState, useEffect } from 'react';
import { FileText, Scissors, Search, MessageCircle, Shield, ArrowLeft } from "lucide-react";
import ReactMarkdown from 'react-markdown';

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

const aiTools = [
  { icon: FileText, label: "Summarize" },
  { icon: Scissors, label: "Redact" },
  { icon: Search, label: "Clause Finder" },
  { icon: MessageCircle, label: "Chat with Document" },
  { icon: Shield, label: "Analyze Risk" },
];

const AIToolbar = ({ pdfFile }: AIToolbarProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Prompt for clause finder
  const [clauseTerm, setClauseTerm] = useState<string>("");

  useEffect(() => {
    if (!selectedTool) {
      setResponse(null);
      setClauseTerm("");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setResponse(null);

      let extra = undefined;
      if (selectedTool === "Clause Finder") {
        let term = clauseTerm;
        if (!term) {
          term = prompt("Enter term for clause search:") || "";
          setClauseTerm(term);
        }
        extra = term;
        if (!term) {
          setLoading(false);
          setSelectedTool(null);
          return;
        }
      }

      if (!pdfFile) {
        setResponse("No PDF uploaded!");
        setLoading(false);
        return;
      }
      const base64PDF = await fileToBase64(pdfFile);

      try {
        const res = await fetch(BACKEND_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tool: selectedTool,
            extra,
            file: {
              filename: pdfFile.name,
              file_data: `data:application/pdf;base64,${base64PDF}`
            }
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          setResponse("Error: " + (json.error || res.statusText));
        } else {
          setResponse(json.content || json.result || "No result");
        }
      } catch (e) {
        setResponse("Network error: " + (e as Error).message);
      }
      setLoading(false);
    };

    fetchData();
    // Only re-run when selectedTool or clauseTerm changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool, clauseTerm, pdfFile]);

  const renderToolPanel = (label: string) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setSelectedTool(null)}
          className="p-1 hover:bg-gray-800 rounded transition"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <div className="text-white min-h-[120px] flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto p-2 bg-gray-800 rounded border border-gray-700">
            <div className="prose prose-invert">
              <ReactMarkdown remarkPlugins={[]}>
                {response || ''}
              </ReactMarkdown>
            </div>
          </div>
        )}        
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-72 border-l border-gray-800 bg-gray-900 flex flex-col p-4 gap-4 shadow-sm">
      {!selectedTool ? (
        <>
          <h3 className="text-lg font-semibold text-white mb-2">AI Tools</h3>
          <ul className="flex flex-col gap-2">
            {aiTools.map(({ icon: Icon, label }) => (
              <li key={label}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2 rounded bg-gray-900 hover:bg-blue-900 border border-gray-800 transition text-white"
                  onClick={() => setSelectedTool(label)}
                >
                  <Icon size={20} className="text-blue-400" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        renderToolPanel(selectedTool)
      )}
    </aside>
  );
};

export default AIToolbar;