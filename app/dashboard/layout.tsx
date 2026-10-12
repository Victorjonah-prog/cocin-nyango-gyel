import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const ALLOWED_ROLES = ["admin", "secretary"];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // getUser() validates the JWT; middleware already checked this, but we
  // also check here so the layout itself is safe even if middleware is bypassed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile for display and role guard
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "").toLowerCase();

  if (!profile || !ALLOWED_ROLES.includes(role)) {
    // Sign them out and bounce to login with a message
    await supabase.auth.signOut();
    redirect("/login?error=access");
  }

  const displayName = profile.full_name || user.email || "Staff";
  const displayRole =
    role === "admin" ? "Administrator" : role === "secretary" ? "Secretary" : role;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar displayName={displayName} displayRole={displayRole} />
      <main className="flex-1 bg-[var(--color-ivory)] overflow-auto">
        {children}
      </main>
    </div>
  );
}
