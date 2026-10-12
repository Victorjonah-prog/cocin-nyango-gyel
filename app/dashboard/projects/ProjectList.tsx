"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  EditButton,
  StatusBanner,
} from "@/components/dashboard/FormFields";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import type { ProjectRow } from "@/lib/database.types";
import { deleteProject } from "./actions";

function statusVariant(
  status: string
): "blue" | "amber" | "green" | "gray" {
  if (status === "Completed") return "green";
  if (status === "In Progress") return "blue";
  if (status === "Planning") return "amber";
  return "gray";
}

function progressPct(target: number, raised: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((raised / target) * 100));
}

function formatNaira(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function ProjectList({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteProject(id);
      setResult(res);
      if (res.success) router.refresh();
    });
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl mb-2">🏗️</p>
        <p className="text-[var(--color-muted)] text-lg">No projects yet.</p>
        <p className="text-[var(--color-muted)] text-sm mt-1">
          Use the button above to add the first project.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <StatusBanner result={result} />
      {projects.map((proj) => {
        const pct = progressPct(proj.target_amount, proj.raised_amount);
        return (
          <div
            key={proj.id}
            className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 p-5"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-navy)] truncate">
                  {proj.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge
                    label={proj.status}
                    variant={statusVariant(proj.status)}
                  />
                  <Badge
                    label={proj.is_published ? "Published" : "Draft"}
                    variant={proj.is_published ? "green" : "amber"}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <EditButton href={`/dashboard/projects/${proj.id}/edit`} />
                <ConfirmDelete
                  itemName={proj.title}
                  onConfirm={() => handleDelete(proj.id)}
                  disabled={pending}
                />
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-sm text-[var(--color-muted)] mb-1">
                <span>
                  {formatNaira(proj.raised_amount)} raised of{" "}
                  {formatNaira(proj.target_amount)}
                </span>
                <span className="font-semibold text-[var(--color-navy)]">
                  {pct}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${pct}% funded`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
