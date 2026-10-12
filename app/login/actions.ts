"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

export type LoginState = {
  error?: string;
  fieldErrors?: { email?: string; password?: string };
} | null;

const ALLOWED_ROLES = ["admin", "secretary"] as const;

/**
 * Maps Supabase Auth error messages to plain language for the secretary.
 * The raw message is logged to the server console only.
 */
function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
    return "The email or password is incorrect. Please check and try again.";
  }
  if (m.includes("email not confirmed")) {
    return "Your email address has not been confirmed yet. Please check your inbox for a confirmation email.";
  }
  if (m.includes("user not found")) {
    return "No account found with that email address.";
  }
  if (m.includes("too many requests") || m.includes("rate limit")) {
    return "Too many sign-in attempts. Please wait a few minutes and try again.";
  }
  if (m.includes("network") || m.includes("fetch") || m.includes("connection")) {
    return "Could not connect to the server. Please check your internet connection and try again.";
  }
  if (m.includes("banned") || m.includes("disabled") || m.includes("not allowed")) {
    return "Your account does not have access to this portal. Please contact the church administrator.";
  }
  return "Sign-in failed. Please try again or contact the church administrator.";
}

/** Extract the ?next= param from the Referer header (safe; only /dashboard paths honoured). */
async function getSafeNextPath(): Promise<string> {
  try {
    const headerStore = await headers();
    const referer = headerStore.get("referer") ?? "";
    const url = new URL(referer);
    const next = url.searchParams.get("next") ?? "";
    if (next.startsWith("/dashboard")) return next;
  } catch {
    // ignore
  }
  return "/dashboard";
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  // ── 1. Validate inputs ───────────────────────────────────────────────────
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return { fieldErrors: { email: fe.email?.[0], password: fe.password?.[0] } };
  }

  // ── 2. Sign in ───────────────────────────────────────────────────────────
  // createClient() is async — must await
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (authError) {
    console.error("[loginAction] signInWithPassword error:", authError.message, `(status ${authError.status})`);
    return { error: friendlyAuthError(authError.message) };
  }

  if (!authData.session || !authData.user) {
    console.error("[loginAction] signInWithPassword succeeded but no session/user returned");
    return { error: "Sign-in failed. Please try again." };
  }

  const userId = authData.user.id;

  // ── 3. Role check ────────────────────────────────────────────────────────
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single();

  // DEBUG: log user id and role — remove once login is confirmed working
  console.log(
    "[loginAction] user id:", userId,
    "| profile:", profile ?? "(not found)",
    "| profile error:", profileError?.message ?? "none"
  );

  if (profileError || !profile) {
    console.error("[loginAction] No profile found for user", userId);
    await supabase.auth.signOut();
    return { error: "You do not have access. Please contact the church administrator." };
  }

  const role = (profile.role ?? "").toLowerCase();
  if (!ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
    console.error("[loginAction] Role not permitted:", role, "for user", userId);
    await supabase.auth.signOut();
    return { error: "You do not have access. Please contact the church administrator." };
  }

  // ── 4. Redirect ─────────────────────────────────────────────────────────
  // redirect() throws internally — must NOT be inside try/catch
  const destination = await getSafeNextPath();
  redirect(destination);
}

/** Server action called by the Sign Out button in the dashboard. */
export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
