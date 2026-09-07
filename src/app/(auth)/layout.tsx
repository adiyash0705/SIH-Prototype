/**
 * Auth Layout — (auth) route group
 *
 * Asymmetric two-column design:
 * - Left (45%): Dark brand panel — Synapse identity, value prop, network visual
 * - Right (55%): Form area — clean white surface
 *
 * Mobile: brand panel hidden, minimal header shown, form full-width.
 *
 * Does NOT use the application shell (no sidebar/header).
 */

import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";
import { Brand } from "@/components/shared/brand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Left: Brand panel (hidden on mobile) ─────────────── */}
      <div
        className="hidden lg:flex lg:w-[420px] xl:w-[460px] 2xl:w-[500px] shrink-0 bg-foreground relative overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 flex-1">
          <AuthBrandPanel />
        </div>
      </div>

      {/* ── Right: Form area ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-only header */}
        <div className="lg:hidden flex items-center h-14 px-5 border-b border-border">
          <Brand size="sm" showDescriptor={false} />
        </div>

        {/* Form content — centered vertically */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[400px]">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 text-center lg:text-right lg:px-10">
          <p className="text-[11px] text-muted-foreground/50">
            Synapse · SIH Prototype · 2026
          </p>
        </div>
      </div>

    </div>
  );
}
