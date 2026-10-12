"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  Input,
  Select,
  Textarea,
  PublishedToggle,
  StatusBanner,
  DashButton,
  BackLink,
  DashCard,
} from "@/components/dashboard/FormFields";
import ImageUploader from "@/components/dashboard/ImageUploader";
import { ANNOUNCEMENT_CATEGORIES } from "@/lib/schemas";
import type { AnnouncementRow } from "@/lib/database.types";
import { saveAnnouncement } from "./actions";

interface Props {
  /** Pass an existing row to edit; omit for new. */
  initial?: AnnouncementRow;
}

export default function AnnouncementForm({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // ── Field state ──────────────────────────────────────────────────────────
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [category, setCategory] = useState<(typeof ANNOUNCEMENT_CATEGORIES)[number]>(
    (initial?.category as (typeof ANNOUNCEMENT_CATEGORIES)[number]) ?? "General"
  );
  const [imageUrl, setImageUrl] = useState<string | null>(initial?.image_url ?? null);
  const [published, setPublished] = useState(initial?.is_published ?? false);

  // ── Validation errors ────────────────────────────────────────────────────
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Please enter a title.";
    if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setResult(null);

    startTransition(async () => {
      const res = await saveAnnouncement(initial?.id ?? null, {
        title,
        excerpt,
        body,
        category,
        image_url: imageUrl,
        is_published: published,
      });
      setResult(res);
      if (res.success) {
        // Brief pause so the secretary can read the success message
        setTimeout(() => router.push("/dashboard/announcements"), 1200);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <StatusBanner result={result} />

      <Field label="Title" htmlFor="ann-title" required error={errors.title}>
        <Input
          id="ann-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Youth Camp Registration Now Open"
          disabled={pending}
          required
        />
      </Field>

      <Field
        label="Category"
        htmlFor="ann-category"
        required
        hint="Choose the type of announcement."
      >
        <Select
          id="ann-category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof ANNOUNCEMENT_CATEGORIES)[number])
          }
          disabled={pending}
        >
          {ANNOUNCEMENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Short summary"
        htmlFor="ann-excerpt"
        hint="One or two sentences — shown on the homepage and announcement list."
      >
        <Textarea
          id="ann-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the announcement…"
          rows={3}
          disabled={pending}
        />
      </Field>

      <Field
        label="Full announcement"
        htmlFor="ann-body"
        hint="Write the full text here. Leave blank if the summary is enough."
      >
        <Textarea
          id="ann-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Full announcement text…"
          rows={8}
          disabled={pending}
        />
      </Field>

      <Field
        label="Image (optional)"
        htmlFor="image-upload-input"
        hint="Add a photo to go with this announcement."
      >
        <ImageUploader value={imageUrl} onChange={setImageUrl} />
      </Field>

      <Field label="Publish?" htmlFor="ann-published">
        <PublishedToggle checked={published} onChange={setPublished} />
      </Field>

      <div className="flex flex-wrap gap-4 pt-2">
        <DashButton type="submit" disabled={pending}>
          {pending
            ? "Saving…"
            : published
            ? "Publish announcement"
            : "Save as draft"}        </DashButton>
        <BackLink href="/dashboard/announcements" label="Cancel" />
      </div>
    </form>
  );
}
