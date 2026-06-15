"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ logo }: { logo?: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
    <nav className="fixed top-0 w-full z-50 px-8 h-24 flex items-center justify-between pointer-events-none">
      {/* Logo Area */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-10 h-10 bg-white flex items-center justify-center">
           <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-black" />
        </div>
        <div className="text-[10px] leading-tight font-bold text-white uppercase tracking-tighter">
          Klipse
          <span className="block font-normal text-[8px] mt-1 text-zinc-500">크리에이티브그룹아더</span>
        </div>
      </div>

      {/* Menu Trigger */}
      <button 
        className="flex items-center gap-3 text-white pointer-events-auto group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Menu</span>
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
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center pointer-events-auto backdrop-blur-3xl"
          >
            <button 
              className="absolute top-10 right-10 text-white flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">Close</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-6 h-[1.5px] bg-white rotate-45" />
                <div className="absolute w-6 h-[1.5px] bg-white -rotate-45" />
              </div>
            </button>

            <div className="flex flex-col gap-4 md:gap-8 items-center">
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
                    className="text-4xl md:text-7xl font-display font-bold text-zinc-600 hover:text-white transition-all duration-500 uppercase tracking-tighter"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  <span className="text-xs md:text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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
