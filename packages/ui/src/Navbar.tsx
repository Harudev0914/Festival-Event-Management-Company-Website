"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ logo }: { logo?: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Scroll lock effect
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "COMPANY", kr: "회사 소개", href: "/about" },
    { name: "CONSTRUCTION", kr: "시공", href: "/construction" },
    { name: "RENTAL", kr: "렌탈", href: "/rental" },
    { name: "DJ", kr: "DJ", href: "/dj" },
    { name: "LOCATION", kr: "오시는길", href: "/location" },
    { name: "CONTACT", kr: "문의", href: "/contact" },
    { name: "PARTNERSHIP", kr: "입점 문의", href: "/partnership" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 md:px-12 h-20 md:h-24 flex items-center justify-between transition-all duration-300 pointer-events-none ${isScrolled ? 'bg-black/80 backdrop-blur-md' : ''}`}>
      {/* Logo Area */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <a href="/" className="text-xl md:text-2xl font-display leading-tight font-bold text-white uppercase tracking-tighter hover:text-primary transition-colors">
          Klipse
        </a>
      </div>

      {/* Menu Trigger */}
      <button 
        className="flex items-center gap-3 text-white pointer-events-auto group bg-black/20 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Menu</span>
        <div className="space-y-1">
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-current" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-[1.5px] bg-current" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-current" 
          />
        </div>
      </button>

      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-screen bg-[#0A0A0B]/95 z-[100] flex flex-col items-center justify-center pointer-events-auto backdrop-blur-md px-6"
          >
            <button 
              className="absolute top-8 right-8 md:top-10 md:right-10 text-white flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close menu"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">Close</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-6 h-[1.5px] bg-white rotate-45" />
                <div className="absolute w-6 h-[1.5px] bg-white -rotate-45" />
              </div>
            </button>

            <div className="flex flex-col gap-2 md:gap-4 items-center w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="group relative flex flex-col items-center"
                >
                  <a
                    href={item.href}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-zinc-600 hover:text-white transition-all duration-500 uppercase tracking-tighter leading-none"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>

                  <span className="text-[10px] md:text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mt-1">
                    {item.kr}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Backdrop decorative text */}
            <div className="absolute bottom-10 left-10 opacity-5">
               <span className="text-[15vw] font-display font-bold text-white whitespace-nowrap pointer-events-none uppercase">Creative Arthur</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
