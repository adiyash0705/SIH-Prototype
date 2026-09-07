/**
 * Synapse — Shared TypeScript Types
 * Central type definitions. No `any` usage.
 */

// ─── User Roles ────────────────────────────────────────────────────

export type UserRole =
  | "student"
  | "faculty"
  | "institution"
  | "industry"
  | "admin";

// ─── Navigation ────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string | number;
  isActive?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

// ─── User ──────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  initials: string;
  institution?: string;
  company?: string;
}

// ─── Status ────────────────────────────────────────────────────────

export type Status = "active" | "pending" | "inactive" | "review" | "closed";

export interface StatusConfig {
  label: string;
  color: "success" | "warning" | "destructive" | "info" | "default";
}

// ─── Opportunity ────────────────────────────────────────────────────

export type WorkMode = "remote" | "hybrid" | "onsite";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "internship" | "project" | "research" | "fulltime";
  status: Status;
  postedAt: string;
  location: string;
  tags: string[];
  // Extended fields (Step 4)
  workMode: WorkMode;
  matchScore: number;       // 0-100
  matchLabel: string;       // e.g. "Strong match"
  matchReason: string;      // e.g. "Matches your Python and ML skills"
  description: string;
  responsibilities: string[];
  requirements: string[];
  duration?: string;        // e.g. "3 months"
  stipend?: string;         // e.g. "₹25,000/month"
  featured?: boolean;
}

// ─── Application ───────────────────────────────────────────────────

export type ApplicationStatus =
  | "applied"
  | "shortlisted"
  | "review"
  | "rejected"
  | "accepted";

export interface Application {
  opportunityId: string;
  appliedAt: string;
  status: ApplicationStatus;
}

// ─── Partnership ───────────────────────────────────────────────────

export interface Partnership {
  id: string;
  institution: string;
  company: string;
  type: "mou" | "research" | "placement" | "internship";
  status: Status;
  startDate: string;
}

// ─── Notification ──────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
}

// ─── Component Helpers ─────────────────────────────────────────────

export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}
