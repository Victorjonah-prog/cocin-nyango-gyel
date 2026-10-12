import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

/**
 * HomeGivingCTA — elegant full-width giving banner.
 * TODO: Update the headline, scripture reference, and verse text below.
 */

// TODO: Replace with real scripture chosen by the pastor/leadership
const SCRIPTURE_REF = "2 Corinthians 9:7";
const SCRIPTURE_TEXT =
  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.";

// TODO: Update with real inspiring headline
const HEADLINE = "Your Generosity Changes Lives";
const SUBLINE =
  "Every gift — large or small — supports our ministry, our community projects, and the ongoing work of God in Nyango Gyel.";

export default function HomeGivingCTA() {
  return (
    <section
      className="py-24 lg:py-28 relative overflow-hidden bg-[var(--color-navy)]"
      aria-labelledby="giving-cta-heading"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgb(201_162_75_/_0.09),_transparent)] pointer-events-none"
        aria-hidden="true"
      />
      {/* Top gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />
      {/* Bottom gold hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />

      <Container narrow className="relative z-10 text-center">
        <FadeIn direction="up">
          <div className="space-y-7">

            {/* Scripture */}
            <figure className="space-y-1" aria-label="Scripture reference">
              <blockquote className="text-white/75 text-sm italic leading-relaxed max-w-xl mx-auto">
                &ldquo;{SCRIPTURE_TEXT}&rdquo;
              </blockquote>
              <figcaption className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-widest">
                — {SCRIPTURE_REF}
              </figcaption>
            </figure>

            {/* Divider */}
            <div
              className="h-px w-16 bg-[var(--color-gold)]/40 mx-auto"
              aria-hidden="true"
            />

            {/* Headline */}
            <h2
              id="giving-cta-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight"
            >
              {HEADLINE}
            </h2>

            {/* Sub-line */}
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              {SUBLINE}
            </p>

            {/* CTA */}
            <div className="pt-2">
              <Button variant="gold" size="lg" href="/give">
                Give Now
              </Button>
            </div>

          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
