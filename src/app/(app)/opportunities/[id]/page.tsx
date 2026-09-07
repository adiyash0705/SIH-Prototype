/**
 * Opportunity Detail Page - /opportunities/[id]
 * Full detail view with apply dialog and save action.
 * Uses React.use() to unwrap async params (Next.js 16 pattern).
 */
"use client";

import { useSyncExternalStore, useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Laptop,
  Calendar,
  Banknote,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchScore } from "@/components/opportunities/match-score";
import { ApplicationDialog } from "@/components/opportunities/application-dialog";
import {
  getSavedOpportunityIds,
  saveOpportunity,
  unsaveOpportunity,
  getApplications,
} from "@/lib/storage";
import { mockOpportunities } from "@/data/mock";
import { cn } from "@/lib/utils";
import type { WorkMode, Opportunity } from "@/types";

const WORK_MODE_LABELS: Record<WorkMode, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const TYPE_LABELS: Record<Opportunity["type"], string> = {
  internship: "Internship",
  research: "Research",
  project: "Project",
  fulltime: "Full-time",
};

function subscribeToStorage(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

// Named SSR snapshot functions — stable references for useSyncExternalStore.
function getServerSnapshotIds(): string[] { return []; }
function getServerSnapshotApps(): import("@/types").Application[] { return []; }

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OpportunityDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const opportunity = mockOpportunities.find((o) => o.id === id);
  if (!opportunity) notFound();
  // At this point opportunity is defined — pass to inner component
  return <OpportunityDetail opportunity={opportunity} />;
}

// ─── Inner component — receives guaranteed non-undefined opportunity ─

function OpportunityDetail({ opportunity }: { opportunity: Opportunity }) {
  const savedIds = useSyncExternalStore(
    subscribeToStorage,
    getSavedOpportunityIds,
    getServerSnapshotIds
  );
  const applications = useSyncExternalStore(
    subscribeToStorage,
    getApplications,
    getServerSnapshotApps
  );

  const [localSaved, setLocalSaved] = useState<boolean | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [justApplied, setJustApplied] = useState(false);

  const isSaved =
    localSaved !== null ? localSaved : savedIds.includes(opportunity.id);
  const isApplied =
    justApplied ||
    applications.some((a) => a.opportunityId === opportunity.id);

  function handleSaveToggle() {
    if (isSaved) {
      unsaveOpportunity(opportunity.id);
      setLocalSaved(false);
    } else {
      saveOpportunity(opportunity.id);
      setLocalSaved(true);
    }
  }

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1100px]">
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-3.5" />
        Back to opportunities
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8 items-start">
        {/* Main content */}
        <div className="space-y-8 min-w-0">
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
                  {TYPE_LABELS[opportunity.type]}
                </span>
                {opportunity.featured && (
                  <span className="text-[11px] font-medium text-accent bg-accent/10 rounded px-1.5 py-0.5">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {opportunity.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Building2 className="size-3.5 text-muted-foreground" />
                <p className="text-[14px] text-muted-foreground">
                  {opportunity.company}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Laptop className="size-3.5 shrink-0" />
                {WORK_MODE_LABELS[opportunity.workMode]}
              </span>
              {opportunity.duration && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" />
                  {opportunity.duration}
                </span>
              )}
              {opportunity.stipend && (
                <span className="flex items-center gap-1.5">
                  <Banknote className="size-3.5 shrink-0" />
                  {opportunity.stipend}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Match analysis
            </p>
            <MatchScore
              score={opportunity.matchScore}
              label={opportunity.matchLabel}
              reason={opportunity.matchReason}
            />
          </div>

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              About this opportunity
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {opportunity.description}
            </p>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Responsibilities
            </h2>
            <ul className="space-y-2">
              {opportunity.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Requirements
            </h2>
            <ul className="space-y-2">
              {opportunity.requirements.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md border border-border bg-muted/50 px-2.5 py-1 text-[12px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Action sidebar */}
        <div className="xl:sticky xl:top-8 space-y-3">
          <div className="rounded-xl border border-border bg-background p-5">
            {isApplied ? (
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="size-5 text-success" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Application submitted
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Your application has been recorded.
                </p>
              </div>
            ) : (
              <>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mb-2"
                  onClick={() => setApplyDialogOpen(true)}
                >
                  Apply now
                </Button>
                <p className="text-[11px] text-center text-muted-foreground/60">
                  Prototype only
                </p>
              </>
            )}
          </div>

          <Button
            variant="outline"
            className={cn(
              "w-full gap-2",
              isSaved && "border-accent/30 text-accent"
            )}
            onClick={handleSaveToggle}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="size-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="size-4" />
                Save opportunity
              </>
            )}
          </Button>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Details
            </p>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium text-foreground">
                  {TYPE_LABELS[opportunity.type]}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Mode</dt>
                <dd className="font-medium text-foreground">
                  {WORK_MODE_LABELS[opportunity.workMode]}
                </dd>
              </div>
              {opportunity.duration && (
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-medium text-foreground">
                    {opportunity.duration}
                  </dd>
                </div>
              )}
              {opportunity.stipend && (
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Stipend</dt>
                  <dd className="font-medium text-foreground">
                    {opportunity.stipend}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Posted</dt>
                <dd className="font-medium text-foreground">
                  {new Date(opportunity.postedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <ApplicationDialog
        open={applyDialogOpen}
        onOpenChange={setApplyDialogOpen}
        opportunityTitle={opportunity.title}
        company={opportunity.company}
        opportunityId={opportunity.id}
        onApplied={() => {
          setJustApplied(true);
          setApplyDialogOpen(false);
        }}
      />
    </div>
  );
}