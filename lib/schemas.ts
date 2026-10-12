import { z } from "zod";

// ── Announcements ─────────────────────────────────────────────────────────────

export const ANNOUNCEMENT_CATEGORIES = [
  "General",
  "Service",
  "Youth",
  "Women",
  "Men",
  "Urgent",
] as const;

export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  excerpt: z.string().max(400).optional().or(z.literal("")),
  body: z.string().max(10000).optional().or(z.literal("")),
  category: z.enum(ANNOUNCEMENT_CATEGORIES),
  image_url: z.string().url().optional().or(z.literal("")).or(z.null()),
  published: z.boolean().default(false),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;

// ── Events ────────────────────────────────────────────────────────────────────

export const EVENT_CATEGORIES = [
  "Service",
  "Outreach",
  "Youth",
  "Women",
  "Men",
] as const;

export const eventSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    description: z.string().max(2000).optional().or(z.literal("")),
    category: z.enum(EVENT_CATEGORIES),
    location: z.string().max(300).optional().or(z.literal("")),
    starts_at: z.string().min(1, "Start date and time is required"),
    ends_at: z.string().optional().or(z.literal("")),
    image_url: z.string().url().optional().or(z.literal("")).or(z.null()),
    published: z.boolean().default(false),
  })
  .refine(
    (data) =>
      !data.ends_at ||
      data.ends_at === "" ||
      new Date(data.ends_at) > new Date(data.starts_at),
    { message: "End time must be after start time", path: ["ends_at"] }
  );

export type EventFormData = z.infer<typeof eventSchema>;

// ── Projects ──────────────────────────────────────────────────────────────────

export const PROJECT_STATUSES = [
  "Planning",
  "In Progress",
  "Completed",
] as const;

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().max(2000).optional().or(z.literal("")),
  status: z.enum(PROJECT_STATUSES),
  target_amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .nonnegative("Amount cannot be negative")
    .max(1_000_000_000, "Amount seems too large"),
  amount_raised: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .nonnegative("Amount cannot be negative")
    .max(1_000_000_000, "Amount seems too large")
    .default(0),
  image_url: z.string().url().optional().or(z.literal("")).or(z.null()),
  published: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ── Image upload ──────────────────────────────────────────────────────────────

export const IMAGE_MAX_BYTES = 3 * 1024 * 1024; // 3 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
