"use client";

import * as React from "react";

export type MenuConfig = {
  about?: boolean;
  howToUse?: boolean;
  rental?: boolean;
  construction?: boolean;
  portfolio?: boolean;
  magazine?: boolean;
};

export const Navbar = ({ 
  logo, 
  config = { 
    about: true, 
    howToUse: true, 
    rental: false, // Default hidden as requested
    construction: true, 
    portfolio: true, 
    magazine: true 
  } 
}: { 
  logo: string; 
  config?: MenuConfig 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'about', name: "소개", href: "/about" },
    { id: 'howToUse', name: "이용방법", href: "/guide" },
    { id: 'rental', name: "렌탈", href: "/rental" },
    { id: 'construction', name: "시공", href: "/construction" },
    { id: 'portfolio', name: "포트폴리오", href: "/portfolio" },
    { id: 'magazine', name: "매거진", href: "/magazine" },
  ].filter(item => config[item.id as keyof MenuConfig]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent px-8 h-24 flex items-center justify-between pointer-events-none">
      {/* Logo Area */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-10 h-10 bg-white flex items-center justify-center">
           <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-black" />
        </div>
        <div className="text-[10px] leading-tight font-bold text-white uppercase tracking-tighter">
          Creative<br />Group<br />Arthur
          <span className="block font-normal text-[8px] mt-1 text-zinc-500">크리에이티브그룹아더</span>
        </div>
      </div>

      {/* Menu Trigger */}
      <button 
        className="flex items-center gap-3 text-white pointer-events-auto group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Menu</span>
        <div className="space-y-1">
          <div className="w-5 h-[2px] bg-white" />
          <div className="w-5 h-[2px] bg-white" />
          <div className="w-5 h-[2px] bg-white" />
        </div>
      </button>

      {/* Mobile/Full Menu Overlay (Simplified for now) */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 z-[60] flex items-center justify-center p-12 pointer-events-auto">
          <button 
            className="absolute top-8 right-8 text-white"
            onClick={() => setIsOpen(false)}
          >
            CLOSE
          </button>
          <div className="flex flex-col gap-6 text-center">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-4xl font-display font-bold text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
