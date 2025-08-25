"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { bookingsData } from "@/app/welcome/page";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const profileId = Number(id);

  const profile = bookingsData.find((b) => b.id === profileId);
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <Link href="/booking" className="text-pink-500 hover:underline">
          Back to Bookings
        </Link>
        <Footer />
      </div>
    );
  }

  // Handle Book a Session click
  const handleBookSession = () => {
    if (!user) {
      toast.error("You must be signed in to book a session.");
      router.push("/authPage");
      return;
    }
    router.push("/booking");
  };

  return (
    <div className="font-sans text-white bg-gray-900 relative">
      <Header />
      <div className="mb-7 p-8"></div>

      {/* Back Button */}
      <div className="absolute p-4 mt-96 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-pink-400 hover:text-pink-500 font-semibold"
        >
          <span className="text-2xl">←</span> Back
        </Link>
      </div>

      {/* Hero/Profile Image */}
      <section className="relative w-full h-[500px] bg-black flex justify-center items-center">
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">
            {profile.name}
          </h1>
          <p className="text-pink-400 text-lg sm:text-xl">{profile.bio}</p>
        </div>
      </section>

      {/* About Me + Interests */}
      <section className="py-12 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-pink-400 mb-4">About Me</h2>
          <p className="text-gray-200 mb-6 whitespace-pre-line">{profile.description}</p>

          <h3 className="text-2xl font-semibold text-pink-400 mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.interests.map((item, index) => (
              <span
                key={index}
                className="bg-pink-600/30 text-pink-400 px-3 py-1 rounded-full text-sm animate-pulse"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-gray-300 italic mb-6">{profile.disclaimer}</p>
        </div>

        {/* Profile Details + Contact */}
        <div className="flex-1 text-white space-y-4 text-sm">
          <h2 className="text-3xl font-semibold text-pink-400 mb-4">Profile Details</h2>
          {Object.entries(profile.profile).map(([key, value], index) => (
            <div key={index} className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-bold text-white capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span>{Array.isArray(value) ? value.join(", ") : value || "N/A"}</span>
            </div>
          ))}

          <h2 className="text-3xl font-bold text-pink-400 mt-6 mb-4">Contact {profile.name}</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Phone Number:</span> {profile.contactInfo.phone}
            </p>
          </div>

          <button
            onClick={handleBookSession}
            className="inline-block mt-4 bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold"
          >
            Book a Session
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
