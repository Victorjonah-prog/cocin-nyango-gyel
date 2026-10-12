import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import { BackLink, DashCard } from "@/components/dashboard/FormFields";
import ProjectForm from "../../ProjectForm";

export const metadata: Metadata = { title: "Edit Project — Dashboard" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = createServerClient();
  const { data } = await db
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <BackLink href="/dashboard/projects" label="Back to Projects" />
        <h1 className="text-3xl font-display font-bold text-[var(--color-navy)] mt-4">
          Edit Project
        </h1>
        <p className="text-[var(--color-muted)] mt-1">
          Make your changes below and press "Publish project" when ready.
        </p>
      </div>
      <DashCard>
        <ProjectForm initial={data} />
      </DashCard>
    </div>
  );
}
