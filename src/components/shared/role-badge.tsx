/**
 * RoleBadge — Client component that reads selectedRole from localStorage
 * and shows it on the dashboard.
 *
 * Uses useSyncExternalStore to safely read from localStorage without
 * calling setState inside useEffect (which triggers cascading renders).
 */
"use client";

import { useSyncExternalStore } from "react";
import { getSelectedRole } from "@/lib/auth";
import type { UserRole } from "@/types";

const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  faculty: "Faculty",
  institution: "Institution",
  industry: "Industry",
  admin: "Administrator",
};

/**
 * Subscribe to storage events so that role updates from other tabs
 * (or in the same tab via dispatchEvent) are reflected.
 */
function subscribeToStorage(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): UserRole | null {
  return getSelectedRole();
}

// During SSR there is no localStorage — return null
function getServerSnapshot(): null {
  return null;
}

export function RoleBadge() {
  const role = useSyncExternalStore(
    subscribeToStorage,
    getSnapshot,
    getServerSnapshot
  );

  if (!role) return null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/20 bg-accent/[0.08] px-2.5 py-1">
      <span className="text-[11px] font-medium uppercase tracking-wider text-accent/70">
        Role
      </span>
      <span className="text-[13px] font-semibold text-accent">
        {ROLE_LABELS[role]}
      </span>
    </div>
  );
}
