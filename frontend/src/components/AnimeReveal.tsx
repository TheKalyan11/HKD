"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function AnimeReveal({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  duration = 1200
}: AnimeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  let translateY = 0;
  let translateX = 0;

  switch (direction) {
    case "up": translateY = 50; break;
    case "down": translateY = -50; break;
    case "left": translateX = 50; break;
    case "right": translateX = -50; break;
  }

  return (
    <motion.div 
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: translateY, x: translateX }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: translateY, x: translateX }}
      transition={{ 
        duration: duration / 1000, 
        delay: delay / 1000, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}
