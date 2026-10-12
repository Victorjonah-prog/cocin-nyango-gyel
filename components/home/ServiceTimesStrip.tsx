import { Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

/**
 * ServiceTimesStrip — white card that overlaps the hero bottom edge.
 * Displays 3 service-time columns pulled from lib/site.ts.
 *
 * TODO: Add the location string to each serviceTime entry in lib/site.ts
 *       when the real venue details are confirmed.
 */

// Temporary location placeholder until lib/site.ts is extended
// TODO: move location into siteConfig.serviceTimes entries
const LOCATION_PLACEHOLDER = "Main Sanctuary, Nyango Gyel";

export default function ServiceTimesStrip() {
  return (
    // Negative top margin pulls the card up over the hero's bottom fade
    <div className="-mt-16 relative z-20 pb-4">
      <Container>
        <FadeIn direction="up" delay={0.1}>
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_0_rgb(11_31_58_/_0.13)] border border-[var(--color-border)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
              {siteConfig.serviceTimes.map((service, i) => (
                <ServiceColumn
                  key={service.label}
                  index={i}
                  label={service.label}
                  time={service.time}
                  location={LOCATION_PLACEHOLDER}
                />
              ))}
            </div>

            {/* Gold accent bar at the bottom of the card */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

function ServiceColumn({
  index,
  label,
  time,
  location,
}: {
  index: number;
  label: string;
  time: string;
  location: string;
}) {
  // Stagger each column's fade slightly
  return (
    <FadeIn direction="up" delay={0.15 + index * 0.08}>
      <div className="flex flex-col items-center text-center px-8 py-8 gap-3 group">
        {/* Gold dot index */}
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)] text-xs font-bold mb-1">
          {index + 1}
        </span>

        <h3 className="font-display text-[var(--color-navy)] text-lg font-semibold leading-tight">
          {label}
        </h3>

        <div className="flex items-center gap-1.5 text-[var(--color-navy)] font-semibold text-sm">
          <Clock size={14} strokeWidth={2} aria-hidden="true" />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--color-muted)] text-sm">
          <MapPin size={13} strokeWidth={2} aria-hidden="true" />
          {/* TODO: replace with real venue from siteConfig when available */}
          <span>{location}</span>
        </div>
      </div>
    </FadeIn>
  );
}
