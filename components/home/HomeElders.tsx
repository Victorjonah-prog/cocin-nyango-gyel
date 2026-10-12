import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockElders } from "@/lib/mock-data";
import { images } from "@/lib/images";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

/**
 * HomeElders — row of 4 elder cards with photo slot, name, and title.
 * TODO: Replace mockElders with a Supabase query when DB is ready.
 */
export default function HomeElders() {
  // TODO: swap for Supabase query
  const elders = mockElders.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 section-alt" aria-labelledby="elders-heading">
      <Container>

        {/* Header row */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              id="elders-heading"
              label="Leadership"
              title="Our Elders & Council"
              subtitle="Serving the congregation with wisdom and dedication."
              className="max-w-lg"
            />
            <Link
              href="/elders"
              className="shrink-0 inline-flex items-center gap-2 min-h-[48px] text-[var(--color-navy)] font-semibold text-sm hover:text-[var(--color-gold)] transition-colors duration-200 group"
              aria-label="Meet all our elders and council"
            >
              Meet Our Elders &amp; Council
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </FadeIn>

        {/* Elder cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 lg:gap-6"
          role="list"
          aria-label="Church elders preview"
        >
          {elders.map((elder, i) => {
            const imgSlot = images.elders[elder.imageIndex];
            return (
              <FadeIn key={elder.id} direction="up" delay={i * 0.08}>
                <article
                  className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-6 flex flex-col items-center text-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  role="listitem"
                >
                  {/* Photo slot */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-gold)]/30 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] shrink-0">
                    <Image
                      src={imgSlot.src}
                      alt={imgSlot.alt}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Name & title */}
                  <div className="space-y-1">
                    {/* TODO: replace with real elder names from mockElders / Supabase */}
                    <h3 className="font-display text-sm text-[var(--color-navy)] font-semibold leading-snug">
                      {elder.name}
                    </h3>
                    <p className="text-[var(--color-muted)] text-xs font-semibold">
                      {elder.title}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
