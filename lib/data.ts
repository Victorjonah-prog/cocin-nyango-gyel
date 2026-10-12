/**
 * lib/data.ts — live Supabase data helpers for public pages.
 *
 * All functions use the shared browser/server client (publishable key).
 * They return only published rows, so no sensitive drafts leak.
 *
 * Return shapes mirror the old mock-data interfaces closely so the
 * calling components need minimal edits.
 */

import { supabase } from "./supabase";
import type { AnnouncementRow, EventRow, ProjectRow } from "./database.types";

// ── Announcements ─────────────────────────────────────────────────────────────

export type { AnnouncementRow };

/**
 * Returns all published announcements, newest first.
 * At most `limit` rows (default: all).
 */
export async function getAnnouncements(
  limit?: number
): Promise<AnnouncementRow[]> {
  let query = supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
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
 * Returns all published events split into upcoming and past,
 * each sorted by starts_at ascending (upcoming) / descending (past).
 * Pass `upcomingLimit` to cap the upcoming list (e.g. homepage needs 3).
 */
export async function getEvents(upcomingLimit?: number): Promise<EventLists> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
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

  // Past events most-recent first
  const past = rows
    .filter((e) => new Date(e.starts_at) < now)
    .reverse();

  return { upcoming, past };
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type { ProjectRow };

/**
 * Returns all published projects, newest first.
 * At most `limit` rows (default: all).
 */
export async function getProjects(limit?: number): Promise<ProjectRow[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[getProjects]", error.message);
    return [];
  }
  return data ?? [];
}
