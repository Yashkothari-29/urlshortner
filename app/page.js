import Image from "next/image";
import localFont from "next/font/local"
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "800",
});

export default function Home() {
  return (
    <main className="bg-purple-100">
     <section className="grid grid-cols-2 h-[50vh]"> 
      <div className=" flex flex-col gap-4 items-center justify-center">
        <p className={`text-4xl font-bold ${poppins.className}`}>
        The Best URL Shortner In The Market
        </p>
        <p className="px-16 text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo doloremque rerum hic harum commodi inventore ad tenetur rem deserunt, dolor ipsa. Molestias quod a maxime dolorem recusandae, ratione ut. Praesentium, sunt earum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cupiditate!
        </p>
        <div className='gap-30'>
               <Link href="/shorten"> <button className='bg-white font-bold text-black rounded-2xl p-2'>Try Now</button></Link>
               <Link href="/github"> <button className='bg-white font-bold  text-black rounded-2xl p-2  '>Github</button></Link>
            </div>
      </div>
      <div className=" flex justify-start relative">
        <Image 
          className="mix-blend-darken" 
          src="/vector.jpg" 
          alt="Vector illustration"
          fill={true}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

     </section>
    </main>
  );
}
