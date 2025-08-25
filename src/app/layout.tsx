import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ApolloProviderWrapper from "./components/ApolloProviderWrapper";
// import ApolloProviderWrapper from "./components/ApolloProviderWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pandora Mistress Clubhouse",
  description: "Welcome to the Pandora Mistress Clubhouse – Manage your bookings easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <ApolloProviderWrapper>
       {children}
      </ApolloProviderWrapper>   
        {/* Toast notification container */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
