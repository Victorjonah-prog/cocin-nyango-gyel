import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Megaphone, CalendarDays, FolderKanban } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard — COCIN Nyango Gyel" };

async function getCounts() {
  const db = await createClient();

  const [annRes, evRes, projRes] = await Promise.all([
    db.from("announcements").select("id", { count: "exact", head: true }),
    db
      .from("events")
      .select("id", { count: "exact", head: true })
      .gte("starts_at", new Date().toISOString()),
    db.from("projects").select("id", { count: "exact", head: true }),
  ]);

  return {
    announcements: annRes.count ?? 0,
    upcomingEvents: evRes.count ?? 0,
    projects: projRes.count ?? 0,
  };
}

export default async function DashboardPage() {
  const counts = await getCounts();

  const stats = [
    {
      label: "Announcements",
      value: counts.announcements,
      icon: Megaphone,
      href: "/dashboard/announcements",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      label: "Upcoming Events",
      value: counts.upcomingEvents,
      icon: CalendarDays,
      href: "/dashboard/events",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      label: "Projects",
      value: counts.projects,
      icon: FolderKanban,
      href: "/dashboard/projects",
      color: "bg-green-50 text-green-700 border-green-200",
    },
  ];

  const actions = [
    {
      label: "Post Announcement",
      href: "/dashboard/announcements/new",
      icon: Megaphone,
      description: "Share news with the congregation",
    },
    {
      label: "Add Event",
      href: "/dashboard/events/new",
      icon: CalendarDays,
      description: "Create a service, outreach or meeting",
    },
    {
      label: "Add Project",
      href: "/dashboard/projects/new",
      icon: FolderKanban,
      description: "Add a fundraising or building project",
    },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Page title */}
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-[var(--color-navy)]">
          Good day, Secretary 👋
        </h1>
        <p className="text-[var(--color-muted)] mt-2 text-lg">
          What would you like to do today?
        </p>
      </div>

      {/* Counts */}
      <section aria-label="Summary counts" className="mb-10">
        <h2 className="text-base font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-4">
          At a glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, href, color }) => (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-4 rounded-2xl border p-6 transition-shadow hover:shadow-md",
                color,
              ].join(" ")}
            >
              <Icon size={32} aria-hidden="true" className="shrink-0" />
              <div>
                <p className="text-4xl font-bold leading-none">{value}</p>
                <p className="text-sm font-medium mt-1">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section aria-label="Quick actions">
        <h2 className="text-base font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-4">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map(({ label, href, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--color-navy)]/20 bg-white p-6 min-h-[120px] hover:border-[var(--color-navy)] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-navy)] text-white group-hover:bg-[var(--color-gold)] transition-colors">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="font-bold text-[var(--color-navy)] text-lg leading-tight">
                  {label}
                </span>
              </div>
              <p className="text-sm text-[var(--color-muted)]">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
