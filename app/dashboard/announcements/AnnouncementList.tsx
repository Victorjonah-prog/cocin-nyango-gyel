"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  EditButton,
  StatusBanner,
} from "@/components/dashboard/FormFields";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import type { AnnouncementRow } from "@/lib/database.types";
import { deleteAnnouncement } from "./actions";

export default function AnnouncementList({
  announcements,
}: {
  announcements: AnnouncementRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteAnnouncement(id);
      setResult(res);
      if (res.success) router.refresh();
    });
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl mb-2">📢</p>
        <p className="text-[var(--color-muted)] text-lg">
          Nothing posted yet.
        </p>
        <p className="text-[var(--color-muted)] text-sm mt-1">
          Use the button above to add the first announcement.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <StatusBanner result={result} />
      {announcements.map((ann) => (
        <div
          key={ann.id}
          className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-xl border border-gray-200 p-5"
        >
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[var(--color-navy)] truncate">
              {ann.title}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-[var(--color-muted)]">
                {ann.category}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-[var(--color-muted)]">
                {new Date(ann.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Badge + actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Badge
              label={ann.is_published ? "Published" : "Draft"}
              variant={ann.is_published ? "green" : "amber"}
            />
            <EditButton href={`/dashboard/announcements/${ann.id}/edit`} />
            <ConfirmDelete
              itemName={ann.title}
              onConfirm={() => handleDelete(ann.id)}
              disabled={pending}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
