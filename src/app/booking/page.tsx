"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";
import Header from "../components/header";
import Image from "next/image";
import toast from "react-hot-toast";

import zelleLogo from "../../../public/logos/zelle.png";
import cashAppLogo from "../../../public/logos/cashapp.png";
import wireLogo from "../../../public/logos/wire.jpg";
import paypalLogo from "../../../public/logos/paypal.jpg";
import venmoLogo from "../../../public/logos/venmo.png";
import giftcardLogo from "../../../public/logos/giftcard.png";
import bitcoinLogo from "../../../public/logos/bitcoin.png";
import ChatWidget from "../components/ChatWidget";

export default function BookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    room: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
    paymentMethod: "",
    sessionType: "",
  });

  // ✅ Protect page: check if user exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("⚠️ You must log in to access bookings");
        setTimeout(() => {
          router.push("/authPage");
        }, 1500); // wait 1.5s so toast is visible
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.table(formData);
    toast.success("✅ Booking submitted! Contact support for payment details.");
  };

  const rooms = ["Chinese Torture", "Classic Chamber", "VIP Room"];
const sessionTypes = [
  { label: "Mini session  = £300", value: "mini" },
  { label: "Classic session = £560", value: "classic" },
  { label: "VIP = £1000", value: "vip" },
  { label: "Membership fee = £1500", value: "membership" },
];

  const paymentMethods = [
    { name: "Zelle", logo: zelleLogo },
    { name: "Cash App", logo: cashAppLogo },
    { name: "Wire Transfer", logo: wireLogo },
    { name: "PayPal", logo: paypalLogo },
    { name: "Venmo", logo: venmoLogo },
    { name: "Giftcard", logo: giftcardLogo },
    { name: "Bitcoin", logo: bitcoinLogo },
  ];

  // ⏳ Loader spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-sans text-white bg-black min-h-screen flex flex-col relative">
      <Header />

      <main className="flex-1 px-4 sm:px-6 md:px-8 pt-32 pb-12 max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <section className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            The Pandora Goddess Clubhouse
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Book A Session
          </h2>
        </section>

        {/* Session Types */}
        <section className="space-y-2 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400">
            Session Types
          </h3>
          <div className="flex flex-col items-center space-y-2">
            {sessionTypes.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, sessionType: s.value })
                }
                className={`w-full sm:w-auto text-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                  formData.sessionType === s.value
                    ? "text-white underline"
                    : "text-yellow-400 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-2 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-400">
            Methods for Making Payment
          </h3>
          <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:flex-wrap sm:justify-center gap-2">
            {paymentMethods.map((p) => (
              <div
                key={p.name}
                className={`flex items-center gap-2 justify-center px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  formData.paymentMethod === p.name
                    ? "text-white underline"
                    : "text-green-400 hover:text-white"
                }`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: p.name })
                }
              >
                <Image src={p.logo} alt={p.name} width={24} height={24} />
                <span className="text-sm sm:text-base">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reserve a Room Form */}
        <section className="bg-gray-900 rounded-xl p-4 sm:p-6 space-y-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            Reserve a Room
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              required
            />

            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (For how long?)"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              />
            </div>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes, Comments, or Questions (optional)"
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full bg-pink-500 cursor-pointer hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold mt-2"
            >
              Schedule Now
            </button>
          </form>

          {/* 🔔 Support note */}
          <p className="text-sm text-gray-400 mt-4 text-center">
            After reserving a room, please contact{" "}
            <span className="text-pink-400 font-semibold">support</span> to
            finalize payment and details.
          </p>
        </section>
      </main>

      {/* CHAT WIDGET */}
      <ChatWidget />

      <Footer />
    </div>
  );
}
