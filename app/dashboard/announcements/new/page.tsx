import type { Metadata } from "next";
import { BackLink, DashCard } from "@/components/dashboard/FormFields";
import AnnouncementForm from "../AnnouncementForm";

export const metadata: Metadata = { title: "New Announcement — Dashboard" };

export default function NewAnnouncementPage() {
  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <BackLink href="/dashboard/announcements" label="Back to Announcements" />
        <h1 className="text-3xl font-display font-bold text-[var(--color-navy)] mt-4">
          Post an Announcement
        </h1>
        <p className="text-[var(--color-muted)] mt-1">
          Fill in the details below and press "Publish announcement" when ready.
        </p>
      </div>
      <DashCard>
        <AnnouncementForm />
      </DashCard>
    </div>
  );
}
