/**
 * Register Page — /register
 *
 * Mock registration form. No real backend, no password storage.
 * On valid submission: redirects to /role-selection.
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

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// ─── Validation ───────────────────────────────────────────────────

const MIN_PASSWORD_LENGTH = 8;

function validateRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function clearError(field: keyof RegisterErrors) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateRegister(name, email, password, confirmPassword);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Mock registration delay — passwords are never stored
    setTimeout(() => {
      setSubmitting(false);
      router.push("/role-selection");
    }, 600);
  }

  return (
    <>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create your Synapse account
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
          Join the network connecting academia, talent and industry.
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
        <FormField id="name" label="Full name" error={errors.name}>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Aditya Sharma"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) clearError("name");
            }}
            aria-invalid={!!errors.name}
            className="h-9"
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearError("email");
            }}
            aria-invalid={!!errors.email}
            className="h-9"
          />
        </FormField>

        <FormField
          id="password"
          label="Password"
          error={errors.password}
          hint={`Minimum ${MIN_PASSWORD_LENGTH} characters`}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError("password");
            }}
            aria-invalid={!!errors.password}
            className="h-9"
          />
        </FormField>

        <FormField
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) clearError("confirmPassword");
            }}
            aria-invalid={!!errors.confirmPassword}
            className="h-9"
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 h-9"
        >
          {submitting ? "Creating account\u2026" : "Continue"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-[12px] text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          Sign in
        </Link>
      </p>

      {/* Legal note */}
      <p className="mt-4 text-center text-[11px] text-muted-foreground/50 leading-relaxed">
        By creating an account you agree to the{" "}
        <button
          type="button"
          className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          type="button"
          className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
        >
          Privacy Policy
        </button>
        .
      </p>
    </>
  );
}
