"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export default function LoadingLogo() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase"
      >
        KLIPSE
      </motion.div>
    </div>
  );
}
