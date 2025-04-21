"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const questions = [
  "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
  "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
  "How often do you have problems remembering appointments or obligations?",
  "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
  "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
  "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
  "How often do you make careless mistakes when you have to work on a boring or difficult project?",
  "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
  "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
  "How often do you misplace or have difficulty finding things at home or at work?",
  "How often are you distracted by activity or noise around you?",
  "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
  "How often do you feel restless or fidgety?",
  "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
  "How often do you find yourself talking too much when you are in social situations?",
  "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
  "How often do you have difficulty waiting your turn in situations when turn taking is required?",
  "How often do you interrupt others when they are busy?"
];

const answerOptions = [
  { label: "Never", score: 0 },
  { label: "Rarely", score: 1 },
  { label: "Sometimes", score: 2 },
  { label: "Often", score: 3 },
  { label: "Very Often", score: 4 }
];

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const router = useRouter();

  const handleAnswer = (label: string, score: number) => {
    const response = {
      question: questions[currentQuestion],
      answer: label,
      score
    };

    setResponses(prev => [...prev, response]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleViewChat = () => {
    localStorage.setItem("adhd_quiz_data", JSON.stringify(responses));
    router.push("/chat");
  };

  const totalScore = responses.reduce((sum, r) => sum + r.score, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#e3f2fd] to-[#f5faff] text-[#2d2d2d] font-[family-name:var(--font-geist-sans)]">
      
      {/* Header */}
      <header className="w-full flex justify-center py-8">
        <Image
          src="/assets/main_logo.png"
          alt="Focus Pocus logo"
          width={250}
          height={250}
          priority
          className="animate-fade-in"
        />
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center text-center px-8 py-8 sm:py-16 gap-6 w-full max-w-3xl">
        {!quizStarted ? (
          <>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#21a0ac]">
              Take the quiz
            </h1>

            <p className="text-base sm:text-lg text-[#424242]">
              Your responses to this quiz will not only give you insights based on the official ASRS scale, 
              but also power a personalized AI experience. Focus Pocus will use your answers to provide 
              tailored focus strategies, progress tracking, and supportive tools to help you thrive with (or without) ADHD.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#21a0ac]">
              ADHD Self-Check (ASRS)
            </h2>

            <p className="text-base sm:text-lg text-[#424242]">
              This quiz is based on the <strong>ASRS (Adult ADHD Self-Report Scale)</strong>, a clinically validated tool developed by the World Health Organization.
              It’s not a formal diagnosis—but it can help you understand your attention patterns and decide if further support might be helpful.
            </p>

            <p className="text-sm mt-2 text-[#757575]">
              ⏳ 18 quick questions – takes under 10 minutes
            </p>
            <button
              className="mt-6 rounded-full bg-[#21a0ac] text-white px-6 py-3 text-lg font-medium shadow-md hover:bg-[#004d40] transition-transform transform hover:scale-105"
              onClick={() => setQuizStarted(true)}
            >
              Start ASRS Quiz
            </button>
          </>
        ) : !isFinished ? (
          <div className="w-full mt-4">
            <h3 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-lg mb-6">{questions[currentQuestion]}</p>
            <div className="flex flex-col gap-3">
              {answerOptions.map(opt => (
                <button
                  key={opt.label}
                  className="rounded-full bg-[#21a0ac] text-white py-3 px-4 font-medium hover:bg-[#004d40] transition-all"
                  onClick={() => handleAnswer(opt.label, opt.score)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 w-full flex flex-col items-center gap-6">
            <h3 className="text-2xl font-bold text-[#21a0ac]">Quiz Complete 🎉</h3>
            <p className="text-lg">
              Total Score: <strong>{totalScore}</strong> out of {questions.length * 4}
            </p>
            <p className="text-sm text-[#757575]">
              Higher scores may indicate more frequent ADHD-related symptoms.
            </p>
            <pre className="mt-4 p-4 bg-gray-100 text-sm max-w-full overflow-auto rounded-lg text-left">
              {JSON.stringify(responses, null, 2)}
            </pre>
            <button
              className="rounded-full bg-[#21a0ac] text-white px-6 py-3 text-lg font-medium shadow-md hover:bg-[#004d40] transition-transform transform hover:scale-105"
              onClick={handleViewChat}
            >
              Continue to AI Chat →
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <a
          href="/"
          className="text-[#21a0ac] hover:underline text-sm"
        >
          ← Back to Home
        </a>
      </footer>
    </div>
  );
}
