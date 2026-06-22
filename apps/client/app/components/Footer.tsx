'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
        className="bg-[#121212] text-white py-12 px-6 w-full overflow-hidden"
        style={{
            borderTop: '1px solid transparent',
            borderImage: 'linear-gradient(to right, transparent, #c84d4b, transparent) 1'
        }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 w-full">
        
        {/* Logo */}
        <div className="text-center">
            <Link href="/" className="text-xl md:text-2xl font-display leading-tight font-bold text-white uppercase tracking-tighter hover:text-[#c84d4b] transition-colors">Klipse</Link>
        </div>

        {/* Social Icons (Instagram) */}
        <div className="flex gap-6">
            {[1, 2, 3].map((_, i) => (
                <a key={i} href="#" className="text-zinc-400 hover:text-[#c84d4b] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"></path>
                        <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"></path>
                        <path d="M17.5078 6.5L17.4988 6.5" strokeWidth="2" strokeLinecap="round"></path>
                    </svg>
                </a>
            ))}
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-wrap justify-center gap-8 text-sm text-[#c84d4b] font-medium uppercase tracking-wider">
            <Link href="/company" className="hover:underline">COMPANY</Link>
            <Link href="/construction" className="hover:underline">CONSTRUCTION</Link>
            <Link href="/rental" className="hover:underline">RENTAL</Link>
            <Link href="/dj" className="hover:underline">DJ</Link>
            <Link href="/location" className="hover:underline">LOCATION</Link>
            <Link href="/contact" className="hover:underline">CONTACT</Link>
            <Link href="/partnership" className="hover:underline">PARTNERSHIP</Link>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-zinc-600 mt-4 text-center">
            &copy; 2026 Klipse. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
