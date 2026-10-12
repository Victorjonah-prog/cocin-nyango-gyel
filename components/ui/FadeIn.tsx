"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;       // seconds
  duration?: number;    // seconds
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;       // only animate once (default true)
  amount?: number;      // 0–1, how much of element must be visible
}

/**
 * FadeIn — scroll-reveal wrapper using Framer Motion.
 * Respects `prefers-reduced-motion`: when the OS setting is active,
 * the element renders immediately with no animation.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
  amount = 0.2,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const reducedMotion = useReducedMotion();

  const offsetMap = {
    up:    { y: 24 },
    down:  { y: -24 },
    left:  { x: 24 },
    right: { x: -24 },
    none:  {},
  };

  // When reduced motion is preferred, skip animation entirely
  if (reducedMotion) {
    return <div ref={ref} className={cn(className)}>{children}</div>;
  }

  const initial = { opacity: 0, ...offsetMap[direction] };
  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
