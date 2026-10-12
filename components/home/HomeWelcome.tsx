import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Heart, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

/**
 * HomeWelcome — two-column section: framed image left, copy right.
 * Highlight points use icons for visual variety.
 */

// TODO: Replace all placeholder strings with real church copy
const WELCOME_PARAGRAPH =
  "COCIN LCC Nyango Gyel is a vibrant, Christ-centred congregation located in the heart of Nyango Gyel, Jos South. We are a community of believers committed to worshipping God in spirit and in truth, growing together in faith, and serving our neighbours with love. Whatever your background, you are welcome here.";

const highlights = [
  {
    icon: BookOpen,
    title: "Rooted in Scripture",
    body: "Every message, every programme, and every decision is anchored in God's Word.", // TODO: refine with real copy
  },
  {
    icon: Users,
    title: "A Welcoming Community",
    body: "From families to young professionals — there is a place for everyone at COCIN Nyango Gyel.", // TODO: refine with real copy
  },
  {
    icon: Heart,
    title: "Serving Our Neighbours",
    body: "Through outreach, development projects, and compassionate care, we extend the love of Christ.", // TODO: refine with real copy
  },
];

export default function HomeWelcome() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="welcome-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image column ── */}
          <FadeIn direction="left" delay={0.05}>
            {/* Offset gold border frame */}
            <div className="relative">
              {/* Gold accent rectangle, offset behind the image */}
              <div
                className="absolute -bottom-5 -right-5 w-full h-full rounded-2xl border-2 border-[var(--color-gold)]/40 z-0"
                aria-hidden="true"
              />
              {/* Image container */}
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)]">
                <Image
                  src={images.welcomePhoto.src}
                  alt={images.welcomePhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-center"
                />
                {/* Gradient overlay so image blends with the gold frame on dark bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/20 to-transparent" />
              </div>
              {/* Small gold stat badge */}
              <div className="absolute -left-6 top-10 z-20 bg-white rounded-xl shadow-[var(--shadow-card)] border border-[var(--color-border)] px-5 py-4 text-center hidden sm:block">
                <p className="font-display text-3xl font-bold text-[var(--color-navy)]">
                  {/* TODO: update with real founding year */}
                  Est.
                </p>
                <p className="text-[var(--color-navy)] text-sm font-semibold tracking-wide">
                  {/* TODO: update with real founding year */}
                  Since 19XX
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Copy column ── */}
          <FadeIn direction="right" delay={0.15}>
            <div className="space-y-8">
              <SectionHeading
                id="welcome-heading"
                label="Our Story"
                title="A Church Built on Faith"
                subtitle={WELCOME_PARAGRAPH}
              />

              {/* Highlight points */}
              <ul className="space-y-5" aria-label="Church highlights">
                {highlights.map(({ icon: Icon, title, body }, i) => (
                  <FadeIn key={title} direction="up" delay={0.22 + i * 0.08}>
                    <li className="flex items-start gap-4">
                      <span
                        className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 text-[var(--color-gold)] mt-0.5"
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="font-display font-semibold text-[var(--color-navy)] text-base leading-snug mb-1">
                          {title}
                        </p>
                        <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ul>

              {/* Learn more link */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 min-h-[48px] text-[var(--color-navy)] font-semibold text-sm hover:text-[var(--color-gold)] transition-colors duration-200 group"
              >
                Learn More About Us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}
