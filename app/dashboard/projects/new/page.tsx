import type { Metadata } from "next";
import { BackLink, DashCard } from "@/components/dashboard/FormFields";
import ProjectForm from "../ProjectForm";

export const metadata: Metadata = { title: "Add Project — Dashboard" };

export default function NewProjectPage() {
  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <BackLink href="/dashboard/projects" label="Back to Projects" />
        <h1 className="text-3xl font-display font-bold text-[var(--color-navy)] mt-4">
          Add a Project
        </h1>
        <p className="text-[var(--color-muted)] mt-1">
          Fill in the details below and press "Publish project" when ready.
        </p>
      </div>
      <DashCard>
        <ProjectForm />
      </DashCard>
    </div>
  );
}
