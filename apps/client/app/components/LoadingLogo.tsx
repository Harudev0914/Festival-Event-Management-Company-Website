"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  // Clearer, more readable letter forms for KLIPSE
  const paths = [
    "M 20 20 L 20 80 M 20 50 L 50 20 M 20 50 L 50 80", // K
    "M 70 20 L 70 80 L 110 80",                         // L
    "M 130 20 L 130 80",                               // I
    "M 160 80 L 160 20 L 190 20 Q 210 20 210 50 Q 210 80 190 80 L 160 80", // P
    "M 250 20 L 220 20 Q 210 20 210 35 Q 210 50 240 50 Q 260 50 260 65 Q 260 80 250 80 L 220 80", // S
    "M 280 20 L 280 80 L 320 80 M 280 50 L 310 50 M 280 20 L 320 20"  // E
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <motion.svg
        viewBox="0 0 350 100"
        className="w-80 h-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            fill="transparent"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />
        ))}
      </motion.svg>
    </div>
  );
}
