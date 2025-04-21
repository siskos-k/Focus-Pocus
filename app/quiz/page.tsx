"use client";

import Image from "next/image";

export default function QuizPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#e3f2fd] to-[#f5faff] dark:from-[#1a237e] dark:to-[#1a1a1a] text-[#2d2d2d] dark:text-[#f5faff] font-[family-name:var(--font-geist-sans)]">
      {/* Header with logo */}
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
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#21a0ac] dark:text-[#4db6ac]">
          Take the quiz
        </h1>

       {/* Start Button */}
       <button
          className="mt-6 rounded-full bg-[#21a0ac] text-white px-6 py-3 text-lg font-medium shadow-md hover:bg-[#004d40] transition-transform transform hover:scale-105"
          onClick={() => alert("Quiz functionality coming soon!")}
        >
          Start ASRS Quiz
        </button>
      {/* Quiz content */}
      <main className="flex flex-col items-center text-center px-8 py-8 sm:py-16 gap-6">
        {/* New AI personalization intro */}
        <p className="text-base sm:text-lg max-w-2xl text-[#424242] dark:text-[#cfd8dc]">
          Your responses to this quiz will not only give you insights based on the official ASRS scale, 
          but also power a personalized AI experience. Focus Pocus will use your answers to provide 
          tailored focus strategies, progress tracking, and supportive tools to help you thrive with (or without) ADHD.
        </p>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#21a0ac] dark:text-[#4db6ac]">
          ADHD Self-Check (ASRS)
        </h1>

        <p className="text-base sm:text-lg max-w-xl text-[#424242] dark:text-[#cfd8dc]">
          This quiz is based on the <strong>ASRS (Adult ADHD Self-Report Scale)</strong>, a clinically validated tool developed by the World Health Organization.
        </p>
        <p className="text-base sm:text-lg max-w-xl text-[#424242] dark:text-[#cfd8dc]">
          It’s not a formal diagnosis—but it can help you understand your attention patterns and decide if further support might be helpful.
        </p>

 
        {/* Placeholder: Progress indicator or help tip */}
        <p className="text-sm mt-4 text-[#757575] dark:text-[#b0bec5]">
          ⏳ 18 quick questions – takes under 10 minutes
        </p>
      </main>

      {/* Footer navigation */}
      <footer className="py-6 text-center">
        <a
          href="/"
          className="text-[#21a0ac] dark:text-[#4db6ac] hover:underline text-sm"
        >
          ← Back to Home
        </a>
      </footer>
    </div>
  );
}
