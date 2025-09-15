"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !experience) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      // Here you would send data to backend or API
      console.log({ name, email, phone, experience, portfolio });
      toast.success("Application submitted successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setExperience("");
      setPortfolio("");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting application. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-black">
      <Header />
<div className="w-full px-6 mt-6">
  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
  >
    <ArrowLeft size={20} />
    <span className="text-sm text-white font-medium">Back</span>
  </button>
</div>

      <section className="relative py-16 px-6 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center">
       

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold mb-6 text-pink-400 text-center">
          Apply to Become a Domme
        </h1>
        <p className="text-center max-w-2xl mb-12 text-gray-300">
          If you think you have what it takes to join the The Fetish Fortress
          Clubhouse Dungeon NY as a Mistress, fill out the application below. Be
          honest, creative, and show us your experience.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-900/90 p-8 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <textarea
            placeholder="Experience / Skills *"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="text"
            placeholder="Portfolio / Social Links (Optional)"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-pink-500 hover:bg-pink-600 transition px-4 py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
          >
            {submitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : null}
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
