import type { Metadata } from "next";
import { BackLink, DashCard } from "@/components/dashboard/FormFields";
import EventForm from "../EventForm";

export const metadata: Metadata = { title: "Add Event — Dashboard" };

export default function NewEventPage() {
  return (
    <div className="p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <BackLink href="/dashboard/events" label="Back to Events" />
        <h1 className="text-3xl font-display font-bold text-[var(--color-navy)] mt-4">
          Add an Event
        </h1>
        <p className="text-[var(--color-muted)] mt-1">
          Fill in the details below and press "Publish event" when ready.
        </p>
      </div>
      <DashCard>
        <EventForm />
      </DashCard>
    </div>
  );
}
