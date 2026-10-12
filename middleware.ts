import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Middleware — runs on the Edge before every matched request.
 *
 * Responsibilities:
 *  1. Create a Supabase client wired to the request cookies.
 *  2. Call getUser() — this validates the JWT and refreshes the session
 *     if the access token has expired, writing new cookies to the response.
 *  3. Copy all updated cookies from the Supabase client onto the response
 *     so the browser receives the refreshed tokens.
 *  4. Redirect unauthenticated users to /login?next=<path>.
 *
 * /login is NOT in the matcher — no redirect loop is possible.
 */
export async function middleware(request: NextRequest) {
  // Start with a plain pass-through response so we can attach cookies to it
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, responseHeaders) {
        // Write cookies onto the outgoing response
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
        // Apply any cache-control headers the library requires
        if (responseHeaders) {
          Object.entries(responseHeaders).forEach(([key, value]) => {
            response.headers.set(key, value as string);
          });
        }
      },
    },
  });

  // getUser() validates the JWT server-side and triggers a token refresh
  // if needed. Never use getSession() in middleware — it trusts the client.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Only protect /dashboard and everything under it.
  // /login is NOT listed — no loop possible.
  matcher: ["/dashboard/:path*"],
};
