// AIToolbar.tsx
import React, { useRef, useState, useEffect } from "react";

// Minimal chat message type
interface Message {
  role: "user" | "assistant";
  content: string;
}

type AIToolbarProps = {
  pdfFile: File | null;
};

const AIToolbar = ({ pdfFile }: AIToolbarProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { role: "user", content: userMsg }]);
    setInput("");
    if (!pdfFile) {
      setMessages(msgs => [...msgs, { role: "assistant", content: "No PDF uploaded!" }]);
      return;
    }
    setLoading(true);
    try {
      const base64PDF = await fileToBase64(pdfFile);
      const res = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMsg,
          file: {
            filename: pdfFile.name,
            file_data: `data:application/pdf;base64,${base64PDF}`,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessages(msgs => [...msgs, { role: "assistant", content: "Error: " + (json.error || res.statusText) }]);
      } else {
        setMessages(msgs => [...msgs, { role: "assistant", content: json.content || json.result || "No result" }]);
      }
    } catch (e) {
      setMessages(msgs => [...msgs, { role: "assistant", content: "Network error: " + (e as Error).message }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-gray-700/70 bg-gradient-to-b from-gray-800/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold text-white">Chat</h3>
          <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse"></div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 flex flex-col justify-end pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mb-4 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600/10 to-cyan-600/10 p-3 rounded-full backdrop-blur-sm border border-blue-500/20">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold text-lg">Start the conversation</p>
              <p className="text-white/90 text-sm font-semibold">Ask questions about your legal document</p>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
          >
            <div
              className={`px-4 py-2 rounded-2xl shadow ${
                msg.role === "user"
                  ? "bg-blue-700 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              } max-w-[80%] break-words`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800">
        <form
          onSubmit={handleSend}
          className="flex gap-2 bg-gray-800 rounded-xl p-2"
        >
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={!input.trim() || loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIToolbar;