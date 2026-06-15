"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  // Clearer, more readable letter forms for KLIPSE
  // Clearer, more readable letter forms for KLIPSE
  const paths = [
    "M 20 20 L 20 80 M 20 50 L 50 20 M 20 50 L 50 80", // K
    "M 80 20 L 80 80 L 130 80",                         // L
    "M 150 20 L 150 80",                               // I
    "M 180 80 L 180 20 L 210 20 Q 230 20 230 50 Q 230 80 210 80 L 180 80", // P
    "M 270 20 Q 240 20 240 40 Q 240 60 270 60 Q 290 60 290 80 Q 290 100 260 100", // S
    "M 310 20 L 310 80 L 350 80 M 310 50 L 340 50 M 310 20 L 350 20"  // E
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
