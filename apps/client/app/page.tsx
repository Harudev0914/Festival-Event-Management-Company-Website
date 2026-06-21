'use client';

import * as React from "react";
import { DEFAULT_TICKER_DATA } from "@repo/common";
import { Heading, Text, Button, CountdownTimer } from "@repo/ui";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from 'next/dynamic';
import LoadingLogo from './components/LoadingLogo';

const HERO_SLIDES = [
  { artist: "https://www.ambitionmusik.com/image/artist/img_donmalik.png", accent: "Next Festival Arrival", title: "MIDNIGHT CITY FESTIVAL 2026", buttonText: "More Info" },
  { artist: "https://www.ambitionmusik.com/image/artist/img_leellamarz.png", accent: "Special Guest Lineup", title: "LEELLAMARZ LIVE PERFORMANCE", buttonText: "View Lineup" },
  { artist: "https://www.ambitionmusik.com/image/artist/img_ashisland.png", accent: "Ticket Open", title: "EARLY BIRD SALES START NOW", buttonText: "Book Tickets" }
];

const DJ_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1514525253343-2399285090f4?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574482620826-465749364939?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86578?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493225255756-d922f6042a04?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520523839897-fd0d52a00e90?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558000336-7356312444fc?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571266066728-f684c4c1537a?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514533457196-88e55e09f7a5?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=400&h=400&auto=format&fit=crop"
];

const ScrollBackground = dynamic(() => import('./components/ScrollBackground'), { ssr: false });

