"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Megaphone,
  Calendar,
  Heart,
  MoreHorizontal,
  X,
  Info,
  FolderOpen,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MobileBottomNav — sticky bottom navigation visible below the md breakpoint.
 * Shows 4 primary destinations + a "More" button that opens a full-screen menu.
 */

const primaryLinks = [
  { href: "/",              label: "Home",          Icon: Home       },
  { href: "/announcements", label: "Notices",       Icon: Megaphone  },
  { href: "/events",        label: "Events",        Icon: Calendar   },
  { href: "/give",          label: "Give",          Icon: Heart      },
];

const moreLinks = [
  { href: "/about",     label: "About Us",   Icon: Info          },
  { href: "/projects",  label: "Projects",   Icon: FolderOpen    },
  { href: "/elders",    label: "Our Elders", Icon: Users         },
  { href: "/dashboard", label: "Dashboard",  Icon: LayoutDashboard },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  // Close "More" overlay on route change
  useEffect(() => {
    const id = setTimeout(() => setMoreOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  // Trap scroll when overlay is open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [moreOpen]);

  return (
    <>
      {/* ── "More" full-screen overlay ── */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? {} : { opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-[var(--color-navy)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="More pages"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
              <span className="font-display text-white text-xl font-semibold">
                More
              </span>
              <button
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Divider */}
            <div className="divider-gold mx-5 mb-6" />

            {/* Links */}
            <nav aria-label="Additional pages" className="flex-1 px-4 space-y-2">
              {moreLinks.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 rounded-xl",
                      "text-base font-medium min-h-[56px]",
                      "transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
                      active
                        ? "bg-white/10 text-[var(--color-gold)]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={22} aria-hidden="true" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Gold accent at the bottom of the overlay */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mt-auto" />
            {/* Padding so overlay content doesn't sit behind the nav bar itself */}
            <div className="h-[72px]" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom bar ── */}
      <nav
        aria-label="Mobile quick navigation"
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50",
          "bg-white border-t border-[var(--color-border)]",
          "shadow-[0_-4px_20px_0_rgb(11_31_58_/_0.10)]",
          "safe-area-pb" // handled below via inline style
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-stretch h-[68px]">
          {primaryLinks.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <BottomNavItem
                key={href}
                href={href}
                label={label}
                Icon={Icon}
                active={active}
              />
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(true)}
            aria-label="More pages"
            aria-expanded={moreOpen}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1",
              "text-[var(--color-muted)] hover:text-[var(--color-navy)]",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-gold)]",
              moreOpen && "text-[var(--color-navy)]"
            )}
          >
            <MoreHorizontal
              size={22}
              strokeWidth={moreOpen ? 2.5 : 2}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-wide uppercase">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

function BottomNavItem({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-1",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-gold)]",
        active
          ? "text-[var(--color-navy)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-navy)]"
      )}
    >
      {/* Active indicator dot above icon */}
      <span
        className={cn(
          "w-1 h-1 rounded-full mb-0.5 transition-all duration-150",
          active ? "bg-[var(--color-gold)]" : "bg-transparent"
        )}
        aria-hidden="true"
      />
      <Icon
        size={22}
        strokeWidth={active ? 2.5 : 2}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          active && "text-[var(--color-navy)]"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
