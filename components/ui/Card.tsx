import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // lift-on-hover effect
  as?: React.ElementType;
}

/**
 * Card — rounded-lg, subtle shadow, parchment background.
 * Optional hover lift for interactive cards.
 */
export default function Card({
  children,
  className,
  hover = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)]",
        "border border-[var(--color-border)]",
        "overflow-hidden",
        hover &&
          "transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}
