"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { jwtDecode } from "jwt-decode";

// ==========================
// GraphQL signOut mutation
// ==========================
const SIGN_OUT = gql`
  mutation {
    signOut {
      message
    }
  }
`;

interface DecodedToken {
  exp: number; // expiry timestamp
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  interface SignOutData {
    signOut: {
      message: string;
    };
  }

  const [signOutMutation] = useMutation<SignOutData>(SIGN_OUT);

  // ==========================
  // Sign Out Logic
  // ==========================
 const handleSignOut = useCallback(
    async (redirectToAuth = false) => {
      try {
        setLoading(true);

        const { data } = await signOutMutation();

        toast.success(data?.signOut?.message || "Signed out successfully");

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);

        if (redirectToAuth) router.push("/authPage");
        else router.push("/");

        setMenuOpen(false);
      } catch (err) {
        console.error(err);
        toast.error("Error signing out");
      } finally {
        setLoading(false);
      }
    },
    [router, signOutMutation]
  );

  // ==========================
  // Auto logout when token expires
  // ==========================
useEffect(() => {
  if (typeof window === "undefined") return;

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (!storedUser || !storedToken) return;

  let mounted = true;

  try {
    const decoded: DecodedToken = jwtDecode(storedToken);
    const expiryTime = decoded.exp * 1000;
    const now = Date.now();

    if (expiryTime <= now) {
      console.warn("Token expired. Logging out.");
      setTimeout(() => handleSignOut(true), 0); // break render cycle
    } else {
      if (mounted) setUser(JSON.parse(storedUser));

      const timeout = expiryTime - now;
      const timer = setTimeout(() => {
        console.warn("Token expired. Auto logging out.");
        toast.error("Session expired. Please sign in again.");
        handleSignOut(true);
      }, timeout);

      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  } catch (err) {
    console.error("Invalid token:", err);
    setTimeout(() => handleSignOut(true), 0);
  }
}, []);


  const isLoggedIn = !!user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Bookings", protected: true },
    { href: "/dommes", label: "Dommes" },
    { href: "/contact", label: "Contact" },
  ];

  const handleNavClick = (href: string, protectedRoute?: boolean) => {
    if (protectedRoute && !isLoggedIn) {
      console.warn("⚠️ Tried accessing protected route without login:", href);
      toast.error("Please sign in to access bookings");
      router.push("/authPage");
    } else {
      console.log("➡️ Navigating to:", href);
      router.push(href);
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-lg">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-wide text-pink-400"
      >
        Fetish Fortress 
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-lg font-medium items-center">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href, link.protected)}
            className={`relative pb-1 transition ${
              pathname === link.href
                ? "text-pink-400 border-b-2 border-pink-400"
                : "hover:text-pink-400"
            }`}
          >
            {link.label}
          </button>
        ))}

        {isLoggedIn ? (
          <button
            onClick={() => handleSignOut()}
            disabled={loading}
            className="ml-4 text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
          >
            {loading && (
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
            )}
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("➡️ Redirecting to authPage for sign in");
              router.push("/authPage");
            }}
            className="ml-4 text-sm px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-lg bg-pink-500"
        onClick={() => {
          console.log("📱 Mobile menu toggled. Open:", !menuOpen);
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-4 md:hidden z-50">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href, link.protected)}
              className={`block transition w-full text-left ${
                pathname === link.href
                  ? "text-pink-400 border-b border-pink-400"
                  : "hover:text-pink-400"
              }`}
            >
              {link.label}
            </button>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => handleSignOut()}
              disabled={loading}
              className="w-full text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
            >
              {loading && (
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
              )}
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                console.log("➡️ Redirecting to authPage for sign in (mobile)");
                router.push("/authPage");
              }}
              className="w-full text-sm px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
}
