import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { DashCard } from "@/components/dashboard/FormFields";
import ProjectList from "./ProjectList";

export const metadata: Metadata = { title: "Projects — Dashboard" };

export default async function ProjectsIndexPage() {
  const db = createServerClient();
  const { data } = await db
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const projects = data ?? [];

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-navy)]">
            Projects
          </h1>
          <p className="text-[var(--color-muted)] mt-1">
            {projects.length} total
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-[var(--color-navy)] text-white font-semibold text-base min-h-[48px] hover:bg-[var(--color-navy-light)] transition-colors"
        >
          + Add Project
        </Link>
      </div>

      <DashCard>
        <ProjectList projects={projects} />
      </DashCard>
    </div>
  );
}
