"use client";

import { useEffect, useState } from "react";

export default function GeminiChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adhd_quiz_data");

    if (stored && messages.length === 0) {
      const quizData = JSON.parse(stored);
      const formatted = quizData
        .map((item: any, index: number) => `${index + 1}. ${item.question} — Answer: ${item.answer}`)
        .join("\n");

      const firstMessage = {
        role: "user",
        content: `
You are a helpful assistant specialized in psychology. The user has completed an ADHD self-report (ASRS). Analyze their answers and do the following: (1) If certain symptom areas are very pronounced, ask 2-3 follow-up questions to clarify their experience. (2) Then provide a concise summary of the results, including which symptoms are most prominent and a non-clinical estimate of ADHD likelihood. Be empathetic and informative, and avoid making a medical diagnosis.
You are now in a conversation with the user. Your job is to respond only when the user sends a message. Never create responses for the user or summarize what the user might say. Just wait, respond kindly, and ask one follow-up at a time if needed. Be conversational and helpful.

Here are their quiz responses:

${formatted}
        `
      };

      setMessages([firstMessage]);
      sendToGemini([firstMessage]);
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
    <div className="min-h-screen bg-[#f5faff] text-[#2d2d2d] p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-[#21a0ac]">Your ADHD Chat Summary</h1>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 overflow-y-auto max-h-[65vh] flex flex-col gap-4">
          {messages.slice(1).map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-md w-fit max-w-full whitespace-pre-wrap ${
                msg.role === "user"
                  ? "ml-auto bg-[#e3f2fd] text-right"
                  : "mr-auto bg-[#e0f7fa] text-left"
              }`}
            >
              <p className="text-sm">
                <strong>{msg.role === "user" ? "You" : "Gemini"}:</strong> {msg.content}
              </p>
            </div>
          ))}
          {loading && (
            <div className="text-sm italic text-gray-500">Gemini is thinking...</div>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none shadow-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-[#21a0ac] hover:bg-[#00796b] text-white px-6 py-2 rounded-full font-medium transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
