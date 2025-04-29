// /lib/sendMessage.tsx
"use client";
import { Dispatch, ReactNode } from "react";
import OllamaErrorDisplay from "@/app/components/consoleUI/OllamaErrorDisplay";

interface Message {
  role: "user" | "ai";
  content: ReactNode;
}

interface ConsoleMessage {
  message: ReactNode;
  timestamp: ReactNode;
}

interface SendMessageParams {
  prompt: string;
  setPrompt: Dispatch<React.SetStateAction<string>>;
  setMessages: Dispatch<React.SetStateAction<Message[]>>;
  setConsoleMessages: Dispatch<React.SetStateAction<ConsoleMessage[]>>;
  handleSubmit: () => Promise<{ response?: string; error?: string }>;
}

export const sendMessage = async ({
  prompt,
  setPrompt,
  setMessages,
  setConsoleMessages,
  handleSubmit,
}: SendMessageParams) => {
  if (!prompt.trim()) return;

  const userMessage: Message = { role: "user", content: prompt };
  setMessages((prev) => [...prev, userMessage]);
  setConsoleMessages((prev) => [
    ...prev,
    {
      message: `Sent prompt: "${prompt}"`,
      timestamp: (
        <span className="text-violet-400">
          {new Date().toLocaleTimeString()}
        </span>
      ),
    },
  ]);

  setMessages((prev) => [
    ...prev,
    {
      role: "ai",
      content: <span className="loading loading-dots loading-xs"></span>,
    },
  ]);

  setPrompt("");

  const { response, error } = await handleSubmit();

  setMessages((prev) => {
    const updated = [...prev];
    updated[updated.length - 1] = {
      role: "ai",
      content: response || "No response.",
    };
    return updated;
  });

  if (error) {
    setConsoleMessages((prev) => [
      ...prev,
      {
        message: <OllamaErrorDisplay errorMessage={error} />,
        timestamp: (
          <span className="text-violet-400">
            {new Date().toLocaleTimeString()}
          </span>
        ),
      },
    ]);
  } else {
    setConsoleMessages((prev) => [
      ...prev,
      {
        message: `Received response: ${response}`,
        timestamp: (
          <span className="text-violet-400">
            {new Date().toLocaleTimeString()}
          </span>
        ),
      },
    ]);
  }
};
