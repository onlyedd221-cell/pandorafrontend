"use client";

import React from "react";
import { useEffect } from "react";

interface SupportToastProps {
  onChatOpen: () => void;
}

export default function SupportToast({ onChatOpen }: SupportToastProps) {
  const [visible, setVisible] = React.useState(true);

  // Auto-close after 6s
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-28 right-6 bg-pink-600 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in z-50 max-w-xs">
      <div className="p-3 space-y-3 text-sm">
        <p>
          Welcome to <strong>The Fetish Fortress Club House!</strong> 👋 <br />
          Whether you have a specific question or need assistance, we’re here
          for you. 😉 <br />
          What would you like to know?
        </p>
        <button
          onClick={onChatOpen}
          className="block w-full cursor-pointer bg-white text-pink-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Chat with Us
        </button>
      </div>
    </div>
  );
}
