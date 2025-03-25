import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bit-Link : Your Trusted URL Shortner",
  description: "Bitlink Helps You Shorten Your URL easily ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-purple-50`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
