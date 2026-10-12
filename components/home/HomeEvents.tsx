import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { getEvents } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import type { EventRow } from "@/lib/database.types";

function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default async function HomeEvents() {
  const { upcoming } = await getEvents(3);

  return (
    <section
      className="py-24 lg:py-32 bg-[var(--color-navy)] relative overflow-hidden"
      aria-labelledby="events-heading"
    >
      {/* Decorative gold radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,_rgb(201_162_75_/_0.07),_transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">

        {/* Header row */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              id="events-heading"
              label="Calendar"
              title="Upcoming Events"
              subtitle="Join us for worship, fellowship, and community."
              className="[&_h2]:text-white [&_p:last-child]:text-white/80"
              onDark
            />
            <Link
              href="/events"
              className="shrink-0 inline-flex items-center gap-2 min-h-[48px] text-[var(--color-gold)] font-semibold text-sm hover:text-[var(--color-gold-light)] transition-colors duration-200 group"
              aria-label="See all events"
            >
              See All Events
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </FadeIn>

        {upcoming.length === 0 ? (
          <FadeIn>
            <p className="text-white/60 text-center py-12 text-lg">
              No upcoming events right now — check back soon.
            </p>
          </FadeIn>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            role="list"
            aria-label="Upcoming events"
          >
            {upcoming.map((event, i) => (
              <FadeIn key={event.id} direction="up" delay={i * 0.1}>
                <EventCard event={event} />
              </FadeIn>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
}

function EventCard({ event }: { event: EventRow }) {
  const { day, month, time } = dateParts(event.starts_at);

  return (
    <Link
      href="/events"
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] rounded-xl"
      role="listitem"
      aria-label={event.title}
    >
      <article className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-5 hover:bg-white/10 hover:border-[var(--color-gold)]/30 transition-all duration-300">

        {/* Date badge */}
        <div
          className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-gold)] text-[var(--color-navy)]"
          aria-hidden="true"
        >
          <span className="text-[10px] font-bold uppercase leading-none tracking-wide">
            {month}
          </span>
          <span className="font-display text-2xl font-bold leading-tight">
            {day}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="font-display text-white text-base font-semibold leading-snug group-hover:text-[var(--color-gold)] transition-colors duration-200">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-white/75 text-xs">
            <Clock size={11} aria-hidden="true" />
            <span>{time}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 text-white/75 text-xs">
              <MapPin size={11} aria-hidden="true" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

      </article>
    </Link>
  );
}
