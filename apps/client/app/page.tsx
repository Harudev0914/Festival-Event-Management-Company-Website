"use client";

import * as React from "react";
import { APP_NAME, DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, Card, AnimatedCounter, CountdownTimer, BannerCarousel } from "@repo/ui";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

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
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="relative z-20 text-center space-y-6 max-w-5xl px-6 pointer-events-none [perspective:1000px]"
          >
            <motion.div variants={item} className="[transform-style:preserve-3d]">
              <Heading level={1} className="leading-[1.1] tracking-tighter text-white font-display [transform:rotateX(10deg)] hover:[transform:rotateX(0deg)] transition-transform duration-500">
                CLIP YOUR STAGE <br />
              </Heading>
            </motion.div>
            <motion.div variants={item} className="[transform-style:preserve-3d]">
              <Heading level={1} className="leading-[1.1] tracking-tighter text-transparent font-display [text-stroke:2px_white] [-webkit-text-stroke:2px_white] [transform:rotateX(-10deg)] hover:[transform:rotateX(0deg)] transition-transform duration-500">
                IN ONE CLICK
              </Heading>
            </motion.div>
            <motion.div variants={item} className="pt-6">
              <Text className="text-xl text-zinc-300 font-medium tracking-wide uppercase italic font-display">
                From Underground Clubs to Mainstage Festivals, <br />
                We Build the Atmosphere You Only Dream Of.
              </Text>
            </motion.div>
          </motion.div>

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

          {/* 4. Festival D-Day Countdown Section (Restored) */}
          <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <Text className="text-accent font-bold tracking-[0.3em] uppercase text-sm">Next Festival Arrival</Text>
                <Heading level={2} className="uppercase tracking-tighter text-5xl font-display">MIDNIGHT CITY FESTIVAL 2026</Heading>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <CountdownTimer targetDate={new Date('2026-12-31T23:59:59')} />
              </motion.div>

              <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center"
                >
                  <Button variant="outline" className="mt-8 px-12 py-3 uppercase tracking-widest font-bold">More</Button>
              </motion.div>
            </div>
          </section>
      </main>
    </div>
  );
}
