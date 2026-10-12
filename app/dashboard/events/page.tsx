import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { DashCard } from "@/components/dashboard/FormFields";
import EventList from "./EventList";

export const metadata: Metadata = { title: "Events — Dashboard" };

export default async function EventsIndexPage() {
  const db = createServerClient();
  const { data } = await db
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  const events = data ?? [];

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-navy)]">
            Events
          </h1>
          <p className="text-[var(--color-muted)] mt-1">
            {events.length} total
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-[var(--color-navy)] text-white font-semibold text-base min-h-[48px] hover:bg-[var(--color-navy-light)] transition-colors"
        >
          + Add Event
        </Link>
      </div>

      <DashCard>
        <EventList events={events} />
      </DashCard>
    </div>
  );
}
