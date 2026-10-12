"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-light)] " +
    "shadow-sm hover:shadow-md",
  outline:
    "border border-[var(--color-navy)] text-[var(--color-navy)] bg-transparent " +
    "hover:bg-[var(--color-navy)] hover:text-white",
  gold:
    "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-light)] " +
    "shadow-[var(--shadow-gold)] hover:shadow-lg font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm min-h-[48px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-8 py-4 text-lg min-h-[52px]",
};

/**
 * Button — primary, outline, and gold variants.
 * Pass href to render as an <a> tag.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg",
      "font-medium tracking-wide",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
