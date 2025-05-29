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
  onToolClick?: (tool: string) => void;
};

const AIToolbar = ({ onToolClick }: AIToolbarProps) => {
  // Access the OpenRouter API key from Vite env
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // Helper to call OpenRouter API
  const callOpenRouter = async (prompt: string) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      const result = data.choices?.[0]?.message?.content || "No result";
      alert(result); // For demo: show result in alert
      return result;
    } catch (err) {
      alert("Error: " + (err as Error).message);
      return null;
    }
  };

  // AI Tool functions
  const handleSummarize = async () => {
    await callOpenRouter("Summarize the following document: [dummy text]");
  };
  const handleRedact = async () => {
    await callOpenRouter("Redact sensitive information from this document: [dummy text]");
  };
  const handleClauseFinder = async () => {
    await callOpenRouter("Find important clauses in this document: [dummy text]");
  };
  const handleChatWithDocument = async () => {
    await callOpenRouter("Chat with this document: [dummy text]");
  };
  const handleAnalyzeRisk = async () => {
    await callOpenRouter("Analyze the risk in this document: [dummy text]");
  };

  // Map tool label to handler
  const toolHandlers: Record<string, () => void> = {
    Summarize: handleSummarize,
    Redact: handleRedact,
    "Clause Finder": handleClauseFinder,
    "Chat with Document": handleChatWithDocument,
    "Analyze Risk": handleAnalyzeRisk,
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