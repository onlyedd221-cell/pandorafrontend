"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

// GraphQL signOut mutation
const SIGN_OUT = gql`
  mutation {
    signOut {
      message
    }
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();

  const [signOutMutation] = useMutation(SIGN_OUT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
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
      toast.error("Please sign in to access bookings");
      router.push("/authPage");
    } else {
      router.push(href);
    }
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      const { data } = await signOutMutation();
      toast.success(data?.signOut?.message || "Signed out successfully");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
      setMenuOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error("Error signing out");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-lg">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-wide text-pink-400"
      >
        Pandora Clubhouse
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
            onClick={handleSignOut}
            className="ml-4 text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => router.push("/authPage")}
            className="ml-4 text-sm px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-lg bg-pink-500"
        onClick={() => setMenuOpen(!menuOpen)}
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
              onClick={handleSignOut}
              className="w-full text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => router.push("/authPage")}
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
