import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#e3f2fd] to-[#f5faff] dark:from-[#1a237e] dark:to-[#1a1a1a] text-[#2d2d2d] dark:text-[#f5faff] font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-8 py-16 sm:py-24 gap-8">
        {/* Logo */}
        <Image
          src="/assets/main_logo.png"
          alt="Hocus Pocus logo"
          width={250}
          height={250}
          priority
          className="animate-fade-in"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#21a0ac] dark:text-[#4db6ac]">
          Welcome to Focus Pocus
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl text-[#424242] dark:text-[#cfd8dc]">
          Focus Pocus is your personalized tool for understanding and improving focus. 
          Using a custom AI-powered quiz, we help estimate whether you may have ADHD 
          and provide tailored insights through an interactive experience with our custom LLM.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="rounded-full bg-[#21a0ac] text-white px-6 py-3 text-lg font-medium shadow-md hover:bg-[#004d40] transition-transform transform hover:scale-105"
            href="/get-started"
          >
            Get Started
          </a>
          <a
            className="rounded-full border border-[#21a0ac] text-[#21a0ac] px-6 py-3 text-lg font-medium shadow-md hover:bg-[#e0f2f1] dark:hover:bg-[#004d40] hover:text-[#004d40] transition-transform transform hover:scale-105"
            href="/learn-more"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg[#21a0ac] dark:bg-[#121212] py-16 px-8 sm:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#21a0ac] dark:text-[#4db6ac] mb-8">
          What is Focus Pocus?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            {/* <Image
              src="/assets/focus_icon.png"
              alt="Focus Icon"
              width={80}
              height={80}
            /> */}
            <h3 className="text-xl font-semibold">ADHD Estimation</h3>
            <p className="text-sm text-[#424242] dark:text-[#cfd8dc]">
              Take our AI-powered quiz to estimate whether you may have ADHD and gain valuable insights.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* <Image
              src="/assets/organize_icon.png"
              alt="Organize Icon"
              width={80}
              height={80}
            /> */}
            <h3 className="text-xl font-semibold">Custom AI Interaction</h3>
            <p className="text-sm text-[#424242] dark:text-[#cfd8dc]">
              Interact with our custom LLM to receive personalized advice and strategies for improving focus.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            {/* <Image
              src="/assets/magic_icon.png"
              alt="Magic Icon"
              width={80}
              height={80}
            /> */}
            <h3 className="text-xl font-semibold">Tailored Solutions</h3>
            <p className="text-sm text-[#424242] dark:text-[#cfd8dc]">
              Discover tools and resources designed to help you stay organized and productive.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#21a0ac] dark:bg-[#004d40] text-white text-center">
        <div className="flex flex-wrap justify-center gap-6">
          <a
            className="hover:underline"
            href="/features"
          >
            Features
          </a>
          <a
            className="hover:underline"
            href="/resources"
          >
            Resources
          </a>
          <a
            className="hover:underline"
            href="/contact"
          >
            Contact Us
          </a>
        </div>
        <p className="mt-4 text-sm">&copy; 2025 Focus Pocus. All rights reserved.</p>
      </footer>
    </div>
  );
}
