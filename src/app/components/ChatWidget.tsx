"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import SupportToast from "./SupportToast";

export default function ChatWidget() {
  const router = useRouter();

  const handleChatOpen = () => {
    // Simply route to the chat page
    router.push("/chat");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleChatOpen}
        className="fixed bottom-10 right-6 cursor-pointer bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
      >
        <MessageCircle size={28} />
      </button>

      {/* Optional Support Toast */}
      <SupportToast onChatOpen={handleChatOpen} />
    </>
  );
}
