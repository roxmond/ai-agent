"use client";
import { useOllama } from "@/app/lib/ollamaResponse";
import { ReactNode, useEffect, useRef, useState } from "react";
import { sendMessage as sendMessageHandler } from "@/app/lib/sendMessage";

interface Message {
  role: "user" | "ai";
  content: ReactNode;
}

interface ConsoleMessage {
  message: ReactNode;
  timestamp: ReactNode;
}

export default function Home() {
  const { prompt, setPrompt, handleSubmit } = useOllama();
  const [messages, setMessages] = useState<Message[]>([]);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleMessages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    sendMessageHandler({
      prompt,
      setPrompt,
      setMessages,
      setConsoleMessages,
      handleSubmit,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-between flex-wrap lg:flex-nowrap">
      {/* Chat Section */}
      <div className="w-full mockup-code border-r-2 m-2 border-r-slate-500 flex flex-col justify-between lg:w-[74%]">
        {/* Chat Bubbles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs break-words p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Field */}
        <div className="p-4 border-t border-gray-300">
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
        </div>
      </div>

      {/* Console Section */}
      <div className="w-full mockup-code border-l-2 m-2 border-l-slate-500 flex flex-col justify-between lg:w-[24%]">
        <span className="text-sm text-slate-400 ml-2 px-2 p-2">
          Console Log
        </span>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {consoleMessages.map((log, idx) => (
            <div key={idx} className="text-xs text-slate-400">
              [{log.timestamp}] {log.message}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
}
