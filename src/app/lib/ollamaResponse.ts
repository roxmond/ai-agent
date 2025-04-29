"use client";
import { useState } from "react";

interface OllamaResponse {
  response?: string;
  error?: string;
}

interface UseOllamaHook {
  ollamaResponse: OllamaResponse;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<OllamaResponse>;
}

export const useOllama = (): UseOllamaHook => {
  const [ollamaResponse, setOllamaResponse] = useState<OllamaResponse>({});
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (): Promise<OllamaResponse> => {
    try {
      const res = await fetch("/api/ollama", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const response: OllamaResponse = { response: data.response };
      setOllamaResponse(response);
      return response;
    } catch {
      const error = "Failed to fetch response from Ollama";
      const response: OllamaResponse = { error };
      setOllamaResponse(response);
      return response;
    }
  };

  return { prompt, setPrompt, handleSubmit, ollamaResponse };
};
