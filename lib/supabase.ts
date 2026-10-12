import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Browser / Server-Component client.
 * Uses the publishable (anon) key — safe to expose.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/**
 * Server-only client for Server Actions and Route Handlers.
 * Identical credentials here; swap for a service-role key if you add
 * an `SUPABASE_SERVICE_ROLE_KEY` env var for privileged operations.
 */
export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseKey);
}
