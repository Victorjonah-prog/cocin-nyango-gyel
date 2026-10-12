import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Cookie-aware Supabase client for use in Client Components.
 * Call once per component tree — @supabase/ssr memoises it internally.
 */
export function createClient() {
  return _createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
