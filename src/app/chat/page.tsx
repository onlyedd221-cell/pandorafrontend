"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ImageIcon } from "lucide-react";
import ChatHeader from "../components/chatHeader";

interface Message {
  id: number;
  from: "user" | "support";
  type: "text" | "image";
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatMessages");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = () => {
    if (!input.trim() && !imagePreview) return;

    const newMessage: Message = {
      id: messages.length + 1,
      from: "user",
      type: imagePreview ? "image" : "text",
      content: imagePreview || input,
      timestamp: getTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImagePreview(null);

    // Simulate support reply
    setIsTyping(true);
    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        from: "support",
        type: "text",
        content: "Thanks for your message! Our team will respond shortly. 💬",
        timestamp: getTime(),
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);

      setToast("Support replied!");
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen flex flex-col">
      <ChatHeader />

      <main className="flex-1 flex flex-col w-full p-3 space-y-4 sm:max-w-4xl sm:mx-auto sm:p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 text-center mb-2">
          Support Chat
        </h1>

        <div className="flex-1 bg-gray-900 rounded-xl p-3 sm:p-4 flex flex-col overflow-y-auto space-y-3 min-h-[50vh] max-h-[70vh]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] p-2 sm:p-3 rounded-lg break-words relative text-sm sm:text-base ${
                msg.from === "user"
                  ? "bg-pink-500 self-end text-white"
                  : "bg-gray-700 self-start text-gray-200"
              }`}
            >
              {msg.type === "text" ? (
                <span>{msg.content}</span>
              ) : msg.content ? (
                <img
                  src={msg.content}
                  alt="user-upload"
                  className="max-w-[150px] sm:max-w-[200px] max-h-[150px] rounded-lg object-cover"
                />
              ) : null}
              <span className="absolute text-[10px] sm:text-xs text-gray-400 bottom-1 right-2">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 self-start text-gray-400 text-sm">
              <Loader2 className="animate-spin" size={16} />
              <span>Support is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="preview"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm sm:text-base focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <label
            htmlFor="file-upload"
            className="bg-green-600 hover:bg-green-700 p-2 rounded-lg cursor-pointer flex items-center justify-center"
          >
            <ImageIcon size={18} />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-white animate-fade-in">
          {toast}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
