"use client";

import * as React from "react";
import { APP_NAME, DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, Card, AnimatedCounter, CountdownTimer, BannerCarousel } from "@repo/ui";
import { motion, AnimatePresence } from "framer-motion";
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

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
      transition: { duration: 0.8, ease: "easeOut" } 
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
                initial={{ opacity: 0, scale: 1.1, y: 40 }}
                animate={{ opacity: 0.7, scale: 1.25, y: 0 }}
                exit={{ opacity: 0, scale: 1.3, y: -20 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none"
              >
                <img 
                  src={HERO_SLIDES[currentSlide].artist} 
                  alt="Artist"
                  className="h-[80vh] md:h-[120vh] w-auto object-contain object-bottom mix-blend-lighten grayscale brightness-150"
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
                      <div key={index} className="flex flex-col gap-1">
                        <span>{item.line1}</span>
                        <span>{item.line2}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 5. DJ Lineup & Schedule Section */}
          <section className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="space-y-4">
                  <Text className="text-accent font-bold tracking-[0.3em] uppercase text-sm">Artist Lineup</Text>
                  <Heading level={2} className="text-5xl md:text-7xl uppercase tracking-tighter font-display">
                    DJ SCHEDULE <br /> 2026 SEASON
                  </Heading>
                </div>
                <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black transition-all group">
                  View All Artists <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "DJ KROME",
                    genre: "TECHNO / INDUSTRIAL",
                    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?q=80&w=1000&auto=format&fit=crop",
                    schedule: [
                      { date: "JUN 20", event: "MIDNIGHT CITY FESTIVAL" },
                      { date: "JUN 25", event: "CLUB CHROMA SEOUL" },
                    ]
                  },
                  {
                    name: "DJ VIRTUE",
                    genre: "PROGRESSIVE HOUSE",
                    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop",
                    schedule: [
                      { date: "JUN 22", event: "ULTRA SEOUL 2026" },
                      { date: "JUL 01", event: "WAVE MUSIC FESTIVAL" },
                    ]
                  },
                  {
                    name: "DJ ECHO",
                    genre: "TRAP / HIP-HOP",
                    image: "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?q=80&w=1000&auto=format&fit=crop",
                    schedule: [
                      { date: "JUN 18", event: "UNDERGROUND SESSION" },
                      { date: "JUN 29", event: "NEON GARDEN PARTY" },
                    ]
                  }
                ].map((dj, i) => (
                  <motion.div 
                    key={dj.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                      <img 
                        src={dj.image} 
                        alt={dj.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6">
                        <div className="text-[10px] font-bold tracking-widest text-accent mb-1 uppercase">{dj.genre}</div>
                        <Heading level={3} className="text-3xl uppercase font-display">{dj.name}</Heading>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {dj.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 hover:border-accent/30 transition-colors group/item">
                          <div className="flex gap-4 items-center">
                            <span className="text-xs font-bold text-zinc-500 tabular-nums">{item.date}</span>
                            <span className="text-sm font-medium text-white group-hover/item:text-accent transition-colors">{item.event}</span>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

      </main>
    </div>
  );
}
