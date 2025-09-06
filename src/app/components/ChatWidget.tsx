"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  FileText,
  ArrowDownCircle,
  Archive,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_ALL_CHATS,
  GET_MESSAGES,
  SEND_MESSAGE,
  GET_ARCHIVED_CHATS,
  ARCHIVE_CHAT,
  UNARCHIVE_CHAT,
} from "../graphql/mutations";
import ChatHeader from "./chatHeader";

const ADMIN_EMAIL = "admin302@gmail.com";

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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);

  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [chatId, setChatId] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  console.log("showScrollTop:", showScrollTop);

  // 🔑 Archive toggle
  const [showArchived, setShowArchived] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load user
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        if (u.email !== ADMIN_EMAIL) {
          setChatId(u.id);
          setSelectedChat({ id: u.id, name: u.name });
        }
      }
    }
  }, []);

  // Auto-hide teaser
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTeaser(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Queries
  const { data: allChatsData, refetch: refetchActive } = useQuery<{
    getAllChats: { id: string; name: string; email: string; archived: boolean }[];
  }>(GET_ALL_CHATS, {
    skip: !user || user.email !== ADMIN_EMAIL,
    fetchPolicy: "network-only",
  });

  const { data: archivedChatsData, refetch: refetchArchived } = useQuery<{
    getArchivedChats: {
      id: string;
      name: string;
      email: string;
      archived: boolean;
    }[];
  }>(GET_ARCHIVED_CHATS, {
    skip: !user || user.email !== ADMIN_EMAIL,
    fetchPolicy: "network-only",
  });

  const { data: messagesData, refetch: refetchMessages } = useQuery<{
    getMessages: Message[];
  }>(GET_MESSAGES, {
    variables: { chatId },
    skip: !chatId || chatId.trim() === "",
    pollInterval: 2000,
  });

  // Mutations
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      setInput("");
      setFile(null);
      refetchMessages();
    },
  });
  const [archiveChat] = useMutation(ARCHIVE_CHAT, {
    onCompleted: () => {
      refetchActive();
      refetchArchived();
    },
  });
  const [unarchiveChat] = useMutation(UNARCHIVE_CHAT, {
    onCompleted: () => {
      refetchActive();
      refetchArchived();
    },
  });

  // Chat scroll bottom button
useEffect(() => {
  const container = messagesContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;
    setShowScrollButton(!isAtBottom);

    const isAtTop = container.scrollTop < 50;
    setShowScrollTop(!isAtTop);
  };

  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, []);


 
  // Auto-scroll to bottom if at bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesData?.getMessages?.length]);

  // Global scroll-to-top button
  useEffect(() => {
    const handlePageScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handlePageScroll);
    return () => window.removeEventListener("scroll", handlePageScroll);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() && !file) return;
    if (!user || !chatId) return;

    if (file) {
      alert("⚠️ System Error: File upload is disabled for now.");
      setFile(null);
      return;
    }

    await sendMessage({
      variables: {
        chatId,
        from: user.email === ADMIN_EMAIL ? "admin" : "user",
        type: "text",
        content: input,
      },
    });
  };

  const getTime = (ts?: string) =>
    ts
      ? new Date(Number(ts)).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

