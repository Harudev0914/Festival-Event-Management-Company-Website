"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const RollingNumber = ({ value }: { value: string | number }) => {
  const digits = String(value).padStart(2, '0').split('');

  return (
    <div className="flex gap-0.5 md:gap-1">
      {digits.map((digit, idx) => (
        <div key={idx} className="relative h-12 sm:h-20 md:h-32 w-8 sm:w-12 md:w-16 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={digit}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-2xl sm:text-5xl md:text-8xl font-bold text-white font-display"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center">
      <div className="relative h-12 sm:h-20 md:h-32 flex items-center justify-center">
          <span className="text-xl sm:text-3xl md:text-6xl font-bold text-white font-display mr-1 md:mr-2">D-</span>
          <RollingNumber value={timeLeft.days} />
      </div>
      <div className="text-2xl sm:text-5xl md:text-8xl font-bold text-zinc-700">:</div>
      <RollingNumber value={timeLeft.hours} />
      <div className="text-2xl sm:text-5xl md:text-8xl font-bold text-zinc-700">:</div>
      <RollingNumber value={timeLeft.minutes} />
      <div className="text-2xl sm:text-5xl md:text-8xl font-bold text-zinc-700">:</div>
      <RollingNumber value={timeLeft.seconds} />
    </div>
  );
};
