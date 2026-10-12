"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { projectSchema, type ProjectFormData } from "@/lib/schemas";

function ok(message: string) {
  return { success: true as const, message };
}
function err(message: string) {
  return { success: false as const, message };
}

function revalidateProjects() {
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
}

export async function saveProject(id: string | null, data: ProjectFormData) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return err(parsed.error.errors[0]?.message ?? "Validation failed");
  }

  const db = await createClient();
  const payload = {
    title: parsed.data.title,
    description: parsed.data.description || null,
    status: parsed.data.status,
    target_amount: parsed.data.target_amount,
    raised_amount: parsed.data.raised_amount,
    image_url: parsed.data.image_url || null,
    is_published: parsed.data.is_published,
  };

  if (id) {
    const { error } = await db.from("projects").update(payload).eq("id", id);
    if (error) return err("Could not save. Please try again.");
    revalidateProjects();
    return ok(parsed.data.is_published ? "Project published" : "Project saved");
  } else {
    const { error } = await db.from("projects").insert(payload);
    if (error) return err("Could not save. Please try again.");
    revalidateProjects();
    return ok(
      parsed.data.is_published ? "Project published" : "Project saved as draft"
    );
  }
}

export async function deleteProject(id: string) {
  const db = await createClient();
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) return err("Could not delete. Please try again.");
  revalidateProjects();
  return ok("Project deleted");
}
