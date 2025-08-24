"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We’ll get back to you shortly 💌");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen flex flex-col">
      <Header />

      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 text-pink-400">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            We’re here to help with bookings, payments & inquiries ✨
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <main className="flex-1 py-10 px-5 sm:px-12 lg:px-24 bg-black">
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-5"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-pink-400 mb-1">
              Send us a Message 💬
            </h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none text-sm sm:text-base"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none text-sm sm:text-base"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={4}
              className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none resize-none text-sm sm:text-base"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 px-5 py-3 rounded-lg font-semibold transition text-sm sm:text-base"
            >
              <Send size={18} /> Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-6">
            <h2 className="text-xl sm:text-2xl font-bold text-pink-400">
              Get in Touch 📞
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              Have questions about bookings, events, or availability?
              Reach out to us directly — we’d love to hear from you.
            </p>
            <div className="flex flex-col gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Mail className="text-pink-400" size={18} />
                <span>support@pandoraclubhouse.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-pink-400" size={18} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-pink-400" size={18} />
                <span>Los Angeles, CA</span>
              </div>
            </div>
            <Link
              href="/"
              className="mt-4 inline-block text-pink-400 hover:underline text-sm sm:text-base"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
