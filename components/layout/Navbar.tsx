"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig, LOGO_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // Only the homepage starts transparent — all other routes are always solid navy.
  const isHome = pathname === "/";

  // On the homepage, switch to solid once the user scrolls past 60 px.
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll(); // initialise immediately (handles reload-while-scrolled)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  // Solid when: not on homepage | scrolled | mobile menu open
  const solid = !isHome || scrolled || mobileOpen;

  // Nav links excluding "Give" (rendered as a CTA button)
  const navLinks = siteConfig.nav.filter((l) => l.href !== "/give");

  return (
    <>
      {/* ── Skip-to-content link (keyboard / screen-reader users) ── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          solid
            ? "bg-[var(--color-navy)] shadow-[var(--shadow-nav)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 xl:h-20 gap-2 min-w-0">

            {/* ── Logo / Church Name ── */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0 min-h-[48px]"
              aria-label={`${siteConfig.name} — Home`}
            >
              {/* Off-white badge keeps the dark logo visible on the navy bar */}
              <span
                className="flex items-center justify-center w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-white/90 overflow-hidden shrink-0"
                aria-hidden="true"
              >
                <Image
                  src={LOGO_PATH}
                  alt=""
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                  priority
                />
              </span>
              <span className="font-display font-semibold text-white text-sm xl:text-base leading-tight whitespace-nowrap">
                COCIN{" "}
                <span className="text-[var(--color-gold)]">Nyango Gyel</span>
              </span>
            </Link>

            {/* ── Desktop Nav (≥ 1024 px) ── */}
            <nav
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 min-w-0 shrink"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  reducedMotion={!!reducedMotion}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center shrink-0">
              <Button variant="gold" size="sm" href="/give" className="whitespace-nowrap">
                Give Now
              </Button>
            </div>

            {/* ── Mobile Toggle (< 1024 px) ── */}
            <button
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center shrink-0"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <X size={22} aria-hidden="true" />
                : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reducedMotion ? {} : { opacity: 0, height: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <nav
                className="flex flex-col px-4 py-4 gap-1"
                aria-label="Mobile navigation"
              >
                {siteConfig.nav.map((link) =>
                  link.href === "/give" ? (
                    <Button
                      key={link.href}
                      variant="gold"
                      size="md"
                      href={link.href}
                      className="mt-3 w-full whitespace-nowrap"
                    >
                      Give Now
                    </Button>
                  ) : (
                    <MobileNavLink
                      key={link.href}
                      href={link.href}
                      active={pathname === link.href}
                    >
                      {link.label}
                    </MobileNavLink>
                  )
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so page content isn't hidden under the fixed nav.
          The homepage hero fills the full screen, so no spacer needed there. */}
      {!isHome && (
        <div className="h-16 xl:h-20" aria-hidden="true" />
      )}
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function NavLink({
  href,
  active,
  reducedMotion,
  children,
}: {
  href: string;
  active: boolean;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        // Tighter padding at lg (1024–1279 px), generous at xl (≥ 1280 px)
        "relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium tracking-wide rounded-md",
        "min-h-[48px] inline-flex items-center whitespace-nowrap",
        "transition-colors duration-200",
        "text-white/80 hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)]",
        active && "text-white"
      )}
    >
      {children}
      {active && (
        reducedMotion ? (
          <span className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-[var(--color-gold)] rounded-full" />
        ) : (
          <motion.span
            layoutId="nav-indicator"
            className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-[var(--color-gold)] rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium",
        "min-h-[48px]",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)]",
        active
          ? "bg-white/10 text-[var(--color-gold)]"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      {active && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] shrink-0" aria-hidden="true" />
      )}
      {children}
    </Link>
  );
}
