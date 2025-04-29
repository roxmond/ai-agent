// src/app/api/ollama/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  console.log("Received prompt:", prompt);
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
      }),
    });

    const textResponse = await response.text();
    console.log("Response from Ollama:", textResponse);
    const data = JSON.parse(textResponse);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { error: "Failed to connect to Ollama" },
      { status: 500 }
    );
  }
}
