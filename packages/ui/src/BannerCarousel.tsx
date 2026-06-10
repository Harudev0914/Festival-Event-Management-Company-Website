"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./index";

const banners = [
  { id: 1, title: "10th Anniversary Special Site", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800", link: "/events/1" },
  { id: 2, title: "Jamland Special Record", image: "https://images.unsplash.com/photo-1493225255756-d922e8749103?auto=format&fit=crop&q=80&w=800", link: "/events/2" },
  { id: 3, title: "Zenjin Mito Special Site", image: "https://images.unsplash.com/photo-1514525253161-789311681283?auto=format&fit=crop&q=80&w=800", link: "/events/3" },
];

export const BannerCarousel = () => {
  const [index, setIndex] = React.useState(0);

  const next = () => setIndex((prev) => (prev + 1) % banners.length);
  const prev = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full max-w-5xl mx-auto -mt-24 z-30">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl shadow-2xl border border-zinc-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute inset-0"
          >
            <img src={banners[index].image} alt={banners[index].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button variant="primary" onClick={() => window.location.href = banners[index].link}>상세보기</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-primary transition-colors">←</button>
        <button onClick={next} className="w-10 h-10 rounded-full bg-zinc-800 text-white hover:bg-primary transition-colors">→</button>
      </div>
    </div>
  );
};
