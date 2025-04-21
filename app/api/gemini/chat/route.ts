import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Flatten messages into a single conversation string
  const prompt = messages
    .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n");

  try {
    const model = genAI.getGenerativeModel({ model: "models/learnlm-1.5-pro-experimental" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Gemini response" },
      { status: 500 }
    );
  }
}