const handleClose = () => {
  if (user?.email === ADMIN_EMAIL && chatId) {
    // Admin is inside a chat → go back to chat list
    setChatId("");
    setSelectedChat(null);
  } else {
    // Normal user or admin not inside a chat → close modal
    setIsOpen(false);
  }
};


  const messages: Message[] =
    messagesData?.getMessages?.length
      ? messagesData.getMessages
      : [
          {
            id: "welcome",
            chatId,
            from: "admin",
            type: "text",
            content:
              "👋 Welcome to Support. A representative will be with you shortly. Please share your booking or payment inquiry.",
            timestamp: Date.now().toString(),
          },
        ];

  const isMyMessage = (msg: Message) => {
    if (!user) return false;
    if (user.email === ADMIN_EMAIL) {
      return msg.from === "admin";
    } else {
      return msg.from === "user";
    }
  };

  return (
    <>
    

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Teaser bubble */}
        {showTeaser && !isOpen && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowTeaser(false);
            }}
            className="max-w-[220px] bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-2xl shadow-md cursor-pointer text-sm animate-bounce"
          >
            Welcome to Pandora Goddess Club House! 👋 How can we help?
          </div>
        )}

        {/* Floating open button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle size={24} />
          </button>
        )}

        {/* Chat modal */}
        {isOpen && (
      <div
  ref={modalRef}
  className="bg-gray-900 text-white rounded-2xl shadow-2xl w-80 sm:w-96 h-[32rem] flex flex-col"
>
  {/* Header (fixed inside modal) */}
  <div className="flex items-center justify-between bg-pink-500 px-4 py-2 sticky top-0 z-10">
    <h4 className="font-semibold">Live Chat</h4>
    <button onClick={handleClose}>
      <X size={20} />
    </button>
  </div>

  {/* Scrollable body */}
  <div className="flex-1 overflow-y-auto">
      {/* Admin Chat List */}
            {user?.email === ADMIN_EMAIL && !chatId && (
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between mb-3">
                  <h1 className="text-lg font-bold text-pink-400">
                    {showArchived ? "Archived Chats" : "Active Chats"}
                  </h1>
                  <button
                    onClick={() => setShowArchived((prev) => !prev)}
                    className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-lg text-sm"
                  >
                    <Archive size={16} />
                    {showArchived ? "Show Active" : "Show Archived"}
                  </button>
                </div>

                {(showArchived
                  ? archivedChatsData?.getArchivedChats
                  : allChatsData?.getAllChats
                )?.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-xl p-3 flex justify-between items-center shadow-md"
                  >
                    <div
                      onClick={() => {
                        setChatId(c.id);
                        setSelectedChat(c);
                      }}
                    >
                      <div className="text-white font-semibold truncate">
                        {c.name || c.id}
                      </div>
                      <div className="text-gray-400 text-xs mt-1 truncate">
                        Chat ID: {c.id}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        c.archived
                          ? unarchiveChat({ variables: { chatId: c.id } })
                          : archiveChat({ variables: { chatId: c.id } })
                      }
                      className="ml-2 text-gray-400 hover:text-white"
                      title={c.archived ? "Unarchive" : "Archive"}
                    >
                      <Archive size={18} />
                    </button>
                  </div>
                )) || (
                  <div className="text-center text-gray-400 mt-6">
                    No chats available
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {chatId && (
              <div className="flex-1 flex flex-col">
                <ChatHeader />
                <main className="flex-1 flex flex-col w-full p-3 relative overflow-hidden">
                  <div
                    ref={messagesContainerRef}
                    className="flex-1 bg-gray-800 rounded-xl p-3 flex flex-col overflow-y-auto space-y-3"
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`max-w-[80%] p-2 rounded-xl break-words text-sm shadow-md flex flex-col ${
                          isMyMessage(msg)
                            ? "bg-pink-500 self-end text-white"
                            : "bg-gray-700 self-start text-gray-200"
                        }`}
                      >
                        <div className="text-[10px] text-gray-300 mb-1">
                          {msg.from === "admin"
                            ? "Chat Support"
                            : selectedChat?.name || "User"}
                        </div>

                        <div className="whitespace-pre-wrap break-words">
                          {msg.content}
                        </div>

                        <div className="text-[10px] text-gray-400 mt-1 self-end">
                          {getTime(msg.timestamp)}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Scroll-to-bottom */}
                  {showScrollButton && (
                    <button
                      onClick={() =>
                        messagesEndRef.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      className="absolute bottom-24 right-6 bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg"
                    >
                      <ArrowDownCircle size={22} />
                    </button>
                  )}

                  {/* Input */}
                  <div className="mt-3 flex gap-2 items-end">
                    {file && (
                      <div className="relative">
                        <span className="px-2 py-1 bg-gray-700 rounded-lg">
                          {file.name}
                        </span>
                        <button
                          onClick={() => setFile(null)}
                          className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      rows={1}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm resize-none focus:outline-none overflow-hidden max-h-40 overflow-y-auto"
                      onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height =
                          e.currentTarget.scrollHeight + "px";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />

                    <label
                      htmlFor="file-upload"
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-lg cursor-pointer flex items-center justify-center"
                    >
                      <FileText size={18} />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />

                    <button
                      onClick={handleSend}
                      className="bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded-lg flex items-center justify-center"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </main>
              </div>
            )}
  </div>
</div>

        )}
      </div>
    </>
  );
}
