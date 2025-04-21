import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  try {
    const chat = model.startChat({ history: messages.slice(0, -1) });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;

    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to fetch Gemini response" }, { status: 500 });
  }
}
