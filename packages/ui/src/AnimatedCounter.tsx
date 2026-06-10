"use client";

import * as React from "react";
import { animate, useInView } from "framer-motion";

export const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration,
      onUpdate: (latest) => {
        node.textContent = Math.floor(latest).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={nodeRef} />;
};
