"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import Button from "@/components/ui/Button";

/**
 * HomeHero — full-screen hero with background image (or navy/gold gradient
 * placeholder), dark overlay, animated headline, and scroll indicator.
 *
 * Respects prefers-reduced-motion: all entrance animations are disabled
 * when the OS setting is active; content is immediately visible.
 *
 * The navbar sits on top of this section and is transparent over it.
 */
export default function HomeHero() {
  const reducedMotion = useReducedMotion();

  // When reduced motion is preferred, skip to visible state instantly
  const fadeIn = (delay: number) =>
    reducedMotion
      ? { initial: {}, animate: {}, transition: {} }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const h1Anim = reducedMotion
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] as const },
      };

  const dividerAnim = reducedMotion
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { scaleX: 0, opacity: 0 },
        animate: { scaleX: 1, opacity: 1 },
        transition: { duration: 0.6, delay: 0.38 },
      };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Welcome to COCIN LCC Nyango Gyel"
    >
      {/* ── Background image (or gradient placeholder) ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={images.hero.src}
          alt=""   /* decorative — section aria-label covers the context */
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy/gold gradient — visible as placeholder when photo is missing,
            and always used as the darkening overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-dark)]/95 via-[var(--color-navy)]/88 to-[var(--color-navy-light)]/80" />
        {/* Subtle gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgb(201_162_75_/_0.08),_transparent)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 lg:py-40">

        {/* Gold eyebrow label */}
        <motion.p
          {...fadeIn(0.1)}
          className="text-[var(--color-gold)] text-sm font-semibold uppercase tracking-[0.25em] mb-5"
        >
          Welcome to
        </motion.p>

        {/* Church name */}
        <motion.h1
          {...h1Anim}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6"
        >
          {/* TODO: update if church name changes in lib/site.ts */}
          COCIN LCC{" "}
          <span className="text-[var(--color-gold)]">Nyango Gyel</span>
        </motion.h1>

        {/* Thin gold divider */}
        <motion.div
          {...dividerAnim}
          className="h-px w-24 bg-[var(--color-gold)] mx-auto mb-6 origin-center"
          aria-hidden="true"
        />

        {/* Tagline */}
        <motion.p
          {...fadeIn(0.45)}
          className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          {/* TODO: update tagline in lib/site.ts */}
          {siteConfig.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeIn(0.58)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="gold" size="lg" href="/about">
            Plan Your Visit
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/events"
            className="border-white/50 text-white hover:bg-white hover:text-[var(--color-navy)]"
          >
            {/* TODO: replace href with a sermon/media page when it exists */}
            See Upcoming Events
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll indicator (hidden when reduced motion) ── */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[var(--color-gold)]/60" />
          </motion.div>
        </motion.div>
      )}

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-parchment)] to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
