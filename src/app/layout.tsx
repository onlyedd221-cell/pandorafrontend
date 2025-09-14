import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ApolloProviderWrapper from "./components/ApolloProviderWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fetish Fortress",
  description: "Welcome to Fetish Fortress – Manage your bookings easily",
  openGraph: {
    title: "Fetish Fortress",
    description: "Welcome to Fetish Fortress – Manage your bookings easily",
    url: "https://thefetishfortress.vercel.app/",
    siteName: "Fetish Fortress",
    images: [
      {
        url: "https://thefetishfortress.vercel.app/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Fetish Fortress Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fetish Fortress",
    description: "Welcome to Fetish Fortress – Manage your bookings easily",
    images: ["https://thefetishfortress.vercel.app/images/og-preview.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
