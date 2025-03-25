import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100 min-h-screen">
      <section className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)]"> 
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            The Best URL Shortener In The Market
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Transform your long URLs into short, memorable links. Fast, secure, and reliable URL shortening service for all your needs.
          </p>
          <div className="flex gap-4">
            <Link href="/shorten">
              <button className="bg-white hover:bg-gray-50 font-bold text-black rounded-2xl px-6 py-3 shadow-md transition-colors">
                Try Now
              </button>
            </Link>
            <Link href="https://github.com/Yashkothari-29/urlshortner" target="_blank">
              <button className="bg-white hover:bg-gray-50 font-bold text-black rounded-2xl px-6 py-3 shadow-md transition-colors">
                Github
              </button>
            </Link>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image 
            className="object-contain" 
            src="/vector.jpg" 
            alt="Vector illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
    </main>
  );
}
