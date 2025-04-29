// src/app/agent/memory.ts
import fs from "fs";
import path from "path";

const memoryFilePath = path.resolve(process.cwd(), "data", "memory.json");

export const readMemory = () => {
  const data = fs.readFileSync(memoryFilePath, "utf-8");
  return JSON.parse(data);
};

export const writeMemory = (data: any) => {
  fs.writeFileSync(memoryFilePath, JSON.stringify(data, null, 2));
};

export const appendToMemory = (key: string, value: any) => {
  const data = readMemory();
  if (!Array.isArray(data[key])) {
    throw new Error(`Key "${key}" is not an array`);
  }
  data[key].push(value);
  writeMemory(data);
};

export const recallMemory = (keywords: string[] = []): any[] => {
  const data = readMemory();
  const relevantMessages = data.messages.filter((msg: any) => {
    if (!msg.content || typeof msg.content !== "string") return false;
    return keywords.some((keyword) => msg.content.includes(keyword));
  });

  return relevantMessages;
};
