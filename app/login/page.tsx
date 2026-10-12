import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig, LOGO_PATH } from "@/lib/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-ivory)] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">

        {/* ── Brand ── */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--color-gold)]/30 shadow-md">
            <Image
              src={LOGO_PATH}
              alt="COCIN Church of Christ in Nations official logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-[var(--color-navy)] text-xl leading-tight">
              COCIN{" "}
              <span className="text-[var(--color-gold)]">Nyango Gyel</span>
            </p>
            <p className="text-sm text-[var(--color-navy)]/60 mt-1">
              Members Portal
            </p>
          </div>
        </div>

        {/* ── Auth form ── */}
        <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-gray-100" />}>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-[var(--color-navy)]/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>

        <div className="mt-3 text-center">
          <Link
            href="/"
            className="text-xs text-[var(--color-gold)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
