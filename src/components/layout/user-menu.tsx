/**
 * UserMenu — Sidebar bottom user area.
 * Shows avatar + first name + role.
 * Click opens upward dropdown with Profile / Settings / Sign out.
 *
 * UserAvatar — standalone avatar component, reused in header.
 */
"use client";

import { useState } from "react";
import { ChevronUp, LogOut, Settings, User } from "lucide-react";
import { currentUser } from "@/data/mock";
import { cn } from "@/lib/utils";

const roleLabel: Record<string, string> = {
  student: "Student",
  faculty: "Faculty",
  institution: "Institution",
  industry: "Industry",
  admin: "Admin",
};

export function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "bg-muted"
        )}
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {/* Avatar */}
        <span
          className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-semibold"
          aria-hidden="true"
        >
          {currentUser.initials}
        </span>

        {/* Name + role */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[13px] font-medium text-foreground truncate leading-none">
            {currentUser.name.split(" ")[0]}
          </p>
          <p className="text-[11px] text-muted-foreground truncate leading-none mt-0.5">
            {roleLabel[currentUser.role]}
          </p>
        </div>

        <ChevronUp
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-150",
            !open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown — upward */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="menu"
            className="absolute bottom-full left-0 right-0 mb-1.5 z-50 rounded-lg border border-border bg-popover shadow-lg py-1 overflow-hidden"
          >
            {/* User info header */}
            <div className="px-3 py-2.5 border-b border-border mb-1">
              <p className="text-[13px] font-medium text-foreground leading-none">
                {currentUser.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-none">
                {currentUser.email}
              </p>
            </div>

            {[
              { icon: User, label: "Profile" },
              { icon: Settings, label: "Settings" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-foreground hover:bg-muted transition-colors text-left"
              >
                <Icon className="size-3.5 text-muted-foreground" />
                {label}
              </button>
            ))}

            <hr className="my-1 border-border" />

            <button
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-destructive hover:bg-destructive/10 transition-colors text-left"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── UserAvatar ─────────────────────────────────────────────────────

interface UserAvatarProps {
  name: string;
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  name,
  initials,
  size = "md",
  className,
}: UserAvatarProps) {
  const sizeClass = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-foreground text-background font-semibold shrink-0",
        sizeClass,
        className
      )}
      aria-label={name}
      title={name}
    >
      {initials}
    </span>
  );
}
