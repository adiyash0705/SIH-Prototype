/**
 * Sidebar — Application sidebar shell.
 *
 * Desktop: fixed 220–240px, always visible.
 * Mobile: hidden by default, opens as Sheet overlay.
 *
 * Features:
 * - usePathname for active state detection
 * - Role-aware nav sections (data-driven)
 * - Polished brand area with descriptor
 * - Compact, restrained nav group labels
 * - Bottom user profile area
 */
"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { NavItem } from "@/components/layout/nav-item";
import { UserMenu } from "@/components/layout/user-menu";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/types";

// ─── Types ─────────────────────────────────────────────────────────

interface SidebarProps {
  navSections: NavSection[];
}

interface MobileSidebarProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Shared: Navigation render ─────────────────────────────────────

function NavSections({
  navSections,
  activePath,
}: {
  navSections: NavSection[];
  activePath: string;
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="Main navigation">
      <ul role="list" className="space-y-5">
        {navSections.map((section, idx) => (
          <li key={idx}>
            {/* Section group label */}
            {section.label && (
              <p
                className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 select-none"
              >
                {section.label}
              </p>
            )}
            <ul role="list" className="space-y-px">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavItem
                    item={item}
                    isActive={
                      item.href === "/dashboard"
                        ? activePath === item.href
                        : activePath.startsWith(item.href)
                    }
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Desktop Sidebar ───────────────────────────────────────────────

function DesktopSidebar({ navSections }: SidebarProps) {
  const activePath = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col w-[220px] xl:w-[240px] flex-shrink-0 bg-sidebar border-r border-border"
      aria-label="Sidebar navigation"
    >
      {/* Brand */}
      <div className="px-4 h-[52px] flex items-center border-b border-border shrink-0">
        <Brand size="sm" showDescriptor={false} />
      </div>

      {/* Navigation */}
      <NavSections navSections={navSections} activePath={activePath} />

      {/* User profile */}
      <div className="shrink-0 border-t border-border px-2 py-2">
        <UserMenu />
      </div>
    </aside>
  );
}

// ─── Mobile Sidebar (Sheet/Drawer) ─────────────────────────────────

function MobileSidebar({ navSections, isOpen, onClose }: MobileSidebarProps) {
  const activePath = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/15 backdrop-blur-[2px] lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-sidebar border-r border-border",
          "shadow-xl transition-transform duration-200 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-4 h-[52px] border-b border-border shrink-0">
          <Brand size="sm" showDescriptor={false} />
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <NavSections navSections={navSections} activePath={activePath} />

        {/* User profile */}
        <div className="shrink-0 border-t border-border px-2 py-2">
          <UserMenu />
        </div>
      </div>
    </>
  );
}

// ─── Exports ───────────────────────────────────────────────────────

export { DesktopSidebar, MobileSidebar };
export type { SidebarProps, MobileSidebarProps };
