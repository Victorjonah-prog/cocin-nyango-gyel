"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  EditButton,
  StatusBanner,
} from "@/components/dashboard/FormFields";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import type { EventRow } from "@/lib/database.types";
import { deleteEvent } from "./actions";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isUpcoming(row: EventRow) {
  return new Date(row.starts_at) >= new Date();
}

export default function EventList({ events }: { events: EventRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteEvent(id);
      setResult(res);
      if (res.success) router.refresh();
    });
  }

  const upcoming = events.filter(isUpcoming);
  const past = events.filter((e) => !isUpcoming(e));
  const shown = tab === "upcoming" ? upcoming : past;

  return (
    <div className="flex flex-col gap-4">
      <StatusBanner result={result} />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-2">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              "px-5 py-3 text-base font-semibold capitalize rounded-t-lg transition-colors min-h-[48px]",
              tab === t
                ? "bg-[var(--color-navy)] text-white"
                : "text-[var(--color-navy)] hover:bg-gray-100",
            ].join(" ")}
          >
            {t === "upcoming" ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl mb-2">📅</p>
          <p className="text-[var(--color-muted)] text-lg">
            No {tab} events.
          </p>
        </div>
      ) : (
        shown.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--color-navy)] truncate">
                {ev.title}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-[var(--color-muted)]">
                  {ev.category}
                </span>
                {ev.location && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-[var(--color-muted)] truncate max-w-[180px]">
                      {ev.location}
                    </span>
                  </>
                )}
                <span className="text-gray-300">·</span>
                <span className="text-xs text-[var(--color-muted)]">
                  {formatDateTime(ev.starts_at)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Badge
                label={ev.published ? "Published" : "Draft"}
                variant={ev.published ? "green" : "amber"}
              />
              <EditButton href={`/dashboard/events/${ev.id}/edit`} />
              <ConfirmDelete
                itemName={ev.title}
                onConfirm={() => handleDelete(ev.id)}
                disabled={pending}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
