/**
 * Synapse — Role-Aware Navigation Configuration
 * Data-driven nav. Add/change role sections here without touching components.
 */

import {
  BarChart3,
  Briefcase,
  Building2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import type { NavSection, UserRole } from "@/types";

// ─── Navigation sections by role ───────────────────────────────────

const studentSections: NavSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Discover",
    items: [
      {
        label: "Opportunities",
        href: "/opportunities",
        icon: Sparkles,
      },
      {
        label: "Talent",
        href: "/talent",
        icon: GraduationCap,
      },
      {
        label: "Institutions",
        href: "/institutions",
        icon: Building2,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Applications",
        href: "/applications",
        icon: Briefcase,
        badge: 3,
      },
      {
        label: "Collaborations",
        href: "/collaborations",
        icon: Users,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: MessageSquare,
        badge: 2,
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

const facultySections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Discover",
    items: [
      { label: "Opportunities", href: "/opportunities", icon: Sparkles },
      { label: "Talent", href: "/talent", icon: GraduationCap },
      { label: "Institutions", href: "/institutions", icon: Building2 },
      { label: "Projects", href: "/projects", icon: FolderKanban },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Collaborations", href: "/collaborations", icon: Users },
      { label: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

const industrySections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Discover",
    items: [
      { label: "Talent", href: "/talent", icon: GraduationCap },
      { label: "Institutions", href: "/institutions", icon: Building2 },
      { label: "Projects", href: "/projects", icon: FolderKanban },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Opportunities", href: "/opportunities", icon: Sparkles },
      { label: "Collaborations", href: "/collaborations", icon: Users },
      { label: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

const institutionSections: NavSection[] = studentSections;

const adminSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Institutions", href: "/institutions", icon: Building2 },
      { label: "Opportunities", href: "/opportunities", icon: Sparkles },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

// ─── Role-to-sections map ───────────────────────────────────────────

export const navSectionsByRole: Record<UserRole, NavSection[]> = {
  student: studentSections,
  faculty: facultySections,
  industry: industrySections,
  institution: institutionSections,
  admin: adminSections,
};

/**
 * Get navigation sections for a given role.
 * Falls back to student sections if role is unknown.
 */
export function getNavSections(role: UserRole): NavSection[] {
  return navSectionsByRole[role] ?? studentSections;
}
