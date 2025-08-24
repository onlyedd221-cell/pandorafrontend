"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import { ChevronDown } from "lucide-react";

// ----------------- BOOKINGS DATA -----------------
export const bookingsData = [
  {
    id: 23099302309,
    name: "Mistress Aurora",
    image: "/images/actress1.jpg",
    bio: "Experienced Domme with a passion for roleplay & guidance.",
  },
  {
    id: 23099302308,
    name: "Goddess Selene",
    image: "/images/actress2.jpg",
    bio: "Luxury Domme with tailored experiences.",
  },
  {
    id: 23099302307,
    name: "Domina Ivy",
    image: "/images/actress3.jpg",
    bio: "Discipline & transformative specialist.",
  },
  {
    id: 23099302306,
    name: "Madame Noir",
    image: "/images/actress4.jpg",
    bio: "Classic elegance with an edge.",
  },
];

// ----------------- BLOG POSTS DATA -----------------
const blogPosts = [
  {
    id: 1,
    title: "Unveiling the Art of Submission",
    image: "/images/actress5.jpg",
    excerpt:
      "Discover the empowering side of submission and how it can transform both body and mind.",
    fullContent:
      "Submission is often misunderstood, but it is a profound expression of trust, respect, and emotional exploration...",
  },
  {
    id: 2,
    title: "Behind the Dungeon Doors",
    image: "/images/actress7.jpg",
    excerpt:
      "Take a peek into our world-class dungeon spaces, designed for ultimate creativity and exploration.",
    fullContent:
      "Our dungeons are meticulously designed to combine functionality, aesthetics, and safety...",
  },
  {
    id: 3,
    title: "Safety and Trust in BDSM",
    image: "/images/bdsm3.jpg",
    excerpt:
      "Safety, consent, and trust are the pillars of everything we do at Pandora’s Clubhouse.",
    fullContent:
      "Safety and trust are the cornerstones of any meaningful BDSM experience...",
  },
];

// ----------------- MAIN PAGE -----------------
export default function WelcomePage() {
  const heroImages = [
    "/images/bdsm1.jpg",
    "/images/bdsm2.jpg",
    "/images/bdsm3.jpg",
    "/images/bdsm4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);
  const [activeBooking, setActiveBooking] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Scroll down button
  const handleScrollDown = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <div className="font-sans text-white relative">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Legendary Playspace
          </h2>
          <p className="text-lg sm:text-xl mb-6 font-light tracking-wide">
            Serving the Fetish & Film Community for{" "}
            <span className="font-bold text-pink-400">Over 24 YEARS!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-pink-500 hover:bg-pink-600 px-6 py-4 rounded-lg font-semibold"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-16 px-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-center"
      >
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">
          Available Worldwide
        </h3>
        <p className="max-w-3xl mx-auto text-base sm:text-lg mb-6 leading-relaxed text-gray-300">
          Indulge in the unique ambiance of our seven luxurious, exotic rooms.
          Whether you are an independent practitioner, a couple, or seeking a
          space for film and photo shoots, our rooms are available to meet your
          needs. Come and explore the extraordinary with us.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold">
          Contact Us
        </button>
      </section>

      {/* BOOKINGS SECTION */}
      <section id="bookings" className="py-16 px-6 bg-black">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Available For Bookings
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookingsData.map((b) => (
            <div
              key={b.id}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() =>
                setActiveBooking(activeBooking === b.id ? null : b.id)
              }
            >
              <Image
                src={b.image}
                alt={b.name}
                width={400}
                height={500}
                className="object-cover w-full h-[400px] group-hover:scale-110 transition-transform"
              />
              <div
                className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-3 transition-opacity duration-300 ${
                  activeBooking === b.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <h4 className="text-xl font-bold mb-2">{b.name}</h4>
                <p className="text-gray-300 mb-4 text-sm">{b.bio}</p>
                <Link
                  href={`/profile/${b.id}`}
                  className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg font-semibold"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG SECTION */}
      <section
        id="blog"
        className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Pandora Goddess Blog
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-lg "
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-56 group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3">{post.title}</h4>
                <p className="text-gray-300 mb-4 text-sm whitespace-pre-line">
                  {expandedBlog === post.id
                    ? post.fullContent
                    : post.excerpt}
                </p>
                <button
                  onClick={() =>
                    setExpandedBlog(expandedBlog === post.id ? null : post.id)
                  }
                  className="text-pink-400 hover:underline cursor-pointer"
                >
                  {expandedBlog === post.id ? "Show Less ↑" : "Read More →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Floating Scroll Button */}
      <button
        onClick={handleScrollDown}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
}
