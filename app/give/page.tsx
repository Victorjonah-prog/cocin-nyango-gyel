import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Give",
};

export default function GivePage() {
  return (
    <section className="py-20 lg:py-32">
      <Container narrow>
        <FadeIn>
          <div className="text-center space-y-6 mb-16">
            <SectionHeading
              label="Generosity"
              title="Give to COCIN Nyango Gyel"
              subtitle="Your giving supports the ministry, community projects, and the ongoing work of the church. Every contribution makes a difference."
              centered
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] border border-[var(--color-border)] p-8 md:p-12 space-y-8">
            {/* Placeholder giving options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Tithe & Offering", "Building Fund", "Mission & Outreach"].map(
                (label) => (
                  <div
                    key={label}
                    className="border-2 border-[var(--color-border)] hover:border-[var(--color-gold)] rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 group"
                  >
                    <p className="font-display text-[var(--color-navy)] font-semibold group-hover:text-[var(--color-gold)] transition-colors duration-200">
                      {label}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="divider-gold" />

            <p className="text-[var(--color-muted)] text-center text-sm leading-relaxed">
              Placeholder — payment integration (Paystack / Flutterwave) and
              bank transfer details will be added here.
            </p>

            <div className="text-center">
              <Button variant="gold" size="lg" className="min-w-48">
                Proceed to Give
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
