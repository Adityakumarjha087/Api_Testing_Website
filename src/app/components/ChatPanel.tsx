"use client";
import { useState, useEffect, useRef } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPanel({
  messages,
  setMessages,
  requestDraft,
  setRequestDraft,
  setResponseDraft,
}: {
  messages: Msg[];
  setMessages: (v: Msg[] | ((p: Msg[]) => Msg[])) => void;
  requestDraft: any;
  setRequestDraft: (v: any) => void;
  setResponseDraft: (v: any) => void;
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const clearChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
    // Auto-focus the input
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  const add = (m: Msg) => setMessages((prev) => [...prev, m]);

  const sendToAI = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          provider: "groq",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI service failed");
      }

      add({ role: "assistant", text: data.message });
    } catch (error: any) {
      add({ 
        role: "assistant", 
        text: `❌ Error: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    add({ role: "user", text });
    setInput("");

    // Check for special commands first
    if (text === "run") {
      await handleRunCommand();
      return;
    }

    if (text.startsWith("url ")) {
      await handleUrlCommand(text);
      return;
    }

    if (text.startsWith("method ")) {
      await handleMethodCommand(text);
      return;
    }

    if (text.startsWith("body ")) {
      await handleBodyCommand(text);
      return;
    }

    // Send to AI for natural language processing
    await sendToAI(text);
  };

  const handleRunCommand = async () => {
    add({ role: "assistant", text: "Running request..." });

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: requestDraft.method,
          url: requestDraft.url,
          headers: requestDraft.headers,
          body: requestDraft.body,
        }),
      });

      const data = await res.json();
      setResponseDraft({ status: data.status, body: data.body });
      add({ role: "assistant", text: `Response received ✅\n\nStatus: ${data.status}\nBody: ${JSON.stringify(data.body, null, 2)}` });
    } catch {
      add({ role: "assistant", text: "Error while running request ❌" });
    }
  };

  const handleUrlCommand = async (text: string) => {
    const u = text.slice(4).trim();
    setRequestDraft({ ...requestDraft, url: u });
    add({ role: "assistant", text: `URL set ✅ ${u}` });
  };

  const handleMethodCommand = async (text: string) => {
    const m = text.slice(7).trim().toUpperCase();
    setRequestDraft({ ...requestDraft, method: m });
    add({ role: "assistant", text: `Method set ✅ ${m}` });
  };

  const handleBodyCommand = async (text: string) => {
    const raw = text.slice(5).trim();
    try {
      const b = JSON.parse(raw);
      setRequestDraft({ ...requestDraft, body: b });
      add({ role: "assistant", text: "Body set ✅" });
    } catch {
      add({
        role: "assistant",
        text: 'Body JSON galat hai. Example: body {"a":1}',
      });
    }
  };

  return (
    <div className="h-full rounded-2xl border border-border/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-6 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-foreground hidden sm:block">API Testing Assistant</div>
            <div className="text-sm font-bold text-foreground sm:hidden">Chat</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 group"
            title="Clear chat"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto py-4 pr-2 max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
        {messages.length === 0 && (
          <div className="text-center py-8 sm:py-12 animate-fade-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-8 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-lg sm:text-xl font-bold text-foreground mb-2">API Testing Assistant</div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 max-w-sm mx-auto">
              Test APIs with natural language
            </div>
            
            {/* Example Card - Simplified for mobile */}
            <div 
              onClick={() => handleExampleClick("Test the JSONPlaceholder API")}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 max-w-sm mx-auto cursor-pointer hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <div className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Try:</div>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-mono bg-white/50 dark:bg-slate-800/50 rounded-lg px-2 sm:px-3 py-2 text-center">"Test the JSONPlaceholder API"</div>
              <div className="text-xs text-blue-500 dark:text-blue-400 mt-2 text-center">Click to use this example</div>
            </div>
          </div>
        )}
        
        {/* Message List */}
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex animate-fade-in ${m.role === "user" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex gap-3 max-w-[85%]">
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm whitespace-pre-wrap break-words shadow-lg hover:shadow-xl transition-all duration-300 ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-border/50 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-border/50 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Hidden div for scrolling reference */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              className="w-full rounded-2xl border border-border/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Describe API test or endpoint..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              disabled={isLoading}
            />
            {input && (
              <button
                onClick={() => setInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            className="btn btn-primary px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift"
            onClick={send}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="spinner w-5 h-5"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="font-semibold">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
