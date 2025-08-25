"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email first 📧");
      return;
    }
    toast.success("Thank you for subscribing! 🎉");
    setEmail("");
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-12 px-6 relative"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center md:text-left">
        {/* About */}
        <div>
          <h4 className="font-bold text-lg mb-4">About Us</h4>
          <p className="text-gray-400 text-sm">
            BookingPro is a premier booking experience dedicated to providing
            elegant spaces and unforgettable encounters worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#bookings">Bookings</Link></li>
            <li><Link href="#blog">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact</h4>
          <p className="text-gray-400 text-sm">pandorabookings@gmail.com</p>
          {/* <p className="text-gray-400 text-sm">+1 (555) 123-4567</p> */}
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg mb-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSubscribe}
            className="bg-pink-500 cursor-pointer hover:bg-pink-600 px-6 py-2 rounded-lg font-semibold w-full"
          >
            Subscribe
          </button>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        © {new Date().getFullYear()} BookingPro. All rights reserved.
      </p>
    </footer>
  );
}
