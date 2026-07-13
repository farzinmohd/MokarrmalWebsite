import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mokarmal Restaurant | Premium Experience",
  description: "Crafted for Flavor. Built for Experience. Premium burgers, shawarma, rice dishes, and pizzas in Saudi Arabia.",
};

import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <LanguageProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
