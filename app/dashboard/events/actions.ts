"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";
import { eventSchema, type EventFormData } from "@/lib/schemas";

function ok(message: string) {
  return { success: true as const, message };
}
function err(message: string) {
  return { success: false as const, message };
}

function revalidateEvents() {
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/dashboard/events");
}

export async function saveEvent(id: string | null, data: EventFormData) {
  const parsed = eventSchema.safeParse(data);
  if (!parsed.success) {
    return err(parsed.error.errors[0]?.message ?? "Validation failed");
  }

  const db = createServerClient();
  const payload = {
    title: parsed.data.title,
    description: parsed.data.description || null,
    category: parsed.data.category,
    location: parsed.data.location || null,
    starts_at: parsed.data.starts_at,
    ends_at: parsed.data.ends_at || null,
    image_url: parsed.data.image_url || null,
    published: parsed.data.published,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await db.from("events").update(payload).eq("id", id);
    if (error) return err("Could not save. Please try again.");
    revalidateEvents();
    return ok(parsed.data.published ? "Event published" : "Event saved");
  } else {
    const { error } = await db.from("events").insert(payload);
    if (error) return err("Could not save. Please try again.");
    revalidateEvents();
    return ok(
      parsed.data.published ? "Event published" : "Event saved as draft"
    );
  }
}

export async function deleteEvent(id: string) {
  const db = createServerClient();
  const { error } = await db.from("events").delete().eq("id", id);
  if (error) return err("Could not delete. Please try again.");
  revalidateEvents();
  return ok("Event deleted");
}