const ScrollColorWord = ({ text, scrollYProgress, start, end }: { text: string; scrollYProgress: MotionValue<number>; start: number; end: number }) => {
  const color = useTransform(scrollYProgress, [start, end], ["#3f3f46", "#ffffff"]);
  return (
    <div className="w-full text-center px-4">
      <motion.p style={{ color }} className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold leading-tight tracking-tighter uppercase">{text}</motion.p>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 332; // Card width (300) + gap (32)
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scroll
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = 'auto'; // Re-enable scroll
    }, 1500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto'; // Ensure cleanup
    };
  }, []);

  return (
    <div className="relative">
      <div className={"fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 " + (isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100')}>
        <LoadingLogo />
      </div>

      <main className={"min-h-screen bg-black text-white " + (!isLoaded ? 'overflow-hidden h-screen' : '')}>
        
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
          <div className="w-full md:w-1/2 bg-[#c84d4b] p-12 md:p-20 pt-40 md:pt-48 flex flex-col justify-start md:sticky md:top-0 md:h-screen">
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
                { title: "신규 행사장 설계 및 시공", desc: "고객 맞춤형 행사장 설계 및 시공 서비스가 시작되었습니다." },
                { title: "글로벌 프로젝트 수주", desc: "해외 대형 프로젝트 수주로 글로벌 시장 진출 가속화." },
                { title: "기술 혁신상 수상", desc: "무대 시공 기술력을 인정받아 업계 혁신상을 수상했습니다." },
                { title: "지속 가능한 페스티벌 캠페인", desc: "친환경 무대 제작을 위한 캠페인을 본격 시작합니다." }
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

        {/* 5. New Section (Fanplusone) */}
        <section className="min-h-screen relative z-40 overflow-hidden flex items-center justify-start p-12 md:p-20 bg-[#F2F2F2]">
          {/* Background Image Layer (aligned to bottom right) */}
          <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1017&h=1017&auto=format&fit=crop" 
              alt="Construction Image" 
              className="w-full h-full md:w-[90vh] md:h-[90vh] object-cover"
            />
          </div>

          {/* Left-aligned Content Box */}
          <div className="relative z-10 w-full max-w-4xl text-left flex flex-col justify-end h-full">
            <div className="mb-auto">
                <Text className="!text-[#d44949] font-bold text-xs uppercase tracking-widest mb-4">CONSTRUCTION</Text>
                <div className="inline-block bg-white p-4 rounded-md mb-2">
                <Heading level={2} className="text-4xl md:text-6xl font-bold !text-[#121212] uppercase tracking-tighter font-display">
                    CONSTRUCTION
                </Heading>
                </div>
                <div className="inline-block bg-white p-4 rounded-md mb-6">
                <Heading level={3} className="text-4xl md:text-6xl font-bold !text-[#121212] uppercase tracking-tighter font-display">
                    SUB-HEADER HERE
                </Heading>
                </div>
            </div>
            
            <div className="bg-[#1A1A1A] p-10 shadow-2xl border border-zinc-700 w-full max-w-[1249px] flex flex-col justify-center rounded-[4px] mt-auto">
              <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                As G-DRAGON opens a bold new chapter, becomes part of the exclusive community that follows his journey every step of the way. From one-of-a-kind experiences, first access to albums and tickets, the official fan club is your key to his creative universe.
              </p>
              <Button className="w-full !bg-[#f3c950] !text-[#121212] px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#d9b244] hover:text-white transition-all flex items-center justify-center gap-2 rounded-[4px] shadow-none">
                JOIN FANPLUSONE JAPAN
              </Button>
            </div>
          </div>
        </section>

        {/* 6. New Section (Rental) */}
        <section className="min-h-screen relative z-40 overflow-hidden flex flex-col justify-center p-12 md:p-20 bg-white">
          <div className="max-w-full mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Header Column */}
            <div className="md:col-span-3">
              <Text className="!text-[#d44949] font-bold text-xs uppercase tracking-widest mb-4">RECENT</Text>
              <Heading level={2} className="text-4xl md:text-6xl font-bold !text-[#121212] uppercase tracking-tighter font-display mb-8">
                LATEST<br />VIDEOS
              </Heading>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollGallery('left')} 
                  className="p-4 border border-zinc-300 rounded-full hover:bg-zinc-100 transition-all text-[#121212] active:scale-90"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => scrollGallery('right')} 
                  className="p-4 border border-zinc-300 rounded-full hover:bg-zinc-100 transition-all text-[#121212] active:scale-90"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right Gallery Column */}
            <div className="md:col-span-9 w-full overflow-hidden relative">
              <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory" style={{ scrollBehavior: 'smooth' }} ref={galleryRef}>
                {[
                  { title: "G-DRAGON - TOO BAD (FEAT. ANDERSON .PAAK) (OFFICIAL VIDEO)", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&h=600&auto=format&fit=crop" },
                  { title: "G-DRAGON - DRAMA (OFFICIAL VIDEO)", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&h=600&auto=format&fit=crop" },
                  { title: "G-DRAGON - ANOTHER TRACK (OFFICIAL VIDEO)", img: "https://images.unsplash.com/photo-1493225255756-d922f6042a04?q=80&w=800&h=600&auto=format&fit=crop" },
                  { title: "G-DRAGON - POWER (OFFICIAL VIDEO)", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&h=600&auto=format&fit=crop" },
                  { title: "G-DRAGON - HEARTBREAKER (LIVE REMIX)", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&h=600&auto=format&fit=crop" }
                ].map((video, i) => (
                  <div key={i} className="group w-[300px] flex-shrink-0 snap-start">
                    <div className="overflow-hidden rounded-lg mb-4 w-full">
                      <img src={video.img} alt={video.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-[#121212] mb-2 leading-tight line-clamp-2 overflow-hidden">{video.title}</h3>
                    <button className="text-[#d44949] font-bold flex items-center gap-2 hover:underline">
                      See more <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* 7. Artist Gallery Section */}
        <section className="h-[60vh] relative z-40 p-0 bg-black flex flex-col items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            
            {/* Sliding Images (Background) with Masking */}
            <div className="flex flex-col gap-4 overflow-hidden w-full items-center justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div 
                className="flex gap-4 justify-center"
                animate={{ x: [0, -1200] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              >
                {[...DJ_GALLERY_IMAGES, ...DJ_GALLERY_IMAGES].map((img, i) => (
                    <div key={i} className="w-64 h-40 flex-shrink-0 overflow-hidden">
                        <img src={img} alt={`Artist ${i+1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                ))}
              </motion.div>
              <motion.div 
                className="flex gap-4 justify-center"
                animate={{ x: [-1200, 0] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              >
                {[...DJ_GALLERY_IMAGES, ...DJ_GALLERY_IMAGES].map((img, i) => (
                    <div key={i} className="w-64 h-40 flex-shrink-0 overflow-hidden">
                        <img src={img} alt={`Artist ${i+1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                ))}
              </motion.div>
            </div>

            {/* Overlay Content (Foreground) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60">
              <Heading level={2} className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter font-display mb-6">
                  DJ GALLERY
              </Heading>
              <Button variant="outline" className="uppercase tracking-widest font-bold border border-white text-white hover:!bg-white hover:!text-black transition-all duration-300">
                  VIEW MORE
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
