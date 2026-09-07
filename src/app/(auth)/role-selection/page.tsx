/**
 * Role Selection Page — /role-selection
 *
 * Step following registration. User selects their role.
 * Stores selectedRole in localStorage via saveSelectedRole().
 * No real auth — prototype only.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Briefcase,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { saveSelectedRole } from "@/lib/auth";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

// ─── Role definitions ─────────────────────────────────────────────

interface RoleOption {
  role: UserRole;
  label: string;
  description: string;
  icon: LucideIcon;
}

const ROLES: RoleOption[] = [
  {
    role: "student",
    label: "Student",
    description:
      "Discover opportunities, build your portfolio and connect with industry.",
    icon: GraduationCap,
  },
  {
    role: "faculty",
    label: "Faculty",
    description:
      "Mentor students, collaborate on projects and connect with industry.",
    icon: BookOpen,
  },
  {
    role: "institution",
    label: "Institution",
    description:
      "Manage talent, partnerships and institutional opportunities.",
    icon: Building2,
  },
  {
    role: "industry",
    label: "Industry",
    description:
      "Discover talent, post opportunities and build academic partnerships.",
    icon: Briefcase,
  },
  {
    role: "admin",
    label: "Administrator",
    description:
      "Manage the Synapse platform, users and ecosystem.",
    icon: ShieldCheck,
  },
];

// ─── Role Card ────────────────────────────────────────────────────

interface RoleCardProps {
  option: RoleOption;
  selected: boolean;
  onSelect: () => void;
}

function RoleCard({ option, selected, onSelect }: RoleCardProps) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group w-full flex items-start gap-4 rounded-xl border px-5 py-4 text-left",
        "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-accent bg-accent/5 ring-1 ring-accent/30"
          : "border-border bg-background hover:border-foreground/20 hover:bg-muted/40"
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "shrink-0 mt-0.5 flex items-center justify-center rounded-lg w-9 h-9 transition-colors",
          selected
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-muted/80"
        )}
      >
        <Icon className="size-4" strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-[14px] font-semibold leading-snug transition-colors",
              selected ? "text-accent" : "text-foreground"
            )}
          >
            {option.label}
          </span>
          {/* Selection indicator */}
          <div
            className={cn(
              "shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
              selected
                ? "border-accent bg-accent"
                : "border-border bg-background group-hover:border-foreground/30"
            )}
          >
            {selected && (
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>
        </div>
        <p
          className={cn(
            "mt-0.5 text-[12px] leading-relaxed transition-colors",
            selected ? "text-accent/80" : "text-muted-foreground"
          )}
        >
          {option.description}
        </p>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleContinue() {
    if (!selectedRole) return;
    saveSelectedRole(selectedRole);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 400);
  }

  return (
    <>
      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          How will you use Synapse?
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
          Choose the role that best describes your work. Your workspace will be
          tailored around it.
        </p>
      </div>

      {/* Role list */}
      <div className="space-y-2.5">
        {ROLES.map((option) => (
          <RoleCard
            key={option.role}
            option={option}
            selected={selectedRole === option.role}
            onSelect={() => setSelectedRole(option.role)}
          />
        ))}
      </div>

      {/* Continue */}
      <div className="mt-7">
        <Button
          type="button"
          size="lg"
          disabled={!selectedRole || submitting}
          onClick={handleContinue}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 h-9 transition-all"
        >
          {submitting ? "Setting up your workspace\u2026" : "Continue"}
        </Button>
        {!selectedRole && (
          <p className="mt-2.5 text-center text-[11px] text-muted-foreground/60">
            Select a role to continue
          </p>
        )}
      </div>
    </>
  );
}
