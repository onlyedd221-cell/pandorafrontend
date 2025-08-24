"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ChatHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md flex items-center px-4 py-3 shadow-md">
      {/* Back Button */}
      <button
        onClick={() => router.push("/booking")}
        className="flex items-center gap-2 cursor-pointer font-bold text-white hover:text-pink-500"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Centered Title */}
      <h1 className="flex-1 text-center font-semibold text-lg text-white">
        Chat Support
      </h1>

      {/* Placeholder to balance flex */}
      <div className="w-6" /> {/* same width as the ArrowLeft icon + padding */}
    </header>
  );
}
