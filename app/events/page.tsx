import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { getEvents } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import type { EventRow } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Events",
};

function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    full: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function EventCard({ event }: { event: EventRow }) {
  const { day, month, time, full } = dateParts(event.starts_at);

  return (
    <Card hover className="flex gap-5 p-6">
      {/* Date block */}
      <div
        className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-navy)] text-white"
        aria-hidden="true"
      >
        <span className="text-[var(--color-gold)] text-[10px] font-bold uppercase leading-none tracking-wide">
          {month}
        </span>
        <span className="font-display text-2xl font-bold leading-tight">
          {day}
        </span>
      </div>

      <div className="space-y-1.5 min-w-0">
        <h2 className="font-display text-lg text-[var(--color-navy)] leading-snug">
          {event.title}
        </h2>
        {event.description && (
          <p className="text-[var(--color-muted)] text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--color-muted)] text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Clock size={11} aria-hidden="true" />
            <time dateTime={event.starts_at}>{full} · {time}</time>
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={11} aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>
        {/* Category badge */}
        <span className="inline-block text-[var(--color-navy)] text-[10px] font-semibold uppercase tracking-[0.12em] bg-[var(--color-gold)]/15 px-2 py-0.5 rounded-full border border-[var(--color-gold)]/30">
          {event.category}
        </span>
      </div>
    </Card>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-4xl mb-3" aria-hidden="true">📅</p>
      <p className="text-[var(--color-navy)] text-lg font-semibold mb-1">
        Nothing here yet
      </p>
      <p className="text-[var(--color-muted)] text-sm">{label}</p>
    </div>
  );
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label="Calendar"
            title="Events"
            subtitle="Join us for worship services, community programs, and special occasions."
            className="max-w-3xl mb-16"
          />
        </FadeIn>

        {/* Upcoming */}
        <FadeIn>
          <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6 mt-2">
            Upcoming Events
          </h2>
        </FadeIn>

        {upcoming.length === 0 ? (
          <FadeIn>
            <EmptyState label="No upcoming events scheduled right now. Check back soon." />
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {upcoming.map((event, i) => (
              <FadeIn key={event.id} delay={i * 0.07} direction="up">
                <EventCard event={event} />
              </FadeIn>
            ))}
          </div>
        )}

        {/* Past — only shown if there are any */}
        {past.length > 0 && (
          <>
            <div className="divider-gold my-12" aria-hidden="true" />
            <FadeIn>
              <h2 className="text-xl font-bold text-[var(--color-navy)] mb-6">
                Past Events
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70">
              {past.map((event, i) => (
                <FadeIn key={event.id} delay={i * 0.06} direction="up">
                  <EventCard event={event} />
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
