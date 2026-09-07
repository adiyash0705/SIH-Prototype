/**
 * OpportunityCard — Single opportunity in a list.
 * Contains match score, skills, save/view actions.
 */
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Laptop,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchScore } from "./match-score";
import { cn } from "@/lib/utils";
import type { Opportunity, WorkMode } from "@/types";

const TYPE_LABELS: Record<Opportunity["type"], string> = {
  internship: "Internship",
  research: "Research",
  project: "Project",
  fulltime: "Full-time",
};

const WORK_MODE_LABELS: Record<WorkMode, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  saved?: boolean;
  applied?: boolean;
  onSaveToggle?: (id: string, saved: boolean) => void;
}

export function OpportunityCard({
  opportunity,
  saved = false,
  applied = false,
  onSaveToggle,
}: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSaveToggle = useCallback(() => {
    const next = !isSaved;
    setIsSaved(next);
    onSaveToggle?.(opportunity.id, next);
  }, [isSaved, onSaveToggle, opportunity.id]);

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-background",
        "transition-shadow duration-150 hover:shadow-sm",
        opportunity.featured && "border-accent/30"
      )}
    >
      {/* Featured accent line */}
      {opportunity.featured && (
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-accent/60" />
      )}

      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
                {TYPE_LABELS[opportunity.type]}
              </span>
              {applied && (
                <span className="text-[11px] font-medium text-success bg-success/10 rounded px-1.5 py-0.5">
                  Applied
                </span>
              )}
            </div>
            <h3 className="text-[15px] font-semibold text-foreground leading-snug">
              {opportunity.title}
            </h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {opportunity.company}
            </p>
          </div>

          {/* Save button */}
          <button
            type="button"
            onClick={handleSaveToggle}
            aria-label={isSaved ? "Unsave opportunity" : "Save opportunity"}
            className={cn(
              "shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-colors",
              isSaved
                ? "border-accent/30 bg-accent/[0.08] text-accent"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="size-3.5" />
            ) : (
              <Bookmark className="size-3.5" />
            )}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap text-[12px] text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="size-3 shrink-0" />
            {opportunity.location}
          </span>
          <span className="flex items-center gap-1">
            <Laptop className="size-3 shrink-0" />
            {WORK_MODE_LABELS[opportunity.workMode]}
          </span>
          {opportunity.duration && (
            <span className="flex items-center gap-1">
              <Calendar className="size-3 shrink-0" />
              {opportunity.duration}
            </span>
          )}
        </div>

        {/* Match score */}
        <div className="mb-4">
          <MatchScore
            score={opportunity.matchScore}
            label={opportunity.matchLabel}
            reason={opportunity.matchReason}
          />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {opportunity.tags.length > 4 && (
            <span className="inline-block rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{opportunity.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground/60">
            Posted {formatPostedDate(opportunity.postedAt)}
            {opportunity.stipend && ` · ${opportunity.stipend}`}
          </span>
          <Link href={`/opportunities/${opportunity.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-accent hover:text-accent hover:bg-accent/[0.08]"
            >
              View details
              <ArrowRight className="size-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatPostedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}
