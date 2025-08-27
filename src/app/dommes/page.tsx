"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
// booking data array
export const bookingsData = [
  {
    id: 23099302301,
    name: "Mistress Aurora",
    image: "/images/actress1.jpg",
    bio: "Experienced Domme with a passion for roleplay & guidance.",
    description: `
Aurora is the siren you’ve been searching for. She’ll captivate you with her charm, then command with precision. 
Her sessions focus on personal transformation, trust, and pushing boundaries while ensuring safety and consent. 
From classic discipline to immersive fantasy scenarios, Aurora’s presence leaves a lasting impression.
`,
    interests: [
      "Bondage",
      "Candle Wax",
      "Chastity Devices",
      "Clamps",
      "Flogging",
      "Foot Worship",
      "Pantyhose/Stockings",
      "Fetish",
      "Sissification",
      "Spanking/Paddling",
      "Trampling",
      "Whips",
      "Sensory Deprivation",
      "Roleplay",
      "Tease & Denial",
    ],
    disclaimer:
      "I only offer fetish, fantasy & role-play. No nudity or sexual services are provided. Illegal activities are strictly prohibited.",
    profile: {
      birthday: "Jan 15",
      height: "5ft 6in",
      shoeSize: "8",
      hairColor: "Brunette",
      eyeColor: "Brown",
      availability: ["Incall", "Outcall", "Telephone"],
      services: ["Dominant", "Submissive", "Switch", "Couples"],
      ethnicity: ["Asian", "Latin"],
      multilingual: true,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Confident, Playful, Precise",
      favoriteTools: ["Whips", "Clamps", "Candle Wax"],
    },
    contactInfo: {
      email: "aurora@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302302,
    name: "Goddess Selene",
    image: "/images/dommes5.jpeg",
    bio: "Luxury Domme with tailored experiences.",
    description: `
Selene creates indulgent, immersive sessions that explore your deepest desires. 
Her attention to detail ensures every session is unique, luxurious, and empowering. 
She specializes in psychological play, fantasy fulfillment, and sensual domination.
`,
    interests: [
      "Roleplay",
      "Bondage",
      "Luxury Sessions",
      "Sensory Exploration",
      "Foot Worship",
      "Fetish",
      "Domination",
      "Submission",
      "Tease & Denial",
      "Spanking",
      "Fantasy Scenarios",
      "Power Exchange",
    ],
    disclaimer:
      "Fetish & role-play only. No sexual services offered. Illegal activities are prohibited.",
    profile: {
      birthday: "Feb 20",
      height: "5ft 8in",
      shoeSize: "9",
      hairColor: "Black",
      eyeColor: "Hazel",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Switch", "Couples"],
      ethnicity: ["Caucasian", "Asian"],
      multilingual: true,
      tattoos: false,
      smoking: true,
      wrestling: "Fantasy",
      personality: "Elegant, Assertive, Creative",
      favoriteTools: ["Ropes", "Feathers", "Blindfolds"],
    },
    contactInfo: {
      email: "selene@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302303,
    name: "Domina Ivy",
    image: "/images/actress3.jpg",
    bio: "Discipline & transformative specialist.",
    description: `
Ivy is an expert in transformative domination and mind-body empowerment. 
Her sessions combine discipline, roleplay, and psychological stimulation. 
She challenges limits while nurturing trust and respect in every interaction.
`,
    interests: [
      "Discipline",
      "Transformation",
      "Roleplay",
      "Bondage",
      "Sissification",
      "Flogging",
      "Foot Worship",
      "Tease & Denial",
      "Clamps",
      "Candle Wax",
      "Power Exchange",
      "Fantasy Scenarios",
      "Trampling",
    ],
    disclaimer:
      "Fetish & fantasy role-play only. No sexual services or illegal activities.",
    profile: {
      birthday: "Mar 10",
      height: "5ft 7in",
      shoeSize: "8.5",
      hairColor: "Red",
      eyeColor: "Green",
      availability: ["Incall", "Outcall", "Virtual"],
      services: ["Dominant", "Submissive", "Switch"],
      ethnicity: ["Mixed"],
      multilingual: true,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Intense, Strategic, Caring",
      favoriteTools: ["Whips", "Crops", "Blindfolds", "Ropes"],
    },
    contactInfo: {
      email: "ivy@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302304,
    name: "Lady Seraphina",
    image: "/images/actress4.jpg",
    bio: "Graceful and powerful — your celestial Domme.",
    description: `
Seraphina blends elegance with authority. 
Her presence is magnetic, her methods a mix of strictness and compassion. 
Expect a divine experience that takes you on a journey of self-discovery.
`,
    interests: [
      "Spiritual Domination",
      "Bondage",
      "Sensory Play",
      "Foot Worship",
      "Roleplay",
      "Tease & Denial",
      "Impact Play",
      "Whips",
      "Crops",
    ],
    disclaimer:
      "Fetish only. No nudity or illegal services are part of my offerings.",
    profile: {
      birthday: "Apr 12",
      height: "5ft 9in",
      shoeSize: "10",
      hairColor: "Blonde",
      eyeColor: "Blue",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Caucasian"],
      multilingual: false,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Calm, Assertive, Spiritual",
      favoriteTools: ["Feathers", "Ropes", "Crops"],
    },
    contactInfo: {
      email: "seraphina@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302305,
    name: "Mistress Valeria",
    image: "/images/actress5.jpg",
    bio: "Sharp, intense, and unforgettable.",
    description: `
Valeria thrives on intensity. 
Her sessions are built to challenge limits and fuel transformation. 
A perfect guide for those seeking depth and intensity in their experiences.
`,
    interests: [
      "Discipline",
      "Roleplay",
      "Bondage",
      "Candle Wax",
      "Clamps",
      "Tease & Denial",
      "Sissification",
    ],
    disclaimer:
      "Fetish, fantasy & role-play only. No sexual services provided.",
    profile: {
      birthday: "May 8",
      height: "5ft 5in",
      shoeSize: "7",
      hairColor: "Black",
      eyeColor: "Brown",
      availability: ["Incall"],
      services: ["Dominant"],
      ethnicity: ["Hispanic"],
      multilingual: true,
      tattoos: true,
      smoking: true,
      wrestling: "Fantasy",
      personality: "Fiery, Bold, Unforgiving",
      favoriteTools: ["Whips", "Chains", "Clamps"],
    },
    contactInfo: {
      email: "valeria@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302306,
    name: "Empress Nyx",
    image: "/images/actress6.jpg",
    bio: "Dark, mysterious, and commanding.",
    description: `
Nyx embodies the night — alluring, mysterious, and powerful. 
Her energy creates transformative, shadow-filled sessions. 
Expect intensity and allure woven into every moment.
`,
    interests: [
      "Bondage",
      "Dark Roleplay",
      "Sensory Deprivation",
      "Impact Play",
      "Whips",
      "Candle Wax",
    ],
    disclaimer:
      "Only fetish and fantasy play. No sexual services.",
    profile: {
      birthday: "Jun 21",
      height: "5ft 10in",
      shoeSize: "9",
      hairColor: "Black",
      eyeColor: "Grey",
      availability: ["Incall", "Outcall"],
      services: ["Dominant"],
      ethnicity: ["Mixed"],
      multilingual: false,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Mysterious, Intense, Magnetic",
      favoriteTools: ["Whips", "Chains", "Blindfolds"],
    },
    contactInfo: {
      email: "nyx@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302307,
    name: "Madame Celeste",
    image: "/images/actress7.jpg",
    bio: "Elegant & refined domination.",
    description: `
Celeste combines elegance with precision. 
She’s refined, graceful, and deeply aware of power exchange. 
Her sessions leave you both grounded and elevated.
`,
    interests: [
      "Bondage",
      "Roleplay",
      "Spanking",
      "Tease & Denial",
      "Fetish",
      "Sensory Exploration",
    ],
    disclaimer:
      "Fetish role-play only. No illegal services.",
    profile: {
      birthday: "Jul 14",
      height: "5ft 6in",
      shoeSize: "8",
      hairColor: "Brown",
      eyeColor: "Blue",
      availability: ["Incall"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Caucasian"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Graceful, Calm, Commanding",
      favoriteTools: ["Ropes", "Whips", "Feathers"],
    },
    contactInfo: {
      email: "celeste@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302308,
    name: "Mistress Raven",
    image: "/images/actress8.jpg",
    bio: "Wild, dark, and fiery energy.",
    description: `
Raven embodies freedom and fire. 
Her sessions are raw, intense, and liberating. 
Perfect for those who want to explore their primal instincts.
`,
    interests: [
      "Bondage",
      "Whips",
      "Candle Wax",
      "Clamps",
      "Spanking",
      "Roleplay",
      "Flogging",
    ],
    disclaimer:
      "Fetish play only. No sexual services.",
    profile: {
      birthday: "Aug 5",
      height: "5ft 7in",
      shoeSize: "9",
      hairColor: "Black",
      eyeColor: "Hazel",
      availability: ["Outcall"],
      services: ["Dominant"],
      ethnicity: ["Mixed"],
      multilingual: false,
      tattoos: true,
      smoking: true,
      wrestling: "Fantasy",
      personality: "Fiery, Unpredictable, Strong",
      favoriteTools: ["Whips", "Chains", "Crops"],
    },
    contactInfo: {
      email: "raven@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302309,
    name: "Queen Isolde",
    image: "/images/actress9.jpg",
    bio: "Regal, commanding, and transformative.",
    description: `
Isolde rules her domain with elegance and authority. 
Her sessions bring a regal sense of order, control, and refinement.
`,
    interests: [
      "Roleplay",
      "Power Exchange",
      "Bondage",
      "Impact Play",
      "Sensory Play",
    ],
    disclaimer:
      "Only role-play fetish. No nudity or illegal acts.",
    profile: {
      birthday: "Sep 22",
      height: "5ft 11in",
      shoeSize: "10",
      hairColor: "Blonde",
      eyeColor: "Blue",
      availability: ["Incall"],
      services: ["Dominant"],
      ethnicity: ["Caucasian"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Regal, Strict, Elegant",
      favoriteTools: ["Chains", "Whips", "Blindfolds"],
    },
    contactInfo: {
      email: "isolde@example.com",
      phone: "Available upon request",
    },
  },

   {
    id: 23099302311,
    name: "Lucy Perez",
    image: "/images/domme.jpg",
    bio: "Young, passionate, and ready to explore new experiences.",
    description: `
At just 22 years old, Lucy brings fresh energy and a curious spirit into every encounter. 
She enjoys building authentic connections and discovering new dynamics with each session. 
Her style blends openness, creativity, and a willingness to learn while maintaining respect and boundaries.
`,
    interests: [
      "Roleplay",
      "Bondage",
      "Sensory Play",
      "Tease & Denial",
      "Light Fetish Exploration",
    ],
    disclaimer:
      "Fetish & fantasy role-play only. No nudity or sexual services. Illegal activities are prohibited.",
    profile: {
      birthday: "Feb 19, 2003",
      age: 22,
      height: "5ft 4in",
      shoeSize: "7.5",
      hairColor: "Dark Brown",
      eyeColor: "Brown",
      availability: ["Incall", "Virtual"],
      services: ["Switch", "Couples"],
      ethnicity: ["Hispanic"],
      multilingual: false,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Playful, Curious, Energetic",
      favoriteTools: ["Ropes", "Feathers", "Blindfolds"],
    },
    contactInfo: {
      email: "lucy.perez@example.com",
      phone: "Available upon request",
    },
  },
];


export default function Dommes() {
  const [activeBooking, setActiveBooking] = useState<number | null>(null);

return (
  <div className="font-sans text-white relative">
    <Header />

    {/* BOOKINGS SECTION */}
    <section id="bookings" className="py-16 px-6 bg-black">
      <h3 className="text-3xl sm:text-4xl my-7 font-bold text-center mb-12">
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
                href={`/profile/${b.id}`} // This is what makes routing dynamic
                className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg font-semibold"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Notice below the grid */}
      <p className="text-center md:text-2xl font-semibold text-green-400  mt-8 text-sm italic">
        We update this list every day to bring you fresh availability.
      </p>
    </section>

    {/* <ChatWidget /> */}

    <Footer />
  </div>
);

}
