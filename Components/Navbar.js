import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-20 text-white bg-black flex justify-around items-center'>
        <div className='logo font-bold text-3xl'>
           
            <Link href="/">BITLINKS</Link>
        </div>
        <ul className=' flex justify-center gap-4 items-center'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/shorten"><li>Shorten</li></Link>
            <Link href="/contact"><li>Contact us</li></Link>
            <li className='flex gap-3'>
               <Link href="/shorten"> <button className='bg-white font-bold text-black rounded-2xl p-2'>Try Now</button></Link>
               <Link href="/github"> <button className='bg-white font-bold  text-black rounded-2xl p-2  '>Github</button></Link>
            </li>
        </ul>
      
    </nav>
  )
}

export default Navbar
