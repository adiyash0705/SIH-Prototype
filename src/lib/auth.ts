/**
 * Auth helpers — typed mock authentication utilities.
 *
 * NO real authentication. NO password storage.
 * Only safe prototype state: selectedRole in localStorage.
 */

import type { UserRole } from "@/types";

const ROLE_KEY = "synapse_selected_role";

export function saveSelectedRole(role: UserRole): void {
  try {
    localStorage.setItem(ROLE_KEY, role);
  } catch {
    // localStorage may be unavailable (SSR, private mode)
  }
}

export function getSelectedRole(): UserRole | null {
  try {
    const stored = localStorage.getItem(ROLE_KEY);
    if (isValidRole(stored)) return stored;
  } catch {
    // SSR or unavailable
  }
  return null;
}

export function clearSelectedRole(): void {
  try {
    localStorage.removeItem(ROLE_KEY);
  } catch {
    // ignore
  }
}

const VALID_ROLES: UserRole[] = [
  "student",
  "faculty",
  "institution",
  "industry",
  "admin",
];

export function isValidRole(value: string | null): value is UserRole {
  return value !== null && (VALID_ROLES as string[]).includes(value);
}
