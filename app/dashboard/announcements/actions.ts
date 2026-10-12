"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  announcementSchema,
  type AnnouncementFormData,
} from "@/lib/schemas";

function ok(message: string) {
  return { success: true as const, message };
}
function err(message: string) {
  return { success: false as const, message };
}

function revalidateAnnouncements() {
  revalidatePath("/announcements");
  revalidatePath("/");
  revalidatePath("/dashboard/announcements");
}

export async function saveAnnouncement(
  id: string | null,
  data: AnnouncementFormData
) {
  const parsed = announcementSchema.safeParse(data);
  if (!parsed.success) {
    return err(parsed.error.errors[0]?.message ?? "Validation failed");
  }

  const db = await createClient();
  const payload = {
    title: parsed.data.title,
    excerpt: parsed.data.excerpt || null,
    body: parsed.data.body || null,
    category: parsed.data.category,
    image_url: parsed.data.image_url || null,
    published: parsed.data.published,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await db
      .from("announcements")
      .update(payload)
      .eq("id", id);
    if (error) return err("Could not save. Please try again.");
    revalidateAnnouncements();
    return ok(
      parsed.data.published ? "Announcement published" : "Announcement saved"
    );
  } else {
    const { error } = await db.from("announcements").insert(payload);
    if (error) return err("Could not save. Please try again.");
    revalidateAnnouncements();
    return ok(
      parsed.data.published
        ? "Announcement published"
        : "Announcement saved as draft"
    );
  }
}

export async function deleteAnnouncement(id: string) {
  const db = await createClient();
  const { error } = await db.from("announcements").delete().eq("id", id);
  if (error) return err("Could not delete. Please try again.");
  revalidateAnnouncements();
  return ok("Announcement deleted");
}
