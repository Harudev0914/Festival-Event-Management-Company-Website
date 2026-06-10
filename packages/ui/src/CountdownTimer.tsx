"use client";

import * as React from "react";

export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 justify-center font-display text-white tabular-nums tracking-tighter">
      <span className="text-5xl md:text-8xl font-bold">D-{String(timeLeft.days).padStart(3, '0')}</span>
      <span className="text-5xl md:text-8xl font-bold">:</span>
      <span className="text-5xl md:text-8xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-5xl md:text-8xl font-bold">:</span>
      <span className="text-5xl md:text-8xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-5xl md:text-8xl font-bold">:</span>
      <span className="text-5xl md:text-8xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};
