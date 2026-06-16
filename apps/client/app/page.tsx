'use client';

import * as React from "react";
import { APP_NAME, DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, Card, AnimatedCounter, CountdownTimer, BannerCarousel } from "@repo/ui";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from 'next/dynamic';
import LoadingLogo from './components/LoadingLogo';

const HERO_SLIDES = [
  { artist: "https://www.ambitionmusik.com/image/artist/img_donmalik.png", accent: "Next Festival Arrival", title: "MIDNIGHT CITY FESTIVAL 2026", buttonText: "More Info" },
  { artist: "https://www.ambitionmusik.com/image/artist/img_leellamarz.png", accent: "Special Guest Lineup", title: "LEELLAMARZ LIVE PERFORMANCE", buttonText: "View Lineup" },
  { artist: "https://www.ambitionmusik.com/image/artist/img_ashisland.png", accent: "Ticket Open", title: "EARLY BIRD SALES START NOW", buttonText: "Book Tickets" }
];

const ScrollBackground = dynamic(() => import('./components/ScrollBackground'), { ssr: false });

const ScrollColorWord = ({ text, scrollYProgress, start, end }: { text: string; scrollYProgress: any; start: number; end: number }) => {
  const color = useTransform(scrollYProgress, [start, end], ["#3f3f46", "#ffffff"]);
  return (
    <div className="w-full text-center px-4">
      <motion.p style={{ color }} className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold leading-tight tracking-tighter uppercase">{text}</motion.p>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const containerRef = React.useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: mounted ? containerRef : undefined, 
    offset: ["start start", "end end"] 
  });

  React.useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className={"fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 " + (isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100')}>
        <LoadingLogo />
      </div>

      <main className="min-h-screen bg-black text-white">
        
        {/* 1. Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <iframe className="absolute top-1/2 left-1/2 w-[115vw] h-[65vw] min-h-[115vh] min-w-[204vh] -translate-x-1/2 -translate-y-1/2 scale-110" src="https://www.youtube.com/embed/AIogFe419-8?autoplay=1&mute=1&controls=0&loop=1&playlist=AIogFe419-8&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&fs=0" frameBorder="0" allow="autoplay; encrypted-media"></iframe>
            <div className="absolute inset-0 bg-black/40 backdrop-brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-[2]" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 z-10 flex items-center justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 0.7, scale: 0.9, y: 0 }} exit={{ opacity: 0, scale: 1.0, y: -20 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute inset-0 flex items-end justify-center z-0 pointer-events-none">
                <img src={HERO_SLIDES[currentSlide].artist} alt="Artist" className="h-[70vh] md:h-[100vh] w-auto object-contain object-bottom mix-blend-lighten grayscale brightness-150" />
              </motion.div>
              <div className="relative z-20 text-center px-4 space-y-6 flex flex-col items-center">
                <Text className="text-accent font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">{HERO_SLIDES[currentSlide].accent}</Text>
                <Heading level={1} className="text-3xl sm:text-5xl md:text-7xl font-display text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] uppercase tracking-tighter">{HERO_SLIDES[currentSlide].title}</Heading>
                <div className="scale-75 md:scale-100">
                    <CountdownTimer targetDate={new Date('2026-12-31T23:59:59')} />
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" className="px-6 md:px-8 py-2 uppercase tracking-widest font-bold bg-transparent border border-white text-white hover:!bg-white hover:!text-black transition-all duration-300 text-xs md:text-sm">
                    {HERO_SLIDES[currentSlide].buttonText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Horizontal Circular Slide Indicators */}
          <div className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-8 w-1 rounded-full transition-all duration-500 ${
                  i === currentSlide 
                    ? "bg-white scale-100" 
                    : "bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 2. Ticker */}
        <section className="relative -mt-20 z-30 pointer-events-none">
          <div className="w-full bg-[#1A1A1A] border-y border-[#c5a059] py-6 overflow-hidden -rotate-2 transform scale-110">
            <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex gap-20 px-10 text-[#c5a059] font-bold text-sm tracking-widest uppercase items-center">
                  {DEFAULT_TICKER_DATA.map((item, index) => <div key={index}><span>{item.line1}</span> - <span>{item.line2}</span></div>)}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Construction / Rental / Festival Section */}
        <section ref={containerRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black px-6">
            <div className="absolute inset-0 z-0"><ScrollBackground /></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8">
              <ScrollColorWord text="CONSTRUCTION" scrollYProgress={scrollYProgress} start={0.3} end={0.45} />
              <ScrollColorWord text="RENTAL" scrollYProgress={scrollYProgress} start={0.45} end={0.6} />
              <ScrollColorWord text="FESTIVAL" scrollYProgress={scrollYProgress} start={0.6} end={0.75} />
            </div>
          </div>
        </section>

        {/* 4. KLIPSE NEWS Section */}
        <section className="min-h-screen bg-white flex flex-col md:flex-row relative z-40">
          <div className="w-full md:w-1/2 bg-[#c84d4b] p-12 md:p-20 pt-40 md:pt-48 flex flex-col justify-start">
            <Heading level={2} className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">
              KLIPSE<br />NEWS
            </Heading>
            <p className="text-white/90 text-lg leading-relaxed">
              시공 현장의 최신 소식과 진행 중인 프로젝트, 미디어 노출 정보를 확인하실 수 있습니다.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col bg-white">
            <div className="space-y-12">
              {[
                { title: "2026 대규모 페스티벌 무대 시공", desc: "2026년 5월, 대규모 야외 페스티벌 무대 제작 및 시공 완료." },
                { title: "K-콘서트 투어 시공 협력", desc: "최신 K-콘서트 투어의 시공 파트너로 선정되었습니다." },
                { title: "신규 행사장 설계 및 시공", desc: "고객 맞춤형 행사장 설계 및 시공 서비스가 시작되었습니다." }
              ].map((item, i) => (
                <div key={i} className="border-b border-zinc-200 pb-8">
                  <Text className="text-[#c84d4b] font-bold text-xs uppercase tracking-widest mb-2">ANNOUNCEMENT</Text>
                  <Heading level={3} className="text-xl md:text-2xl font-bold text-black mb-3">{item.title}</Heading>
                  <p className="text-zinc-600 mb-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
