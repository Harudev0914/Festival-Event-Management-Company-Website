"use client";

import * as React from "react";
import { APP_NAME, DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, Card, AnimatedCounter, CountdownTimer, BannerCarousel } from "@repo/ui";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from 'next/dynamic';
import LoadingLogo from './components/LoadingLogo';

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

const ScrollBackground = dynamic(() => import('./components/ScrollBackground'), {
  ssr: false,
});

// 휠 스크롤에 따라 색상이 회색에서 흰색으로 1:1로 변하는 단어 컴포넌트
const ScrollColorWord = ({ text, scrollYProgress, start, end }: { text: string; scrollYProgress: any; start: number; end: number }) => {
  // 스크롤 진행률에 따라 색상을 회색(#3f3f46)에서 흰색(#ffffff)으로 1:1 매핑
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["#3f3f46", "#ffffff"]
  );

  return (
    <div className="w-full text-center px-4">
      <motion.p
        style={{ color }}
        className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold leading-tight tracking-tighter uppercase"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // 컨테이너 스크롤 감지를 위한 Ref
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
    const start = Date.now();
    const duration = 2500;
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (elapsed < duration) requestAnimationFrame(updateProgress);
      else setIsLoaded(true);
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
        <LoadingLogo />
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
                    <Button variant="outline" className="px-8 md:px-12 py-2 md:py-3 uppercase tracking-widest font-bold bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all text-sm md:text-base">
                      {HERO_SLIDES[currentSlide].buttonText}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
{/* Horizontal Circular Slide Indicators */}
<div className="absolute top-1/2 left-10 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-auto">
  {HERO_SLIDES.map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentSlide(i)}
      className={`h-10 w-1 rounded-full transition-all duration-500 ${
        i === currentSlide 
          ? "bg-white scale-100" 
          : "bg-white/20 hover:bg-white/50 hover:scale-105"
      }`}
    />
  ))}
</div>
        </section>

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
        <section ref={containerRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black px-6">
            <div className="absolute inset-0 z-0">
              <ScrollBackground />
            </div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
              <ScrollColorWord text="CONSTRUCTION" scrollYProgress={scrollYProgress} start={0.3} end={0.45} />
              <ScrollColorWord text="RENTAL" scrollYProgress={scrollYProgress} start={0.45} end={0.6} />
              <ScrollColorWord text="FESTIVAL" scrollYProgress={scrollYProgress} start={0.6} end={0.75} />
            </div>
          </div>
        </section>

        {/* 6. Construction Portfolio Section - Hidden
        <section className="min-h-screen bg-black py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <Text className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4">Our Projects</Text>
                <Heading level={2} className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white">
                  Construction<br />Portfolio
                </Heading>
              </div>
              <Button className="px-10 py-6 text-lg uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black transition-all duration-300 rounded-full shadow-lg text-white">
                문의 하기
              </Button>
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
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6">
                      <Text className="text-white font-bold text-2xl mb-1">{item.title}</Text>
                      <Text className="text-accent uppercase tracking-widest text-xs">{item.type}</Text>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        */}
      </main>
    </div>
  );
}
