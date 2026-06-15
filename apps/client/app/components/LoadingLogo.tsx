"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  // Clearer, more readable letter forms for KLIPSE
  const paths = [
    "M 20 20 L 20 80 M 20 50 L 50 20 M 20 50 L 50 80", // K
    "M 80 20 L 80 80 L 120 80",                         // L
    "M 140 20 L 140 80",                               // I
    "M 170 80 L 170 20 L 200 20 Q 220 20 220 50 Q 220 80 200 80 L 170 80", // P
    "M 260 20 Q 230 20 230 40 Q 230 60 260 60 Q 280 60 280 80 Q 280 100 250 100", // S
    "M 300 20 L 300 80 L 340 80 M 300 50 L 330 50 M 300 20 L 340 20"  // E
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
