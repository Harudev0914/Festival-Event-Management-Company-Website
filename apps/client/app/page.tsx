"use client";

import * as React from "react";
import { APP_NAME, DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, Card, AnimatedCounter, CountdownTimer, BannerCarousel } from "@repo/ui";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    artist: "https://www.ambitionmusik.com/image/artist/img_donmalik.png",
    accent: "Next Festival Arrival",
    title: "MIDNIGHT CITY FESTIVAL 2026",
    buttonText: "More Info",
  },
  {
    artist: "https://www.ambitionmusik.com/image/artist/img_leellamarz.png",
    accent: "Special Guest Lineup",
    title: "LEELLAMARZ LIVE PERFORMANCE",
    buttonText: "View Lineup",
  },
  {
    artist: "https://www.ambitionmusik.com/image/artist/img_ashisland.png",
    accent: "Ticket Open",
    title: "EARLY BIRD SALES START NOW",
    buttonText: "Book Tickets",
  }
];

// Helper to split text into characters for fine-grained animation
const CharacterFill = ({ text, scrollYProgress, start, end }: { text: string; scrollYProgress: any; start: number; end: number }) => {
  const chars = text.split("");
  
  return (
    <div className="flex justify-center">
      {chars.map((char, i) => {
        // Range for this character: offset the start to ensure it doesn't trigger at 0
        const charStart = start + (end - start) * (i / chars.length);
        const charEnd = start + (end - start) * ((i + 1) / chars.length);
        
        // Add a larger buffer to the start to ensure it doesn't trigger prematurely
        const color = useTransform(
          scrollYProgress, 
          [charStart + 0.15, charEnd + 0.15], 
          ["#3f3f46", "#ffffff"],
          { clamp: true }
        );
        
        return (
          <motion.span key={i} style={{ color }} className="inline-block font-display">
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as const } 
    }
  };

  React.useEffect(() => {
    // Simplified progress logic
    const start = Date.now();
    const duration = 2500;
    
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsLoaded(true);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isLoaded]);

  return (
    <div className="relative">
      {/* Splash Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
      >
        <div className="w-64 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] text-zinc-500 mt-4 tracking-[0.2em] uppercase font-bold">{Math.floor(progress)}%</div>
      </div>

      <main className={`min-h-screen bg-background text-foreground transition-all duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <section className="relative h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[115vw] h-[65vw] min-h-[115vh] min-w-[204vh] -translate-x-1/2 -translate-y-1/2 scale-110"
              src="https://www.youtube.com/embed/r3BvNyw0BJk?autoplay=1&mute=1&controls=0&loop=1&playlist=r3BvNyw0BJk&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&fs=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
            <div className="absolute inset-0 bg-background/40 backdrop-brightness-50" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[2]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              {/* Spectral Artist Backdrop - Behind ALL Text */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 0.7, scale: 0.9, y: 0 }}
                exit={{ opacity: 0, scale: 1.0, y: -20 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none"
              >
                <img 
                  src={HERO_SLIDES[currentSlide].artist} 
                  alt="Artist"
                  className="h-[70vh] md:h-[100vh] w-auto object-contain object-bottom mix-blend-lighten grayscale brightness-150"
                />
              </motion.div>

              <div className="relative z-20 text-center space-y-12 md:space-y-16 max-w-7xl px-4 md:px-6 [perspective:1000px]">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 md:space-y-6 flex flex-col items-center"
                >
                  <motion.div variants={item}>
                    <Text className="text-accent font-bold tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-md">
                      {HERO_SLIDES[currentSlide].accent}
                    </Text>
                  </motion.div>
                  
                  <motion.div variants={item} className="relative">
                    <Heading level={1} className="uppercase tracking-tighter text-4xl sm:text-6xl md:text-9xl font-display text-white break-keep drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                      {HERO_SLIDES[currentSlide].title}
                    </Heading>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8 md:space-y-12"
                >
                  <motion.div variants={item} className="scale-75 sm:scale-90 md:scale-100">
                    <CountdownTimer targetDate={new Date('2026-12-31T23:59:59')} />
                  </motion.div>

                  <motion.div variants={item} className="flex justify-center gap-4">
                    <Button variant="outline" className="px-8 md:px-12 py-2 md:py-3 uppercase tracking-widest font-bold bg-transparent hover:bg-white hover:text-black transition-all text-sm md:text-base">
                      {HERO_SLIDES[currentSlide].buttonText}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-30 flex gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentSlide 
                    ? "bg-white w-8 md:w-12" 
                    : "bg-white/20 w-2 md:w-3 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator (Vertical) */}
          <div className="absolute bottom-10 left-10 flex flex-col items-center gap-4 opacity-50 animate-pulse">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase vertical-text [writing-mode:vertical-rl]">Scroll Down</span>
            <div className="w-[1px] h-16 bg-white" />
          </div>
        </section>

        {/* Marquee Ticker Overlapping Hero */}
        <section className="relative -mt-20 z-30 pointer-events-none">
          <div className="w-full bg-[#1A1A1A] border-y border-[#c5a059] py-6 overflow-hidden -rotate-2 transform scale-110">
            <motion.div 
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-20 px-10 text-[#c5a059] font-bold text-sm tracking-widest uppercase font-display items-center">
                  {DEFAULT_TICKER_DATA.map((item, index) => (
                    <div key={index} className="flex col gap-1">
                      <span>{item.line1}</span>
                      <span>{item.line2}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Construction / Rental / Festival Section */}
        <section ref={sectionRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-6">
            <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-8 md:gap-16">
              {["Construction", "Rental", "Festival"].map((text, i) => (
                <div key={text} className="text-5xl sm:text-7xl md:text-[8rem] font-display font-bold leading-tight tracking-tighter uppercase text-center w-full">
                  <CharacterFill 
                    text={text} 
                    scrollYProgress={scrollYProgress} 
                    start={i * 0.25} // Narrower range to ensure it starts when inside
                    end={i * 0.25 + 0.2} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Construction Portfolio Section */}
        <section className="min-h-screen bg-background py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <Text className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4">Our Projects</Text>
              <Heading level={2} className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white">
                Construction<br />Portfolio
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Lounge Bar", type: "Interior", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop" },
                { title: "Festival Stage", type: "Structure", img: "https://images.unsplash.com/photo-1470229722910-72e5ef0b6f9a?q=80&w=800&auto=format&fit=crop" },
                { title: "Club Sound System", type: "Audio", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <Text className="text-white font-bold text-xl">{item.title}</Text>
                  <Text className="text-zinc-500 uppercase tracking-widest text-xs">{item.type}</Text>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
