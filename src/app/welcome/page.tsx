"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import { ChevronDown } from "lucide-react";

// ----------------- BOOKINGS DATA -----------------
// Bookings data with bio/description
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
      email: "mistress.aurora01@gmail.com",
      phone: "Available upon request",
    },
  },
    {
    id: 23099302305,
    name: "Lucy Perez",
    image: "/images/domme.jpg",
    bio: "Young Domme with fresh energy and creativity.",
    description: `
At just 22, Lucy Perez combines youthful energy with an intuitive understanding of control and play. 
Her sessions are playful yet intense, balancing nurturing charm with firm authority. 
She enjoys guiding clients through fantasy explorations and roleplay journeys.
`,
    interests: [
      "Roleplay",
      "Bondage",
      "Spanking",
      "Foot Worship",
      "Tease & Denial",
      "Sissification",
      "Sensory Play",
    ],
    disclaimer:
      "Sessions are fetish and fantasy only. No nudity or sexual services are offered.",
    profile: {
      birthday: "Feb 19",
      height: "5ft 5in",
      shoeSize: "7",
      hairColor: "Dark Brown",
      eyeColor: "Hazel",
      availability: ["Virtual", "Incall"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Latin"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Playful, Curious, Bold",
      favoriteTools: ["Ropes", "Blindfolds", "Paddles"],
    },
    contactInfo: {
      email: "lucy.perez22@gmail.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302308,
    name: "Goddess Selene",
    image: "/images/actress2.jpg",
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
      email: "goddess.selene@yahoo.com",
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
      email: "domina.ivy@hotmail.com",
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
      email: "madame.noir88@gmail.com",
      phone: "Available upon request",
    },
  },

  {
    id: 23099302304,
    name: "Madame Celeste",
    image: "/images/actress5.jpg",
    bio: "Refined Domme with cosmic elegance.",
    description: `
Celeste embodies sophistication and cosmic mystery. She designs sessions that feel like an astral journey, combining psychological dominance with sensory play. 
Her calm yet commanding aura makes every experience transformative and unforgettable.
`,
    interests: [
      "Roleplay",
      "Bondage",
      "Sensory Exploration",
      "Fetish",
      "Power Exchange",
      "Whips",
      "Chains",
    ],
    disclaimer:
      "Strictly fetish & fantasy. No explicit or illegal activities permitted.",
    profile: {
      birthday: "May 14",
      height: "5ft 10in",
      shoeSize: "9.5",
      hairColor: "Blonde",
      eyeColor: "Blue",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Couples"],
      ethnicity: ["Caucasian"],
      multilingual: true,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Mystical, Calm, Empowering",
      favoriteTools: ["Chains", "Blindfolds", "Candle Wax"],
    },
    contactInfo: {
      email: "madame.celeste@hotmail.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302303,
    name: "Mistress Valeria",
    image: "/images/actress6.jpg",
    bio: "Intense Domme with a flair for the dramatic.",
    description: `
Valeria thrives on intensity and theatrics. Her sessions are bold, passionate, and unforgettable. 
She specializes in strict discipline, roleplay fantasy, and pushing limits safely.
`,
    interests: [
      "Discipline",
      "Roleplay",
      "Flogging",
      "Bondage",
      "Spanking",
      "Tease & Denial",
      "Foot Worship",
    ],
    disclaimer:
      "Fantasy role-play and fetish only. No sexual or illegal services.",
    profile: {
      birthday: "Jun 30",
      height: "5ft 7in",
      shoeSize: "8",
      hairColor: "Black",
      eyeColor: "Brown",
      availability: ["Incall", "Outcall"],
      services: ["Dominant", "Switch"],
      ethnicity: ["Mediterranean"],
      multilingual: true,
      tattoos: true,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Dramatic, Passionate, Bold",
      favoriteTools: ["Floggers", "Paddles", "Whips"],
    },
    contactInfo: {
      email: "valeria.domme@yahoo.com",
      phone: "Available upon request",
    },
  },
  {
    id: 23099302302,
    name: "Lady Seraphina",
    image: "/images/actress7.jpg",
    bio: "Ethereal Domme with graceful authority.",
    description: `
Seraphina blends grace with undeniable authority. Her style is subtle yet powerful, focusing on psychological play and refined domination. 
Every encounter with her feels like a divine experience.
`,
    interests: [
      "Roleplay",
      "Bondage",
      "Psychological Play",
      "Tease & Denial",
      "Sensory Exploration",
      "Whips",
      "Candle Wax",
    ],
    disclaimer:
      "Fetish-based sessions only. Explicit or illegal activities are not provided.",
    profile: {
      birthday: "Sep 12",
      height: "5ft 8in",
      shoeSize: "8.5",
      hairColor: "Auburn",
      eyeColor: "Green",
      availability: ["Incall", "Virtual"],
      services: ["Dominant", "Couples"],
      ethnicity: ["Mixed"],
      multilingual: true,
      tattoos: false,
      smoking: false,
      wrestling: "Fantasy",
      personality: "Graceful, Calm, Enigmatic",
      favoriteTools: ["Whips", "Feathers", "Chains"],
    },
    contactInfo: {
      email: "lady.seraphina@gmail.com",
      phone: "Available upon request",
    },
  },
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Unveiling the Art of Submission",
    image: "/images/actress5.jpg",
    excerpt:
      "Discover the empowering side of submission and how it can transform both body and mind.",
    fullContent: `Submission is often misunderstood, but it is a profound expression of trust, respect, and emotional exploration. When practiced consensually, it allows individuals to explore vulnerability, release control, and experience deep personal growth. 

Through structured dynamics, communication, and attentive guidance, submission can enhance both emotional and physical awareness. It is not just about yielding to another, but about understanding oneself, establishing boundaries, and embracing the psychology of power exchange. 

At Pandora’s Clubhouse, we provide an environment that is safe, respectful, and empowering, ensuring every session promotes trust, personal insight, and self-discovery. The art of submission becomes a journey, where mind, body, and spirit align in exploration and transformation.`,
  },
  {
    id: 2,
    title: "Behind the Dungeon Doors",
    image: "/images/actress7.jpg",
    excerpt:
      "Take a peek into our world-class dungeon spaces, designed for ultimate creativity and exploration.",
    fullContent: `Our dungeons are meticulously designed to combine functionality, aesthetics, and safety. Each room offers a distinct ambiance, allowing for a wide range of experiences from sensory play to intricate roleplay scenarios. 

We prioritize client comfort while enabling full creative freedom, so whether you're experimenting with bondage, power exchange, or fantasy enactments, the space supports your vision. Attention to lighting, sound, and equipment ensures each session feels immersive and authentic. 

Beyond the physical setup, our approach emphasizes preparation, consent, and psychological safety. Clients are guided through experiences with clarity, boundaries are respected, and every detail contributes to a memorable and transformative session.`,
  },
  {
    id: 3,
    title: "Safety and Trust in BDSM",
    image: "/images/bdsm3.jpg",
    excerpt:
      "Safety, consent, and trust are the pillars of everything we do at Pandora’s Clubhouse.",
    fullContent: `Safety and trust are the cornerstones of any meaningful BDSM experience. At Pandora’s Clubhouse, we uphold these values by ensuring every session begins with clear communication, established boundaries, and informed consent. 

Practitioners and clients work together to create a mutually respectful environment, emphasizing emotional and physical safety at every step. Techniques are applied with precision and care, and tools are sanitized and used responsibly. 

Trust builds over time and is nurtured through transparency, feedback, and mindful interaction. By fostering a culture where participants feel secure and valued, we enable authentic exploration of desires, fantasies, and personal growth within a structured and empowering framework.`,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              href="/authPage"
              className="bg-pink-500 hover:bg-pink-600 px-6 py-4 rounded-lg font-semibold"
            >
             Get Started
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
        {/* <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold">
          Contact Us
        </button> */}
        <Link
  href="/contact"
  className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-semibold"
>
  Contact Us
</Link>

      </section>

      {/* BOOKINGS SECTION */}
      <section id="bookings" className="py-16 px-6 bg-black">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Available For Bookings
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {bookingsData.slice(0, 4).map((b) => (
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
