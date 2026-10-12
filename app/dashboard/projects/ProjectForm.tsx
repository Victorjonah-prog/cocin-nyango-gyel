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
import { PROJECT_STATUSES } from "@/lib/schemas";
import type { ProjectRow } from "@/lib/database.types";
import { saveProject } from "./actions";

interface Props {
  initial?: ProjectRow;
}

export default function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<(typeof PROJECT_STATUSES)[number]>(
    (initial?.status as (typeof PROJECT_STATUSES)[number]) ?? "Planning"
  );
  const [targetAmount, setTargetAmount] = useState(
    initial?.target_amount != null ? String(initial.target_amount) : ""
  );
  const [amountRaised, setAmountRaised] = useState(
    initial?.amount_raised != null ? String(initial.amount_raised) : "0"
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    initial?.image_url ?? null
  );
  const [published, setPublished] = useState(initial?.published ?? false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Please enter a title.";
    if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";

    const target = Number(targetAmount);
    if (targetAmount === "" || isNaN(target)) {
      e.target_amount = "Please enter a valid amount.";
    } else if (target < 0) {
      e.target_amount = "Amount cannot be negative.";
    }

    const raised = Number(amountRaised);
    if (amountRaised === "" || isNaN(raised)) {
      e.amount_raised = "Please enter a valid amount.";
    } else if (raised < 0) {
      e.amount_raised = "Amount cannot be negative.";
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
      const res = await saveProject(initial?.id ?? null, {
        title,
        description,
        status,
        target_amount: Number(targetAmount),
        amount_raised: Number(amountRaised),
        image_url: imageUrl,
        published,
      });
      setResult(res);
      if (res.success) {
        setTimeout(() => router.push("/dashboard/projects"), 1200);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <StatusBanner result={result} />

      <Field label="Project Title" htmlFor="proj-title" required error={errors.title}>
        <Input
          id="proj-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Church Roof Renovation"
          disabled={pending}
          required
        />
      </Field>

      <Field
        label="Status"
        htmlFor="proj-status"
        required
        hint="What stage is this project at?"
      >
        <Select
          id="proj-status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as (typeof PROJECT_STATUSES)[number])
          }
          disabled={pending}
        >
          {PROJECT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Description"
        htmlFor="proj-description"
        hint="Tell the congregation about this project."
      >
        <Textarea
          id="proj-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this project about and why does it matter?…"
          rows={4}
          disabled={pending}
        />
      </Field>

      <Field
        label="Target amount (₦)"
        htmlFor="proj-target"
        required
        hint="How much money is needed? Numbers only."
        error={errors.target_amount}
      >
        <Input
          id="proj-target"
          type="number"
          min="0"
          step="1"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="e.g. 5000000"
          disabled={pending}
          required
        />
      </Field>

      <Field
        label="Amount raised so far (₦)"
        htmlFor="proj-raised"
        hint="How much has been raised already? Numbers only."
        error={errors.amount_raised}
      >
        <Input
          id="proj-raised"
          type="number"
          min="0"
          step="1"
          value={amountRaised}
          onChange={(e) => setAmountRaised(e.target.value)}
          placeholder="e.g. 1500000"
          disabled={pending}
        />
      </Field>

      <Field
        label="Image (optional)"
        htmlFor="image-upload-input"
        hint="Add a photo for this project."
      >
        <ImageUploader value={imageUrl} onChange={setImageUrl} />
      </Field>

      <Field label="Publish?" htmlFor="proj-published">
        <PublishedToggle checked={published} onChange={setPublished} />
      </Field>

      <div className="flex flex-wrap gap-4 pt-2">
        <DashButton type="submit" disabled={pending}>
          {pending ? "Saving…" : published ? "Publish project" : "Save as draft"}
        </DashButton>
        <BackLink href="/dashboard/projects" label="Cancel" />
      </div>
    </form>
  );
}
