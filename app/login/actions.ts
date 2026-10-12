"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
});

export type LoginState = {
  error?: string;
  fieldErrors?: { email?: string; password?: string };
} | null;

/**
 * Maps Supabase Auth error messages to plain language suitable
 * for a non-technical secretary.
 *
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
  // Access-denied / banned
  if (m.includes("banned") || m.includes("disabled") || m.includes("not allowed")) {
    return "Your account does not have access to this portal. Please contact the church administrator.";
  }

  return "Sign-in failed. Please try again or contact the church administrator.";
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 1. Validate inputs
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        email: fe.email?.[0],
        password: fe.password?.[0],
      },
    };
  }

  // 2. Attempt sign-in
  const db = createServerClient();
  const { data, error } = await db.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Log the full technical error server-side only
    console.error("[loginAction] Supabase signInWithPassword error:", error.message, `(status ${error.status})`);
    return { error: friendlyAuthError(error.message) };
  }

  if (!data.session) {
    console.error("[loginAction] signInWithPassword succeeded but no session returned");
    return { error: "Sign-in failed. Please try again." };
  }

  // 3. Redirect to dashboard — redirect() throws internally so must be outside try/catch
  redirect("/dashboard");
}
