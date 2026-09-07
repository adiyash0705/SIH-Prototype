/**
 * Opportunities Page — /opportunities
 * Full opportunity discovery with search, filter, sort, and save.
 */
"use client";

import { useState, useMemo, useSyncExternalStore, useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import {
  getSavedOpportunityIds,
  saveOpportunity,
  unsaveOpportunity,
  getApplications,
} from "@/lib/storage";
import { mockOpportunities } from "@/data/mock";
import type { Opportunity, WorkMode } from "@/types";
import { cn } from "@/lib/utils";

// ─── Filter state ────────────────────────────────────────────────────

interface Filters {
  types: Array<Opportunity["type"]>;
  workModes: WorkMode[];
  minMatch: number;
}

const EMPTY_FILTERS: Filters = { types: [], workModes: [], minMatch: 0 };

type SortKey = "match" | "recent";

const TYPE_OPTIONS: { value: Opportunity["type"]; label: string }[] = [
  { value: "internship", label: "Internship" },
  { value: "research", label: "Research" },
  { value: "project", label: "Project" },
  { value: "fulltime", label: "Full-time" },
];

const WORK_MODE_OPTIONS: { value: WorkMode; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const MATCH_OPTIONS = [
  { value: 0, label: "All" },
  { value: 70, label: "70%+" },
  { value: 80, label: "80%+" },
  { value: 90, label: "90%+" },
];

// ─── localStorage subscription ───────────────────────────────────────

function subscribeToStorage(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

// Named SSR snapshot functions — stable references for useSyncExternalStore.
function getServerSnapshotApps(): import("@/types").Application[] { return []; }
function getServerSnapshotIds(): string[] { return []; }

// ─── Filtering + sorting ─────────────────────────────────────────────

function filterAndSort(
  opportunities: Opportunity[],
  query: string,
  filters: Filters,
  sortKey: SortKey
): Opportunity[] {
  const q = query.toLowerCase().trim();

  let result = opportunities.filter((o) => {
    if (q) {
      const haystack = [o.title, o.company, o.location, o.type, ...o.tags]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.types.length > 0 && !filters.types.includes(o.type))
      return false;
    if (
      filters.workModes.length > 0 &&
      !filters.workModes.includes(o.workMode)
    )
      return false;
    if (o.matchScore < filters.minMatch) return false;
    return true;
  });

  if (sortKey === "match") {
    result = [...result].sort((a, b) => b.matchScore - a.matchScore);
  } else {
    result = [...result].sort(
      (a, b) =>
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
  }

  return result;
}

function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.types.length > 0 ||
    filters.workModes.length > 0 ||
    filters.minMatch > 0
  );
}

function activeFilterCount(filters: Filters): number {
  return (
    filters.types.length +
    filters.workModes.length +
    (filters.minMatch > 0 ? 1 : 0)
  );
}

// ─── Page ────────────────────────────────────────────────────────────

export default function OpportunitiesPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>("match");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [localSavedOverrides, setLocalSavedOverrides] = useState<
    Record<string, boolean>
  >({});

  const applications = useSyncExternalStore(
    subscribeToStorage,
    getApplications,
    getServerSnapshotApps
  );
  const savedIds = useSyncExternalStore(
    subscribeToStorage,
    getSavedOpportunityIds,
    getServerSnapshotIds
  );

  const appliedIds = new Set(applications.map((a) => a.opportunityId));

  const results = useMemo(
    () => filterAndSort(mockOpportunities, query, filters, sort),
    [query, filters, sort]
  );

  const isFiltered = query.trim().length > 0 || hasActiveFilters(filters);

  function clearFilters() {
    setQuery("");
    setFilters(EMPTY_FILTERS);
  }

  function toggleType(type: Opportunity["type"]) {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type)
        ? f.types.filter((t) => t !== type)
        : [...f.types, type],
    }));
  }

  function toggleWorkMode(mode: WorkMode) {
    setFilters((f) => ({
      ...f,
      workModes: f.workModes.includes(mode)
        ? f.workModes.filter((m) => m !== mode)
        : [...f.workModes, mode],
    }));
  }

  const handleSaveToggle = useCallback(
    (id: string, saving: boolean) => {
      if (saving) {
        saveOpportunity(id);
      } else {
        unsaveOpportunity(id);
      }
      setLocalSavedOverrides((prev) => ({ ...prev, [id]: saving }));
    },
    []
  );

  function isSaved(id: string): boolean {
    if (id in localSavedOverrides) return localSavedOverrides[id];
    return savedIds.includes(id);
  }

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1100px]">
      <PageHeader
        title="Opportunities"
        description="Discover internships, projects, research roles and industry opportunities matched to your profile."
      />

      {/* ── Controls ─── */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search opportunities, skills, companies…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Filters toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn("h-9 gap-1.5 shrink-0", filtersOpen && "bg-muted")}
          >
            <SlidersHorizontal className="size-3.5" />
            Filters
            {hasActiveFilters(filters) && (
              <span className="ml-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                {activeFilterCount(filters)}
              </span>
            )}
          </Button>

          {/* Sort toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden h-9 shrink-0">
            {(["match", "recent"] as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                className={cn(
                  "px-3 text-[12px] font-medium transition-colors",
                  sort === key
                    ? "bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {key === "match" ? "Best match" : "Most recent"}
              </button>
            ))}
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Type */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TYPE_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleType(value)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[12px] font-medium border transition-colors",
                        filters.types.includes(value)
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work mode */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Work mode
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {WORK_MODE_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleWorkMode(value)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[12px] font-medium border transition-colors",
                        filters.workModes.includes(value)
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min match */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Min. match score
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {MATCH_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setFilters((f) => ({ ...f, minMatch: value }))
                      }
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[12px] font-medium border transition-colors",
                        filters.minMatch === value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters(filters) && (
              <div className="mt-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <X className="size-3" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Results summary ─── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-muted-foreground">
          {results.length === 0
            ? "No results"
            : `${results.length} opportunit${results.length === 1 ? "y" : "ies"}`}
          {isFiltered && " · filtered"}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="size-3" />
            Clear all
          </button>
        )}
      </div>

      {/* ── Results ─── */}
      {results.length === 0 ? (
        <div className="rounded-lg border border-border border-dashed bg-muted/20 py-16 text-center">
          <Search className="size-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">
            No opportunities match your current filters.
          </p>
          <p className="text-[13px] text-muted-foreground mb-4">
            Try adjusting your search or filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {results.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              saved={isSaved(opp.id)}
              applied={appliedIds.has(opp.id)}
              onSaveToggle={handleSaveToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
