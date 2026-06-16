"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Set the position directly to the mouse coordinates
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovered(true);
      }
    };
    const handleMouseOut = () => setIsHovered(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full border border-white pointer-events-none mix-blend-difference hidden md:block"
      style={{
        cursor: 'none',
      }}
      animate={{ 
        width: isHovered ? 48 : 32, 
        height: isHovered ? 48 : 32 
      }}
      style={{
        x: cursorX,
        y: cursorY,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
    />
  );
};
