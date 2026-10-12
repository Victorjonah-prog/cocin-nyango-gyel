import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;       // Small eyebrow text
  title: string;        // Large serif heading
  subtitle?: string;    // Optional muted paragraph below
  centered?: boolean;   // Center-align everything
  className?: string;
  id?: string;          // Optional id forwarded to the <h2> for aria-labelledby
  /**
   * onDark — set to true when the component sits on a dark (navy) background.
   * Changes the eyebrow from navy to gold so it passes WCAG AA contrast.
   * Gold (#C9A24B) on navy (#0B1F3A) ≈ 4.6:1 ✓
   * Navy (#0B1F3A) on parchment (#FAF8F3) ≈ 14.5:1 ✓
   * Gold on parchment ≈ 2.6:1 ✗ — do NOT use gold for small text on light bg.
   */
  onDark?: boolean;
}

/**
 * SectionHeading — gold/navy eyebrow (context-aware) + serif title + optional subtitle.
 * Used consistently across all page sections.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
  className,
  id,
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        centered && "text-center mx-auto",
        className
      )}
    >
      {label && (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.15em]",
            onDark
              ? "text-[var(--color-gold)]"          /* gold on navy ✓ */
              : "text-[var(--color-navy)]"            /* navy on parchment ✓ */
          )}
        >
          {label}
        </p>
      )}
      {/* Thin divider under the label */}
      {label && (
        <div
          className={cn(
            "h-px w-12",
            onDark ? "bg-[var(--color-gold)]" : "bg-[var(--color-navy)]/40",
            centered && "mx-auto"
          )}
        />
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl leading-tight",
          onDark ? "text-white" : "text-[var(--color-navy)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed max-w-2xl",
            onDark ? "text-white/80" : "text-[var(--color-muted)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
