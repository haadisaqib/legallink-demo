import { FileText, Scissors, Search, MessageCircle, Shield } from "lucide-react";
import React from "react";

const aiTools = [
  { icon: FileText, label: "Summarize" },
  { icon: Scissors, label: "Redact" },
  { icon: Search, label: "Clause Finder" },
  { icon: MessageCircle, label: "Chat with Document" },
  { icon: Shield, label: "Analyze Risk" },
];

type AIToolbarProps = {
  pdfFile: File | null;
};

const BACKEND_API_URL = "http://localhost:4000/api/chat";
const MODEL = "google/gemini-2.0-flash-001"; // Or your preferred model

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the "data:application/pdf;base64," prefix if present
      const result = reader.result as string;
      const base64 = result.split(",")[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const AIToolbar = ({ pdfFile }: AIToolbarProps) => {
  const callOpenRouterWithPDF = async (prompt: string) => {
    if (!pdfFile) {
      alert("No PDF uploaded!");
      return;
    }
    const base64PDF = await fileToBase64(pdfFile);

    const body = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "file",
              file: {
                filename: pdfFile.name,
                file_data: `data:application/pdf;base64,${base64PDF}`,
              },
            },
          ],
        },
      ],
      plugins: [
        {
          id: "file-parser",
          pdf: {
            engine: "native",
          },
        },
      ],
    };

    try {
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const error = await response.json();
        alert("API error: " + (error.details?.error?.message || error.error || response.statusText));
        return;
      }
      const data = await response.json();
      alert(data.choices?.[0]?.message?.content || "No result");
    } catch (err) {
      alert("Error: " + (err as Error).message);
    }
  };

  // Tool handlers
  const toolHandlers: Record<string, () => void> = {
    Summarize: () => callOpenRouterWithPDF("Summarize the following PDF."),
    Redact: () => callOpenRouterWithPDF("Redact PPI from the following PDF."),
    "Clause Finder": () => callOpenRouterWithPDF("Find important clauses in the following PDF."),
    "Chat with Document": () => callOpenRouterWithPDF("Chat with the following PDF."),
    "Analyze Risk": () => callOpenRouterWithPDF("Analyze the risk in the following PDF."),
  };

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
              <span className="text-white">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AIToolbar;