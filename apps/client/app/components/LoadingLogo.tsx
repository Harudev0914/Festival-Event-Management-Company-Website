"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  // Clearer, more readable letter forms for klipse
  const paths = [
    "M 20 20 L 20 80 M 20 50 L 40 50 L 20 80", // k
    "M 70 20 L 70 80",                         // l
    "M 100 40 L 100 80",                       // i
    "M 130 80 L 130 40 Q 150 40 150 60 Q 150 80 130 80", // p
    "M 190 80 Q 160 80 160 60 Q 160 40 190 40 Q 210 40 210 55 Q 210 70 190 70", // s
    "M 240 60 Q 240 40 260 40 Q 280 40 280 60 Q 280 80 260 80 Q 240 80 240 60"  // e
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
