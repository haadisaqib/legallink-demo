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
    <aside className="w-[95vw] md:w-[32rem] border-l border-gray-800 bg-gray-900 flex flex-col p-0 shadow-sm h-full">
      <div className="flex flex-col h-full">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-xl font-semibold text-white mb-2">Chat</h3>
        </div>
        <div className="flex-1 flex flex-col justify-end px-4 pb-4">
          <div className="flex-1 overflow-y-auto flex flex-col gap-2 justify-end">
            {messages.length === 0 && (
              <div className="flex flex-1 items-center justify-center text-gray-500 h-full">
                Start the conversation...
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
          <form
            onSubmit={handleSend}
            className="flex gap-2 mt-4 bg-gray-800 rounded-xl p-2 border border-gray-700"
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
    </aside>
  );
};

export default AIToolbar;