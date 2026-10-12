import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Elders & Leadership",
};

export default function EldersPage() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label="Leadership"
            title="Our Elders &amp; Council"
            subtitle="Meet the men and women who serve the congregation of COCIN Nyango Gyel with wisdom and dedication."
            centered
            className="mb-16"
          />
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <FadeIn key={i} delay={(i % 4) * 0.08} direction="up">
              <Card hover className="text-center p-6 space-y-4">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-[var(--color-grey)] mx-auto flex items-center justify-center border-2 border-[var(--color-gold)]/30">
                  <span className="text-[var(--color-navy)]/30 font-display text-2xl font-bold">
                    {i}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base text-[var(--color-navy)] font-semibold">
                    Elder Placeholder {i}
                  </h3>
                  <p className="text-[var(--color-muted)] text-xs font-medium mt-1">
                    Role / Title Placeholder
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
