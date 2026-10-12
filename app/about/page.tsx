import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label="Our History"
            title="About COCIN Nyango Gyel"
            subtitle="Placeholder — the church's history, vision, mission statement, and leadership introduction will be written here."
            className="max-w-3xl mb-16"
          />
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="divider-gold w-24 mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {["Our History", "Our Vision"].map((title) => (
              <div key={title} className="space-y-4">
                <h3 className="font-display text-2xl text-[var(--color-navy)]">{title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Placeholder content for the &ldquo;{title}&rdquo; section. This will be replaced with
                  rich, well-written content about the church.
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
