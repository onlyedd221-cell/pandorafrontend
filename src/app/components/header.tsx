"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Bookings" },
    { href: "/dommes", label: "Dommes" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-lg">
      {/* Logo / Home Link */}
      <Link href="/" className="text-2xl font-extrabold tracking-wide text-pink-400">
  Pandora Clubhouse
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative pb-1 transition ${
              pathname === link.href
                ? "text-pink-400 border-b-2 border-pink-400"
                : "hover:text-pink-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden p-2 rounded-lg bg-pink-500"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-4 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block transition ${
                pathname === link.href
                  ? "text-pink-400 border-b border-pink-400"
                  : "hover:text-pink-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
