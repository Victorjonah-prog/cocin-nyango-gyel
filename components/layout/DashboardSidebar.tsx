"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  FolderKanban,
  Users,
  Heart,
  LogOut,
} from "lucide-react";
import { siteConfig, LOGO_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

const dashboardNav = [
  { label: "Overview",      href: "/dashboard",              icon: LayoutDashboard },
  { label: "Announcements", href: "/dashboard/announcements",icon: Megaphone },
  { label: "Events",        href: "/dashboard/events",       icon: CalendarDays },
  { label: "Projects",      href: "/dashboard/projects",     icon: FolderKanban },
  { label: "Members",       href: "/dashboard/members",      icon: Users },
  { label: "Giving",        href: "/dashboard/giving",       icon: Heart },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-64 shrink-0 min-h-screen bg-[var(--color-navy)] text-white"
      aria-label="Dashboard navigation"
    >
      {/* ── Brand ── */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        {/* Off-white badge keeps the dark logo visible on the navy sidebar */}
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 overflow-hidden shrink-0">
          <Image
            src={LOGO_PATH}
            alt="COCIN Church of Christ in Nations official logo"
            width={40}
            height={40}
            className="object-cover w-full h-full"
            priority
          />
        </span>
        <span className="font-display font-semibold text-sm leading-tight">
          COCIN{" "}
          <span className="text-[var(--color-gold)]">Nyango Gyel</span>
        </span>
      </div>

      {/* ── Nav links ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Dashboard menu">
        {dashboardNav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 min-h-[48px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)]",
                active
                  ? "bg-white/10 text-[var(--color-gold)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} aria-hidden="true" className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* ── Sign out ── */}
      <div className="px-3 pb-6 border-t border-white/10 pt-4">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-150 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <LogOut size={18} aria-hidden="true" className="shrink-0" />
          Sign out
        </button>
        <p className="mt-3 px-3 text-xs text-white/30">
          &copy; {new Date().getFullYear()} {siteConfig.shortName}
        </p>
      </div>
    </aside>
  );
}
