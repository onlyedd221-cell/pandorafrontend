"use client";

import { useState, useEffect, useRef } from "react";
import { Send, FileText, ArrowLeft } from "lucide-react";
import ChatHeader from "../components/chatHeader";
import Header from "../components/header";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ALL_CHATS, GET_MESSAGES, SEND_MESSAGE } from "../graphql/mutations";

const ADMIN_EMAIL = "blissfortune222@gmail.com";

interface Message {
  id: string;
  chatId: string;
  from: "user" | "admin";
  type: "text";
  content: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserChatPage() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [chatId, setChatId] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<{ id: string; name: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (!stored) return (window.location.href = "/authPage");
      const u = JSON.parse(stored);
      setUser(u);

      if (u.email !== ADMIN_EMAIL) {
        setChatId(u.id);
        setSelectedChat({ id: u.id, name: u.name });
      }
    }
  }, []);

  const { data: allChatsData, refetch: refetchChats } = useQuery(GET_ALL_CHATS, {
    skip: !user || user.email !== ADMIN_EMAIL,
  });

  const { data: messagesData, refetch: refetchMessages } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId,
    pollInterval: 2000,
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      setInput("");
      setFile(null);
      refetchMessages();
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    onError: (err) => {
      console.error("Send message error:", err);
    },
  });

  const handleSend = async () => {
    if (!input.trim() && !file) return;
    if (!user || !chatId) return;

    if (file) {
      alert("⚠️ System Error: File upload is disabled for now.");
      setFile(null);
      return;
    }

    const newMsg = {
      chatId,
      from: user.email === ADMIN_EMAIL ? "admin" : "user",
      type: "text",
      content: input,
    };

    await sendMessage({ variables: newMsg });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const getTime = (ts?: string) =>
    ts ? new Date(Number(ts)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  if (!user) return null;

  if (user.email === ADMIN_EMAIL && !chatId) {
    const chatList = allChatsData?.getAllChats || [];
    return (
      <div className="font-sans text-white bg-black min-h-screen flex flex-col p-4 sm:p-6">
        <Header />
        <h1 className="text-3xl font-bold text-pink-400 mb-6 text-center">Select User Chat</h1>
        {chatList.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chatList.map((c: any) => (
              <div
                key={c.id}
                onClick={() => {
                  setChatId(c.id);
                  setSelectedChat(c);
                }}
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-xl p-4 flex flex-col justify-between transition-all duration-200 shadow-md"
              >
                <div className="text-white font-semibold text-lg truncate">{c.name || c.id}</div>
                <div className="text-gray-400 text-sm mt-1 truncate">Chat ID: {c.id}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-6">No chats available</div>
        )}
      </div>
    );
  }

  const messages: Message[] = messagesData?.getMessages || [];

  return (
    <div className="font-sans text-white bg-black min-h-screen flex flex-col">
      <ChatHeader />
      <main className="flex-1 flex flex-col w-full p-3 sm:max-w-4xl sm:mx-auto sm:p-4">
        <div className="flex justify-between items-center mb-2">
          {user.email === ADMIN_EMAIL && (
            <button
              onClick={() => {
                setChatId("");
                setSelectedChat(null);
                refetchChats();
              }}
              className="flex items-center gap-1 text-sm sm:text-base bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
            >
              <ArrowLeft size={16} /> Back to Chat List
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-400 text-center flex-1">
            Support Chat {selectedChat ? `- ${selectedChat.name}` : ""}
          </h1>
        </div>

        <div className="flex-1 bg-gray-900 rounded-xl p-4 flex flex-col overflow-y-auto space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`max-w-[80%] p-3 rounded-xl break-words relative text-sm sm:text-base shadow-md ${
                msg.from === "admin" ? "bg-gray-700 self-start text-gray-200" : "bg-pink-500 self-end text-white"
              }`}
            >
              <div className="text-[10px] sm:text-xs text-gray-300 mb-1">
                {msg.from === "admin" ? "Chat Support" : selectedChat?.name || "User"}
              </div>
              <span>{msg.content}</span>
              <span className="absolute text-[10px] sm:text-xs text-gray-400 bottom-1 right-2">
                {getTime(msg.timestamp)}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-3 flex gap-2 items-center flex-wrap sm:flex-nowrap">
          {file && (
            <div className="relative">
              <span className="px-2 py-1 bg-gray-700 rounded-lg">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm sm:text-base focus:outline-none"
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />

          <label
            htmlFor="file-upload"
            className="bg-green-600 hover:bg-green-700 p-2 rounded-lg cursor-pointer flex items-center justify-center"
          >
            <FileText size={18} />
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />

          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
