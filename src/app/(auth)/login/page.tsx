/**
 * Login Page — /login
 *
 * Mock authentication form. No real backend.
 * Any valid-format email + non-empty password proceeds to /dashboard.
 */
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleButton } from "@/components/auth/google-button";

// ─── Types ────────────────────────────────────────────────────────

interface LoginErrors {
  email?: string;
  password?: string;
}

// ─── Validation ───────────────────────────────────────────────────

function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }
  return errors;
}

// ─── Component ────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateLogin(email, password);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Mock auth delay — replace with real auth when backend exists
    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 600);
  }

  return (
    <>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
          Sign in to continue to your Synapse workspace.
        </p>
      </div>

      {/* Google */}
      <div className="mb-6">
        <GoogleButton />
      </div>

      {/* Divider */}
      <div className="relative mb-6" aria-hidden="true">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-[11px] text-muted-foreground/60 font-medium uppercase tracking-wider">
            or
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            className="h-9"
          />
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((p) => ({ ...p, password: undefined }));
            }}
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={!!errors.password}
            className="h-9"
          />
        </FormField>

        {/* Remember me + Forgot */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded-[3px] border border-border bg-background checked:bg-primary checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors cursor-pointer"
            />
            <span className="text-[12px] text-muted-foreground group-hover:text-foreground transition-colors">
              Remember me
            </span>
          </label>

          <button
            type="button"
            className="text-[12px] text-accent hover:text-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 h-9"
        >
          {submitting ? "Signing in\u2026" : "Sign in"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-[12px] text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          Create one
        </Link>
      </p>
    </>
  );
}
