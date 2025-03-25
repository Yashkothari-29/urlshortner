import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Bit-Link : Your Trusted URL Shortner",
  description: "Bitlink Helps You Shorten Your URL easily ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-purple-50 min-h-screen">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
