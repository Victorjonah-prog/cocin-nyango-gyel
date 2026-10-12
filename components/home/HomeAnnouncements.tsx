import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getAnnouncements } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HomeAnnouncements() {
  const announcements = await getAnnouncements(3);

  return (
    <section className="py-24 lg:py-32 section-alt" aria-labelledby="announcements-heading">
      <Container>

        {/* Header row */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              id="announcements-heading"
              label="Church News"
              title="Latest Announcements"
            />
            <Link
              href="/announcements"
              className="shrink-0 inline-flex items-center gap-2 min-h-[48px] text-[var(--color-navy)] font-semibold text-sm hover:text-[var(--color-gold)] transition-colors duration-200 group"
              aria-label="See all announcements"
            >
              See All Announcements
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </FadeIn>

        {announcements.length === 0 ? (
          <FadeIn>
            <p className="text-[var(--color-muted)] text-center py-12 text-lg">
              No announcements at the moment — check back soon.
            </p>
          </FadeIn>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Latest announcements"
          >
            {announcements.map((item, i) => (
              <FadeIn key={item.id} direction="up" delay={i * 0.1}>
                <Link
                  href="/announcements"
                  className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 rounded-[var(--radius-card)]"
                  role="listitem"
                  aria-label={item.title}
                >
                  <Card hover className="h-full flex flex-col p-6 space-y-4">
                    {/* Category badge */}
                    <span className="inline-block self-start text-[var(--color-navy)] text-[11px] font-semibold uppercase tracking-[0.15em] bg-[var(--color-gold)]/15 px-2.5 py-1 rounded-full border border-[var(--color-gold)]/30">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-lg text-[var(--color-navy)] leading-snug group-hover:text-[var(--color-gold)] transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    {item.excerpt && (
                      <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">
                        {item.excerpt}
                      </p>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[var(--color-muted)]/70 text-xs pt-2 border-t border-[var(--color-border)]">
                      <Calendar size={12} aria-hidden="true" />
                      <time dateTime={item.created_at}>
                        {formatDate(item.created_at)}
                      </time>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
}
