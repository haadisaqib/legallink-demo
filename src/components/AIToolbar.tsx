// src/components/AIToolbar.tsx
import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, X } from 'lucide-react';
import { fetchAuthSession } from '@aws-amplify/auth';

const BACKEND_API_URL = 'http://localhost:4000/api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  contextFiles?: string[];
}

interface PDFDocument {
  id: string;
  name: string;
  url: string;
  file: File;
}

type AIToolbarProps = {
  pdfFile: File;
  allPdfs: PDFDocument[];
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = (reader.result as string).split(',')[1] || '';
      res(b64);
    };
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

const LoadingDots = () => (
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
  </div>
);

export default function AIToolbar({ pdfFile, allPdfs }: AIToolbarProps) {
  const [messages, setMessages]               = useState<Message[]>([]);
  const [input, setInput]                     = useState('');
  const [loading, setLoading]                 = useState(false);
  const [showMentions, setShowMentions]       = useState(false);
  const [mentionSearch, setMentionSearch]     = useState('');
  const [selectedContextFiles, setSelected]   = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  // auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // handle "@mention" for picking extra docs
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    const last = val.split(' ').pop() || '';
    if (last.startsWith('@')) {
      setShowMentions(true);
      setMentionSearch(last.slice(1));
    } else {
      setShowMentions(false);
    }
  };

  const pickMention = (name: string) => {
    if (!selectedContextFiles.includes(name)) {
      setSelected([...selectedContextFiles, name]);
    }
    setShowMentions(false);
    setInput(input.replace(/@\w*$/, ''));
  };

  const removeMention = (name: string) => {
    setSelected(selectedContextFiles.filter((n) => n !== name));
  };

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // push user message
    setMessages((m) => [
      ...m,
      { role: 'user', content: input, contextFiles: selectedContextFiles },
    ]);
    const userMsg = input;
    setInput('');
    setSelected([]);

    setLoading(true);

    let jwtToken = '';
    try {
      const session = await fetchAuthSession();
      jwtToken = session.tokens?.idToken?.toString() || '';
    } catch (e) {
      console.warn('No JWT token found for chat API request.');
    }

    try {
      // build array of main + any mentioned
      const toSend = [
        { name: pdfFile.name, file: pdfFile },
        ...selectedContextFiles
          .map((name) => allPdfs.find((p) => p.name === name))
          .filter((x): x is PDFDocument => !!x),
      ];

      // base64 encode
      const filesData = await Promise.all(
        toSend.map((p) =>
          fileToBase64(p.file).then((b64) => ({
            filename: p.name,
            file_data: `data:application/pdf;base64,${b64}`,
          }))
        )
      );

      // call server
      const res = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(jwtToken ? { 'Authorization': jwtToken } : {})
        },
        body: JSON.stringify({
          prompt: userMsg,
          files: filesData,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.statusText);

      setMessages((m) => [
        ...m,
        { role: 'assistant', content: json.content },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Error: ' + (err as Error).message },
      ]);
    }

    setLoading(false);
  };

  // filter mention list
  const filtered = allPdfs.filter((p) =>
    p.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <aside className="w-[95vw] md:w-[32rem] h-screen flex flex-col border-l border-gray-800 bg-gray-900 overflow-hidden">
      {/* chat */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Start the conversation…
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`
                  max-w-[80%] px-4 py-2 rounded-2xl shadow
                  whitespace-pre-wrap break-words
                  ${
                    msg.role === 'user'
                      ? 'bg-blue-700 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none prose prose-invert'
                  }
                  [&_pre]:whitespace-pre-wrap [&_pre]:break-words
                  [&_code]:whitespace-pre-wrap [&_code]:break-words
                `}
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <>
                    {msg.content}
                    {msg.contextFiles?.length ? (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.contextFiles.map((f) => (
                          <span
                            key={f}
                            className="text-xs bg-blue-800 px-2 py-1 rounded"
                          >
                            @{f}
                          </span>
                        ))}
                      </div>
                    ) : null}
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

      {/* mentions dropdown */}
      <div className="px-4">
        {showMentions && (
          <div className="absolute bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto w-[32rem]">
            {filtered.map((pdf) => (
              <button
                key={pdf.id}
                onClick={() => pickMention(pdf.name)}
                className="w-full text-left px-4 py-2 hover:bg-blue-800 text-white flex items-center gap-2"
              >
                <FileText size={16} />
                {pdf.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* selected mentions */}
      {selectedContextFiles.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-800 flex flex-wrap gap-2">
          {selectedContextFiles.map((name) => (
            <div
              key={name}
              className="flex items-center gap-1 bg-blue-800 text-white px-2 py-1 rounded text-sm"
            >
              <FileText size={14} />
              <span>{name}</span>
              <button onClick={() => removeMention(name)}>
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
          <input
            type="text"
            value={input}
            onChange={onInputChange}
            placeholder="Type your message… (use @ to include other PDFs)"
            className="flex-1 bg-gray-900 px-3 py-2 rounded-lg text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
