/**
 * Storage helpers — typed localStorage utilities.
 * Browser-only. Always wraps in try-catch for SSR safety.
 * Keys:
 *   synapse_saved_opportunities
 *   synapse_applications
 *
 * IMPORTANT — snapshot caching for useSyncExternalStore:
 * React calls getSnapshot() on every render to check whether the store has
 * changed.  If the function returns a *new* object/array reference each time
 * (e.g. by parsing JSON), React sees it as always-changed and enters an
 * infinite re-render loop ("getSnapshot should be cached").
 *
 * Both getSavedOpportunityIds() and getApplications() use a raw-string cache:
 *   1. Read the raw localStorage string.
 *   2. If it matches the last-seen string, return the SAME cached array.
 *   3. Only when the string differs do we parse, validate, and cache anew.
 *
 * This makes both functions safe to pass directly as the getSnapshot argument
 * to useSyncExternalStore without any wrapper.
 */
import type { Application, ApplicationStatus } from "@/types";

const SAVED_KEY = "synapse_saved_opportunities";
const APPLICATIONS_KEY = "synapse_applications";

// ─── Saved Opportunities ───────────────────────────────────────────

/**
 * Sentinel used when the key is absent from localStorage, so we can
 * distinguish "missing" from any real JSON value.
 */
const SAVED_EMPTY_SENTINEL = "\0empty";

let _savedLastRaw: string = SAVED_EMPTY_SENTINEL;
let _savedLastResult: string[] = [];

/**
 * Returns the saved opportunity IDs from localStorage.
 * Referentially stable: returns the same array reference when the underlying
 * data has not changed. Safe to use as getSnapshot in useSyncExternalStore.
 */
export function getSavedOpportunityIds(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(SAVED_KEY);
  } catch {
    // SSR or storage unavailable — return last cached result (stable ref).
    return _savedLastResult;
  }

  const cacheKey = raw ?? SAVED_EMPTY_SENTINEL;

  // Same raw string → same data → return the SAME array reference.
  if (cacheKey === _savedLastRaw) return _savedLastResult;

  // Raw changed — parse and re-cache.
  _savedLastRaw = cacheKey;
  if (!raw) {
    _savedLastResult = [];
    return _savedLastResult;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    _savedLastResult = Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string")
      : [];
  } catch {
    _savedLastResult = [];
  }
  return _savedLastResult;
}

export function saveOpportunity(id: string): void {
  try {
    const ids = getSavedOpportunityIds();
    if (!ids.includes(id)) {
      const next = [...ids, id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      // Bust the cache so the next getSnapshot call re-reads localStorage.
      _savedLastRaw = SAVED_EMPTY_SENTINEL;
    }
  } catch {
    // ignore
  }
}

export function unsaveOpportunity(id: string): void {
  try {
    const ids = getSavedOpportunityIds().filter((i) => i !== id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
    // Bust the cache.
    _savedLastRaw = SAVED_EMPTY_SENTINEL;
  } catch {
    // ignore
  }
}

// ─── Applications ──────────────────────────────────────────────────

const VALID_STATUSES: ApplicationStatus[] = [
  "applied",
  "shortlisted",
  "review",
  "rejected",
  "accepted",
];

function isValidApplication(v: unknown): v is Application {
  if (!v || typeof v !== "object") return false;
  const a = v as Record<string, unknown>;
  return (
    typeof a.opportunityId === "string" &&
    typeof a.appliedAt === "string" &&
    typeof a.status === "string" &&
    VALID_STATUSES.includes(a.status as ApplicationStatus)
  );
}

const APPS_EMPTY_SENTINEL = "\0empty";

let _appsLastRaw: string = APPS_EMPTY_SENTINEL;
let _appsLastResult: Application[] = [];

/**
 * Returns the application list from localStorage.
 * Referentially stable: returns the same array reference when the underlying
 * data has not changed. Safe to use as getSnapshot in useSyncExternalStore.
 */
export function getApplications(): Application[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(APPLICATIONS_KEY);
  } catch {
    // SSR or storage unavailable — return last cached result (stable ref).
    return _appsLastResult;
  }

  const cacheKey = raw ?? APPS_EMPTY_SENTINEL;

  // Same raw string → same data → return the SAME array reference.
  if (cacheKey === _appsLastRaw) return _appsLastResult;

  // Raw changed — parse and re-cache.
  _appsLastRaw = cacheKey;
  if (!raw) {
    _appsLastResult = [];
    return _appsLastResult;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    _appsLastResult = Array.isArray(parsed)
      ? parsed.filter(isValidApplication)
      : [];
  } catch {
    _appsLastResult = [];
  }
  return _appsLastResult;
}

export function applyToOpportunity(opportunityId: string): void {
  try {
    const apps = getApplications();
    const existing = apps.find((a) => a.opportunityId === opportunityId);
    if (existing) return; // already applied
    const newApp: Application = {
      opportunityId,
      appliedAt: new Date().toISOString(),
      status: "applied",
    };
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([...apps, newApp]));
    // Bust the cache so next getSnapshot call re-reads localStorage.
    _appsLastRaw = APPS_EMPTY_SENTINEL;
  } catch {
    // ignore
  }
}

export function hasApplied(opportunityId: string): boolean {
  return getApplications().some((a) => a.opportunityId === opportunityId);
}

export function getApplicationStatus(
  opportunityId: string
): ApplicationStatus | null {
  const app = getApplications().find((a) => a.opportunityId === opportunityId);
  return app ? app.status : null;
}