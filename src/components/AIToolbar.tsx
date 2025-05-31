// src/components/AIToolbar.tsx
import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, X } from "lucide-react";
// import remarkGfm from "remark-gfm"; // if you want GitHub-style tables, strikethrough, etc.

const BACKEND_API_URL = "http://localhost:4000/api/chat";

// Loading animation component
const LoadingDots = () => (
  <div className="flex gap-1 p-2">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
  </div>
);

interface Message {
  role: "user" | "assistant";
  content: string;
  contextFiles?: string[];
}

interface PDFDocument {
  id: string;
  name: string;
  file: File;
}

type AIToolbarProps = {
  pdfFile: File | null;
  allPdfs?: PDFDocument[];
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = (reader.result as string).split(",")[1] || "";
      res(data);
    };
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

export default function AIToolbar({ pdfFile, allPdfs = [] }: AIToolbarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [selectedContextFiles, setSelectedContextFiles] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Check for @ symbol
    const lastWord = value.split(" ").pop() || "";
    if (lastWord.startsWith("@")) {
      setShowMentions(true);
      setMentionSearch(lastWord.slice(1));
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (pdfName: string) => {
    if (!selectedContextFiles.includes(pdfName)) {
      setSelectedContextFiles([...selectedContextFiles, pdfName]);
    }
    setShowMentions(false);
    setInput(input.replace(/@\w*$/, ""));
  };

  const removeContextFile = (pdfName: string) => {
    setSelectedContextFiles(selectedContextFiles.filter(name => name !== pdfName));
  };

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { 
      role: "user", 
      content: userMsg,
      contextFiles: selectedContextFiles 
    }]);
    setInput("");
    setSelectedContextFiles([]);

    if (!pdfFile) {
      setMessages((m) => [...m, { role: "assistant", content: "No PDF uploaded!" }]);
      return;
    }

    setLoading(true);
    try {
      // Get all mentioned files including the main file
      const allFiles = [
        { name: pdfFile.name, file: pdfFile },
        ...selectedContextFiles
          .map(fileName => {
            const pdf = allPdfs.find(p => p.name === fileName);
            return pdf ? { name: pdf.name, file: pdf.file } : null;
          })
          .filter((file): file is { name: string; file: File } => file !== null)
      ];

      // Convert all files to base64
      const filesData = await Promise.all(
        allFiles.map(async ({ name, file }) => ({
          filename: name,
          file_data: `data:application/pdf;base64,${await fileToBase64(file)}`
        }))
      );

      const res = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMsg,
          files: filesData // Send all files as an array
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.statusText);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: json.content || json.result || "No result" },
      ]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Error: " + (err as Error).message }]);
    }
    setLoading(false);
  };

  const filteredPdfs = allPdfs.filter(pdf => 
    pdf.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <aside className="w-[95vw] md:w-[32rem] h-screen flex flex-col border-l border-gray-800 bg-gray-900 overflow-hidden">
      {/* chat history */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Start the conversation...
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%] px-4 py-2 rounded-2xl shadow
                  whitespace-pre-wrap break-words
                  ${msg.role === "user"
                    ? "bg-blue-700 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-100 rounded-bl-none prose prose-invert"}
                  [&_pre]:whitespace-pre-wrap [&_pre]:break-words
                  [&_code]:whitespace-pre-wrap [&_code]:break-words
                `}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    // remarkPlugins={[remarkGfm]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <>
                    {msg.content}
                    {msg.contextFiles && msg.contextFiles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.contextFiles.map(file => (
                          <span key={file} className="text-xs bg-blue-800 px-2 py-1 rounded">
                            @{file}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-none px-4 py-2 shadow">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Selected context files */}
      {selectedContextFiles.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-800 flex flex-wrap gap-2">
          {selectedContextFiles.map(file => (
            <div key={file} className="flex items-center gap-1 bg-blue-800 text-white px-2 py-1 rounded text-sm">
              <FileText size={14} />
              <span>{file}</span>
              <button
                onClick={() => removeContextFile(file)}
                className="hover:text-red-400"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* input */}
      <div className="border-t border-gray-800 p-4">
        <form
          onSubmit={send}
          className="flex gap-2 bg-gray-800 rounded-xl p-2 border border-gray-700"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message... (use @ to mention documents)"
              className="w-full bg-gray-900 px-3 py-2 rounded-lg text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showMentions && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-48 overflow-y-auto">
                {filteredPdfs.map(pdf => (
                  <button
                    key={pdf.id}
                    onClick={() => handleMentionSelect(pdf.name)}
                    className="w-full px-4 py-2 text-left text-white hover:bg-blue-800 flex items-center gap-2"
                  >
                    <FileText size={16} />
                    <span>{pdf.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-white disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </aside>
  );
}
