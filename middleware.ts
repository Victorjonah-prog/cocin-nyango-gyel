import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Middleware — runs on the Edge before every matched request.
 *
 * Protected routes: /dashboard and everything under it.
 * Unauthenticated visitors are sent to /login.
 *
 * /login is explicitly excluded from the matcher so there is
 * no possible redirect loop.
 */
export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  // createClient works on the Edge runtime
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      // Persist session via cookies that the browser already sent
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        // Forward the cookie so Supabase can read the session token
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the intended destination so we can redirect after login if needed
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on /dashboard and its sub-paths.
  // /login is NOT in this list — no loop possible.
  matcher: ["/dashboard/:path*"],
};
