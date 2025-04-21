"use client";

import { useEffect, useState } from "react";

export default function GeminiChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load quiz data on first render
  useEffect(() => {
    const stored = localStorage.getItem("adhd_quiz_data");

    if (stored && messages.length === 0) {
      const quizData = JSON.parse(stored);
      const formatted = quizData
        .map((item: any, index: number) => `${index + 1}. ${item.question} — Answer: ${item.answer}`)
        .join("\n");

      const firstUserMessage = {
        role: "user",
        content: `
You are a helpful assistant that analyzes ADHD self-report results.
Based on the following answers, provide a non-clinical interpretation, and ask 1–3 follow-up questions if relevant.
Be friendly and supportive.

Here are my quiz results:
${formatted}
        `
      };

      setMessages([firstUserMessage]);
      sendToGemini([firstUserMessage]);
    }
  }, []);

  const sendToGemini = async (messagesToSend: any[]) => {
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      const data = await res.json();
      if (data?.text) {
        setMessages([...messagesToSend, { role: "assistant", content: data.text }]);
      }
    } catch (err) {
      console.error("Error talking to Gemini:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    sendToGemini(newMessages);
    setInput("");
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-between bg-[#f5faff] dark:bg-[#1a1a1a] text-[#2d2d2d] dark:text-white">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-[#21a0ac]">Your ADHD Chat Summary</h1>
        <div className="flex flex-col gap-2 bg-white dark:bg-[#2c2c2c] p-4 rounded-lg shadow-md overflow-y-auto max-h-[60vh]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded ${
                msg.role === "user" ? "bg-[#e3f2fd] self-end" : "bg-[#d0f0f4] self-start"
              }`}
            >
              <p><strong>{msg.role === "user" ? "You" : "Gemini"}:</strong> {msg.content}</p>
            </div>
          ))}
          {loading && <p className="italic text-sm text-gray-500">Gemini is thinking...</p>}
        </div>
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-[#21a0ac] hover:bg-[#004d40] text-white px-4 py-2 rounded-full font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
