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
import { EVENT_CATEGORIES } from "@/lib/schemas";
import type { EventRow } from "@/lib/database.types";
import { saveEvent } from "./actions";

interface Props {
  initial?: EventRow;
}

/** Convert a DB ISO string to a local datetime-local input value (YYYY-MM-DDTHH:mm). */
function toDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  // Slice to "YYYY-MM-DDTHH:mm" (drop seconds & timezone for the input)
  return iso.slice(0, 16);
}

export default function EventForm({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState<(typeof EVENT_CATEGORIES)[number]>(
    (initial?.category as (typeof EVENT_CATEGORIES)[number]) ?? "Service"
  );
  const [location, setLocation] = useState(initial?.location ?? "");
  const [startsAt, setStartsAt] = useState(toDatetimeLocal(initial?.starts_at));
  const [endsAt, setEndsAt] = useState(toDatetimeLocal(initial?.ends_at));
  const [imageUrl, setImageUrl] = useState<string | null>(
    initial?.image_url ?? null
  );
  const [published, setPublished] = useState(initial?.is_published ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Please enter a title.";
    if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    if (!startsAt) e.starts_at = "Please enter a start date and time.";
    if (endsAt && startsAt && new Date(endsAt) <= new Date(startsAt)) {
      e.ends_at = "End time must be after the start time.";
    }
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
      const res = await saveEvent(initial?.id ?? null, {
        title,
        description,
        category,
        location,
        starts_at: startsAt,
        ends_at: endsAt,
        image_url: imageUrl,
        is_published: published,
      });
      setResult(res);
      if (res.success) {
        setTimeout(() => router.push("/dashboard/events"), 1200);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <StatusBanner result={result} />

      <Field label="Event Title" htmlFor="ev-title" required error={errors.title}>
        <Input
          id="ev-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Easter Sunday Service"
          disabled={pending}
          required
        />
      </Field>

      <Field
        label="Category"
        htmlFor="ev-category"
        required
        hint="Choose the type of event."
      >
        <Select
          id="ev-category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof EVENT_CATEGORIES)[number])
          }
          disabled={pending}
        >
          {EVENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Description"
        htmlFor="ev-description"
        hint="Tell people what this event is about."
      >
        <Textarea
          id="ev-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the event…"
          rows={4}
          disabled={pending}
        />
      </Field>

      <Field
        label="Location"
        htmlFor="ev-location"
        hint="Where will this event take place?"
      >
        <Input
          id="ev-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. COCIN Nyango Gyel Church Hall"
          disabled={pending}
        />
      </Field>

      <Field
        label="Start date and time"
        htmlFor="ev-starts"
        required
        error={errors.starts_at}
      >
        <Input
          id="ev-starts"
          type="datetime-local"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
          disabled={pending}
          required
        />
      </Field>

      <Field
        label="End time (optional)"
        htmlFor="ev-ends"
        hint="Leave blank if you don't know the end time."
        error={errors.ends_at}
      >
        <Input
          id="ev-ends"
          type="datetime-local"
          value={endsAt}
          onChange={(e) => setEndsAt(e.target.value)}
          disabled={pending}
        />
      </Field>

      <Field
        label="Image (optional)"
        htmlFor="image-upload-input"
        hint="Add a photo for this event."
      >
        <ImageUploader value={imageUrl} onChange={setImageUrl} />
      </Field>

      <Field label="Publish?" htmlFor="ev-published">
        <PublishedToggle checked={published} onChange={setPublished} />
      </Field>

      <div className="flex flex-wrap gap-4 pt-2">
        <DashButton type="submit" disabled={pending}>
          {pending ? "Saving…" : published ? "Publish event" : "Save as draft"}
        </DashButton>
        <BackLink href="/dashboard/events" label="Cancel" />
      </div>
    </form>
  );
}
