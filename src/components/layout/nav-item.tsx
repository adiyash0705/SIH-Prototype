/**
 * NavItem — Single navigation item for sidebar.
 *
 * Features:
 * - Icon (Lucide, consistent size-4)
 * - Label
 * - Badge (optional count pill)
 * - Active state: subtle bg + accent left-border pip
 * - Hover state: muted bg, foreground text
 * - Keyboard accessible
 *
 * Placeholder routes (no matching page) still render correctly —
 * Next.js will handle 404 for missing routes gracefully.
 */
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem as NavItemType } from "@/types";

interface NavItemProps {
  item: NavItemType;
  isActive?: boolean;
}

export function NavItem({ item, isActive = false }: NavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      prefetch={false}
      className={cn(
        // Base layout
        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] font-medium",
        // Transitions
        "transition-colors duration-100",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        // Default
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        // Active
        isActive && "text-foreground bg-muted"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator pip */}
      <span
        className={cn(
          "absolute left-0 top-[6px] bottom-[6px] w-0.5 rounded-full transition-opacity",
          isActive ? "bg-accent opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Icon */}
      {Icon && (
        <Icon
          className={cn(
            "size-[15px] shrink-0 transition-colors",
            isActive
              ? "text-accent"
              : "text-muted-foreground/70 group-hover:text-muted-foreground"
          )}
        />
      )}

      {/* Label */}
      <span className="flex-1 truncate">{item.label}</span>

      {/* Badge */}
      {item.badge !== undefined && (
        <span
          className={cn(
            "ml-auto shrink-0 min-w-[18px] h-[18px] flex items-center justify-center",
            "rounded-full px-1 text-[10px] font-semibold tabular-nums",
            isActive
              ? "bg-accent/15 text-accent"
              : "bg-muted-foreground/15 text-muted-foreground"
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
