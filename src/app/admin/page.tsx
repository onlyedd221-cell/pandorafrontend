"use client";

import { useState } from "react";
import Header from "../components/header";

export default function AdminPage() {
  const [passkey, setPasskey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("dashboard");
  const [activeChat, setActiveChat] = useState<any>(null);
  const [draft, setDraft] = useState("");

  const correctPasskey = "21413";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === correctPasskey) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Invalid passkey. Try again.");
    }
  };

  // Hardcoded user messages (demo only)
  const supportMessages = [
    { id: 1, user: "John Doe", email: "john@example.com", message: "I need help with my booking.", date: "2025-08-20", sessionId: "sess-1" },
    { id: 2, user: "Jane Smith", email: "jane@example.com", message: "How can I contact a domme directly?", date: "2025-08-21", sessionId: "sess-2" },
    { id: 3, user: "Alex Brown", email: "alex@example.com", message: "Payment is not going through.", date: "2025-08-22", sessionId: "sess-3" },
  ];

  const openChat = (msg: any) => {
    setActiveChat({
      ...msg,
      history: [
        { from: "user", text: msg.message, at: msg.date },
        { from: "admin", text: "Thanks! We’re checking this now.", at: msg.date },
      ],
    });
  };

  const sendReply = () => {
    if (!draft.trim() || !activeChat) return;

    // Update local chat history only (no backend call)
    setActiveChat((prev: any) => ({
      ...prev,
      history: [
        ...prev.history,
        {
          from: "admin",
          text: draft.trim(),
          at: new Date().toISOString().slice(0, 10),
        },
      ],
    }));

    setDraft("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {!unlocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
          <Header />
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-sm text-center border border-pink-500">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Admin Access Required</h2>
            <p className="text-gray-400 text-sm mb-6">Enter the secret passkey to unlock admin dashboard</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 transition px-4 py-2 rounded-lg font-semibold">
                Unlock
              </button>
            </form>
          </div>
        </div>
      )}

      {unlocked && (
        <div className="mx-auto w-full max-w-6xl p-4 sm:p-6">
          <Header />

          {view === "dashboard" && (
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-400 mb-4">Admin Dashboard</h1>
              <p className="text-gray-300 mb-6">Welcome to the Pandora Mistress Clubhouse admin panel.</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-400 transition">
                  <h3 className="text-lg sm:text-xl font-semibold text-pink-300">Manage Bookings</h3>
                  <p className="text-gray-400 text-sm mt-2">View, edit, or cancel client bookings in real time.</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-400 transition">
                  <h3 className="text-lg sm:text-xl font-semibold text-pink-300">Manage Dommes</h3>
                  <p className="text-gray-400 text-sm mt-2">Add, update, or remove dommes in the system.</p>
                </div>
                <button
                  onClick={() => setView("messages")}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-pink-400 transition text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-pink-300">Support Messages</h3>
                  <p className="text-gray-400 text-sm mt-2">Review and respond to client support requests.</p>
                </button>
              </div>
            </>
          )}

          {view === "messages" && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => (activeChat ? setActiveChat(null) : setView("dashboard"))}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold text-pink-400">Support</h2>
                <div />
              </div>

              <div className="md:grid md:grid-cols-3 gap-4">
                <div className={`${activeChat ? "hidden md:block" : "block"} bg-gray-900 rounded-xl border border-gray-700 overflow-hidden`}>
                  <div className="px-4 py-3 border-b border-gray-700 font-semibold text-gray-200">Inbox</div>
                  <ul className="divide-y divide-gray-800">
                    {supportMessages.map((msg) => (
                      <li key={msg.id}>
                        <button
                          onClick={() => openChat(msg)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-800 transition flex items-start gap-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-pink-300 font-semibold">{msg.user}</span>
                              <span className="text-xs text-gray-500">{msg.date}</span>
                            </div>
                            <div className="text-gray-400 text-xs">{msg.email}</div>
                            <div className="text-gray-200 text-sm mt-1 truncate">{msg.message}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${activeChat ? "block" : "hidden md:block"} md:col-span-2 bg-gray-900 rounded-xl border border-gray-700 w-full`}>
                  {!activeChat ? (
                    <div className="h-40 md:h-[70vh] flex items-center justify-center text-gray-500">
                      Select a conversation to start
                    </div>
                  ) : (
                    <div className="flex flex-col h-[calc(100vh-9rem)] md:h-[70vh]">
                      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-pink-300">{activeChat.user}</div>
                          <div className="text-xs text-gray-400">{activeChat.email}</div>
                        </div>
                        <button
                          className="md:hidden text-sm px-3 py-1 bg-gray-800 rounded-lg"
                          onClick={() => setActiveChat(null)}
                        >
                          Close
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {activeChat.history.map((m: any, i: number) => (
                          <div key={i} className={`max-w-[85%] ${m.from === "admin" ? "self-end ml-auto" : "self-start"}`}>
                            <div className={`px-3 py-2 rounded-lg text-sm ${m.from === "admin" ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-100"}`}>
                              {m.text}
                            </div>
                            <div className={`text-[10px] mt-1 ${m.from === "admin" ? "text-right" : ""} text-gray-400`}>{m.at}</div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 border-t border-gray-700 flex items-center gap-2">
                        <input
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Type a reply…"
                          className="flex-1 w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                          onClick={sendReply}
                          className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition font-semibold"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
