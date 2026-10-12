import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import { getAnnouncements } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Announcements",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label="Church News"
            title="Announcements"
            subtitle="Stay up to date with the latest news and notices from COCIN Nyango Gyel."
            className="max-w-3xl mb-16"
          />
        </FadeIn>

        {announcements.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-5xl mb-4" aria-hidden="true">📢</p>
              <p className="text-[var(--color-navy)] text-xl font-semibold mb-2">
                Nothing posted yet
              </p>
              <p className="text-[var(--color-muted)]">
                Check back soon for the latest church news and notices.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.07} direction="up">
                <Card hover className="h-full flex flex-col p-6 space-y-4">
                  {/* Category badge */}
                  <span className="inline-block self-start text-[var(--color-navy)] text-[11px] font-semibold uppercase tracking-[0.15em] bg-[var(--color-gold)]/15 px-2.5 py-1 rounded-full border border-[var(--color-gold)]/30">
                    {item.category}
                  </span>

                  {/* Title */}
                  <h2 className="font-display text-lg text-[var(--color-navy)] leading-snug">
                    {item.title}
                  </h2>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">
                      {item.excerpt}
                    </p>
                  )}

                  {/* Body preview (if no excerpt) */}
                  {!item.excerpt && item.body && (
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1 line-clamp-3">
                      {item.body}
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
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
