"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = null;

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="space-y-5" aria-label="Sign in form" noValidate>
      {/* Global error banner */}
      {state?.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium"
        >
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--color-navy)]"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
          aria-invalid={!!state?.fieldErrors?.email}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[var(--color-navy)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition aria-[invalid=true]:border-red-400"
        />
        {state?.fieldErrors?.email && (
          <p id="email-error" role="alert" className="text-xs text-red-600 mt-1">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--color-navy)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          aria-describedby={state?.fieldErrors?.password ? "password-error" : undefined}
          aria-invalid={!!state?.fieldErrors?.password}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-[var(--color-navy)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition aria-[invalid=true]:border-red-400"
        />
        {state?.fieldErrors?.password && (
          <p id="password-error" role="alert" className="text-xs text-red-600 mt-1">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--color-navy)] text-white font-semibold py-3 text-sm hover:bg-[var(--color-navy)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 transition min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
