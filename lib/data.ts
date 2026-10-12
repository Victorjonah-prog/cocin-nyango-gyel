/**
 * lib/data.ts — live Supabase data helpers for public pages.
 *
 * Uses the shared anon client (publishable key, no session).
 * Only published rows are returned — no drafts leak to the public.
 */

import { supabase } from "./supabase";
import type { AnnouncementRow, EventRow, ProjectRow } from "./database.types";

// ── Announcements ─────────────────────────────────────────────────────────────

export type { AnnouncementRow };

/** Returns published announcements, newest first. */
export async function getAnnouncements(
  limit?: number
): Promise<AnnouncementRow[]> {
  let query = supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[getAnnouncements]", error.message);
    return [];
  }
  return data ?? [];
}

// ── Events ────────────────────────────────────────────────────────────────────

export type { EventRow };

export interface EventLists {
  upcoming: EventRow[];
  past: EventRow[];
}

/**
 * Returns published events split into upcoming / past.
 * Upcoming: sorted ascending. Past: most-recent first.
 * `upcomingLimit` caps the upcoming slice (e.g. 3 for the homepage).
 */
export async function getEvents(upcomingLimit?: number): Promise<EventLists> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  if (error) {
    console.error("[getEvents]", error.message);
    return { upcoming: [], past: [] };
  }

  const now = new Date();
  const rows = data ?? [];

  const upcoming = rows
    .filter((e) => new Date(e.starts_at) >= now)
    .slice(0, upcomingLimit ?? rows.length);

  const past = rows
    .filter((e) => new Date(e.starts_at) < now)
    .reverse();

  return { upcoming, past };
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type { ProjectRow };

/** Returns published projects, newest first. */
export async function getProjects(limit?: number): Promise<ProjectRow[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[getProjects]", error.message);
    return [];
  }
  return data ?? [];
}
