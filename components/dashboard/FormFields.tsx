import { cn } from "@/lib/utils";

/** Large, clearly-labelled field wrapper for secretary forms. */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-base font-semibold text-[var(--color-navy)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && <p className="text-sm text-[var(--color-muted)]">{hint}</p>}
      {children}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Standard text / email / date input. */
export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-300 px-4 text-base text-[var(--color-navy)]",
        "placeholder:text-gray-400 bg-white",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[48px]",
        className
      )}
      {...props}
    />
  );
}

/** Standard select. */
export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-gray-300 px-4 text-base text-[var(--color-navy)]",
        "bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[48px]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/** Multi-line textarea. */
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-[var(--color-navy)]",
        "placeholder:text-gray-400 bg-white resize-y",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[120px]",
        className
      )}
      {...props}
    />
  );
}

/** Toggle row for Published / Draft. */
export function PublishedToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none min-h-[48px]">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={cn(
            "w-12 h-6 rounded-full transition-colors duration-200",
            checked ? "bg-[var(--color-navy)]" : "bg-gray-300"
          )}
        />
        <div
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
            checked && "translate-x-6"
          )}
        />
      </div>
      <span className="text-base font-semibold text-[var(--color-navy)]">
        {checked ? "Published" : "Save as draft"}
      </span>
    </label>
  );
}

/** Success / error toast banner shown after a save. */
export function StatusBanner({
  result,
}: {
  result: { success: boolean; message: string } | null;
}) {
  if (!result) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 rounded-xl px-5 py-4 text-base font-medium",
        result.success
          ? "bg-green-50 border border-green-300 text-green-800"
          : "bg-red-50 border border-red-300 text-red-800"
      )}
    >
      <span className="text-xl" aria-hidden="true">
        {result.success ? "✅" : "⚠️"}
      </span>
      {result.message}
    </div>
  );
}

/** Pill badge for Published / Draft / status values. */
export function Badge({
  label,
  variant,
}: {
  label: string;
  variant: "green" | "amber" | "blue" | "gray";
}) {
  const cls = {
    green: "bg-green-100 text-green-800 border-green-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  }[variant];
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        cls
      )}
    >
      {label}
    </span>
  );
}

/** Page-level back link. */
export function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 text-[var(--color-navy)] font-medium text-sm hover:text-[var(--color-gold)] transition-colors"
    >
      ← {label}
    </a>
  );
}

/** Section card wrapper used inside dashboard pages. */
export function DashCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Large primary action button (navy). */
export function DashButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
        "bg-[var(--color-navy)] text-white font-semibold text-base min-h-[48px]",
        "hover:bg-[var(--color-navy-light)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Danger/delete button (red outline). */
export function DeleteButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2",
        "border border-red-300 text-red-700 font-medium text-sm min-h-[40px]",
        "hover:bg-red-50 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Ghost edit button (navy outline). */
export function EditButton({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2",
        "border border-[var(--color-navy)] text-[var(--color-navy)] font-medium text-sm min-h-[40px]",
        "hover:bg-[var(--color-navy)] hover:text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1"
      )}
    >
      {children ?? "Edit"}
    </a>
  );
}
