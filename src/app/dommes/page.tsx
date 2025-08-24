"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
// booking data array
export const bookingsData = [
  {
    id: 23099302309,
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
    id: 23099302308,
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
    id: 23099302307,
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
    id: 23099302306,
    name: "Madame Noir",
    image: "/images/actress4.jpg",
    bio: "Classic elegance with an edge.",
    description: `
Madame Noir exudes sophistication and command. Her sessions balance elegance with intensity, offering experiences ranging from sensory play to strict discipline. 
She is versatile and highly skilled in tailoring sessions to her client’s desires.
`,
    interests: [
      "Classic Domination",
      "Roleplay",
      "Bondage",
      "Foot Worship",
      "Sensory Play",
      "Candle Wax",
      "Fetish",
      "Spanking",
      "Trampling",
      "Whips",
      "Psychological Play",
      "Power Exchange",
    ],
    disclaimer:
      "Fetish & fantasy role-play only. No sexual services provided. Illegal activities are prohibited.",
    profile: {
      birthday: "Apr 5",
      height: "5ft 9in",
      shoeSize: "9",
      hairColor: "Black",
      eyeColor: "Blue",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Switch", "Couples"],
      ethnicity: ["Caucasian"],
      multilingual: true,
      tattoos: true,
      smoking: true,
      wrestling: "Fantasy",
      personality: "Elegant, Commanding, Experienced",
      favoriteTools: ["Whips", "Crops", "Chains"],
    },
    contactInfo: {
      email: "noir@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302305,
    name: "Lady Seraphine",
    image: "/images/dommes6.jpg",
    bio: "Mystical Domme with a focus on ritualistic play.",
    description: `
Seraphine blends spiritual energy with powerful control. Her sessions often include ritualistic elements, candle rituals, and sensory exploration. 
She thrives on guiding submissives into transcendent states of mind.
`,
    interests: [
      "Ritual Play",
      "Sensory Deprivation",
      "Bondage",
      "Meditative Domination",
      "Chastity",
      "Tease & Denial",
      "Fetish",
      "Psychological Play",
    ],
    disclaimer:
      "All services are strictly fantasy role-play. No sexual services offered. Illegal activities are prohibited.",
    profile: {
      birthday: "May 14",
      height: "5ft 6in",
      shoeSize: "7",
      hairColor: "Black with Silver Streaks",
      eyeColor: "Grey",
      availability: ["Incall", "Virtual"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Middle Eastern"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "None",
      personality: "Mystical, Calm, Intense",
      favoriteTools: ["Candles", "Incense", "Blindfolds"],
    },
    contactInfo: {
      email: "seraphine@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302304,
    name: "Countess Dahlia",
    image: "/images/bdsm1.jpg",
    bio: "Aristocratic Domme with a taste for the theatrical.",
    description: `
Dahlia commands with a mix of aristocratic elegance and theatrical dominance. 
She specializes in roleplay scenarios, strict discipline, and elaborate power exchange rituals.
`,
    interests: [
      "Theatrical Roleplay",
      "Discipline",
      "Whips & Canes",
      "Bondage",
      "Boot Worship",
      "Corsetry",
      "Fetish",
    ],
    disclaimer: "Fantasy role-play only. No explicit services offered.",
    profile: {
      birthday: "Jul 7",
      height: "5ft 10in",
      shoeSize: "10",
      hairColor: "Auburn",
      eyeColor: "Blue-Green",
      availability: ["Incall", "Outcall"],
      services: ["Dominant"],
      ethnicity: ["European"],
      multilingual: false,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Regal, Dramatic, Stern",
      favoriteTools: ["Canes", "Leather Boots", "Corsets"],
    },
    contactInfo: {
      email: "dahlia@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302303,
    name: "Mistress Valkyrie",
    image: "/images/dommes1.jpg",
    bio: "Warrior Domme with a powerful presence.",
    description: `
Valkyrie embodies strength and fierce dominance. Inspired by warrior mythology, she blends physical intensity with psychological command. 
She is ideal for those seeking strength, control, and surrender in a safe environment.
`,
    interests: [
      "Impact Play",
      "Wrestling (Fantasy)",
      "Bondage",
      "Boot Worship",
      "Spanking",
      "Roleplay",
      "Power Exchange",
    ],
    disclaimer:
      "Sessions are limited to consensual fetish and fantasy play only.",
    profile: {
      birthday: "Oct 31",
      height: "6ft 0in",
      shoeSize: "11",
      hairColor: "Blonde",
      eyeColor: "Blue",
      availability: ["Outcall", "Virtual"],
      services: ["Dominant"],
      ethnicity: ["Nordic"],
      multilingual: true,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy & Roleplay",
      personality: "Strong, Fierce, Protective",
      favoriteTools: ["Canes", "Harnesses", "Gloves"],
    },
    contactInfo: {
      email: "valkyrie@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302302,
    name: "Empress Liora",
    image: "/images/dommes2.webp",
    bio: "A regal guide into surrender and trust.",
    description: `
Liora rules with compassion and control. Her sessions focus on deep trust-building, guiding her submissives through both gentle and strict encounters. 
She is known for balancing nurturing care with firm authority.
`,
    interests: [
      "Gentle Domination",
      "Bondage",
      "Chastity Play",
      "Roleplay",
      "Psychological Exploration",
      "Sensory Play",
    ],
    disclaimer:
      "Fantasy role-play only. No nudity or explicit services provided.",
    profile: {
      birthday: "Nov 19",
      height: "5ft 5in",
      shoeSize: "7.5",
      hairColor: "Dark Brown",
      eyeColor: "Amber",
      availability: ["Incall", "Outcall", "Virtual"],
      services: ["Dominant", "Couples"],
      ethnicity: ["Mediterranean"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Nurturing, Regal, Patient",
      favoriteTools: ["Silk Ropes", "Blindfolds", "Collars"],
    },
    contactInfo: {
      email: "liora@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302301,
    name: "Mistress Nyx",
    image: "/images/dommes3.jpeg",
    bio: "Dark goddess of control and mystery.",
    description: `
Nyx thrives in the shadows of psychological domination. Her style is immersive and mysterious, mixing sensory deprivation with deep roleplay. 
She is perfect for those craving intensity and surrender.
`,
    interests: [
      "Sensory Deprivation",
      "Psychological Domination",
      "Whips",
      "Roleplay",
      "Bondage",
      "Chastity Play",
    ],
    disclaimer: "All experiences are consensual fantasy sessions only.",
    profile: {
      birthday: "Dec 21",
      height: "5ft 7in",
      shoeSize: "8",
      hairColor: "Jet Black",
      eyeColor: "Violet",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Mixed"],
      multilingual: true,
      tattoos: true,
      smoking: true,
      wrestling: "Fantasy",
      personality: "Mysterious, Intense, Alluring",
      favoriteTools: ["Blindfolds", "Whips", "Crops"],
    },
    contactInfo: {
      email: "nyx@example.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302300,
    name: "Lady Isolde",
    image: "/images/dommes4.jpg",
    bio: "Romantic disciplinarian with refined elegance.",
    description: `
Isolde combines a romantic, old-world charm with firm authority. Her sessions include elegant roleplay scenarios, poetic rituals, and precise discipline. 
She balances softness with strictness in every encounter.
`,
    interests: [
      "Elegant Roleplay",
      "Flogging",
      "Whips & Crops",
      "Chastity Devices",
      "Corsets & Heels",
      "Bondage",
    ],
    disclaimer: "Role-play and fetish only. No explicit services offered.",
    profile: {
      birthday: "Aug 12",
      height: "5ft 8in",
      shoeSize: "9",
      hairColor: "Chestnut",
      eyeColor: "Hazel",
      availability: ["Incall"],
      services: ["Dominant"],
      ethnicity: ["European"],
      multilingual: false,
      tattoos: false,
      smoking: false,
      wrestling: "None",
      personality: "Romantic, Strict, Elegant",
      favoriteTools: ["Floggers", "Leather Straps", "Corsets"],
    },
    contactInfo: {
      email: "isolde@example.com",
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
