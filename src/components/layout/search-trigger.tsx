/**
 * SearchTrigger — Polished ⌘K search bar.
 * Desktop: shows as a styled pill with keyboard shortcut hint.
 * Mobile: icon-only button.
 * No global search implemented yet — placeholder dialog on click.
 */
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop pill */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "hidden md:flex items-center gap-2 h-8 w-[220px] xl:w-[260px] rounded-md",
          "border border-border bg-muted/60 hover:bg-muted",
          "px-2.5 text-sm text-muted-foreground",
          "transition-colors duration-100 cursor-text",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        aria-label="Search"
      >
        <Search className="size-3.5 shrink-0 text-muted-foreground/70" />
        <span className="flex-1 text-left text-[13px]">Search anything…</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-background px-1 py-0.5 font-mono text-[10px] text-muted-foreground/60 shadow-sm">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Mobile icon-only */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex md:hidden items-center justify-center w-8 h-8 rounded-md",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        aria-label="Search"
      >
        <Search className="size-4" />
      </button>

      {/* Placeholder dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm" aria-hidden="true" />

          {/* Dialog */}
          <div
            className="relative w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search"
            aria-modal="true"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search opportunities, people, institutions…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close search"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Placeholder state */}
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                Global search coming in the next phase.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Press{" "}
                <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
