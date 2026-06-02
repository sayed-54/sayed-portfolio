"use client";

/**
 * RevealOnScroll — Framer Motion scroll-reveal wrapper
 * Wraps any section/element with a smooth enter animation
 * triggered when it enters the viewport.
 *
 * Props:
 *   delay      — stagger offset in seconds (default 0)
 *   direction  — which axis to enter from: "up" | "left" | "right" (default "up")
 *   duration   — animation duration in seconds (default 0.6)
 *   amount     — how much of the element must be visible (default 0.15)
 */

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  duration?: number;
  amount?: number;
  className?: string;
}

const directionMap = {
  up:    { y: 24, x: 0 },
  left:  { x: -24, y: 0 },
  right: { x: 24, y: 0 },
};

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  amount = 0.15,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const { x = 0, y = 0 } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // custom spring-like cubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
