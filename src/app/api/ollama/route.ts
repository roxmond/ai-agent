import { NextRequest, NextResponse } from "next/server";
import { appendToMemory, recallMemory } from "@/app/agent/memory";
import { PERSONA } from "@/app/agent/personality";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  console.log("Received prompt:", prompt);

  try {
    // Recall relevant memory
    const memory = recallMemory(prompt.split(" "));
    const memoryContext = memory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    // Build contextual prompt
    const fullPrompt = memoryContext
      ? `${memoryContext}\n${PERSONA}\nuser: ${prompt}`
      : prompt;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: fullPrompt,
        stream: false,
      }),
    });

    const textResponse = await response.text();
    console.log("Response from Ollama:", textResponse);
    const data = JSON.parse(textResponse);

    // 🧠 Save new interaction to memory
    appendToMemory("messages", { role: "user", content: prompt });
    appendToMemory("messages", { role: "ai", content: data.response });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { error: "Failed to connect to Ollama" },
      { status: 500 }
    );
  }
}
