"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        viewBox="0 0 500 100"
        className="w-64 h-auto"
        initial="hidden"
        animate="visible"
      >
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display text-[80px] font-bold uppercase fill-transparent stroke-white stroke-[2px]"
          variants={pathVariants}
        >
          KLIPSE
        </motion.text>
      </motion.svg>
    </div>
  );
}
