"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  // More accurate letter forms
  const paths = [
    "M 20 20 L 20 80 M 20 50 L 50 20 M 20 50 L 50 80", // K
    "M 70 20 L 70 80 L 100 80",                         // L
    "M 120 20 L 120 80 M 120 20 L 150 20 M 120 80 L 150 80 M 135 20 L 135 80", // I
    "M 170 80 L 170 20 L 200 20 Q 215 20 215 50 Q 215 80 200 80 L 170 80", // P
    "M 260 20 Q 230 20 230 50 Q 230 80 260 80 Q 280 80 280 65 Q 280 50 260 50 Q 240 50 240 35 Q 240 20 260 20", // S
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
        viewBox="0 0 360 100"
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />
        ))}
      </motion.svg>
    </div>
  );
}
