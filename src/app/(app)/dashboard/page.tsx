/**
 * Dashboard — Student workspace.
 * Replaces the placeholder with a real student experience.
 * Client component: reads localStorage (saved/applied) reactively.
 */
"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  Eye,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Briefcase,
  Star,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, Divider } from "@/components/shared/section";
import { MatchScore } from "@/components/opportunities/match-score";
import {
  getSavedOpportunityIds,
  getApplications,
  saveOpportunity,
  unsaveOpportunity,
} from "@/lib/storage";
import {
  currentUser,
  mockOpportunities,
  mockApplications,
  mockUpcomingInterview,
} from "@/data/mock";
import { cn } from "@/lib/utils";
import type { ApplicationStatus, Opportunity } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function subscribeToStorage(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

// Stable SSR snapshots for useSyncExternalStore.
// Named functions (not inline arrows) so React always receives the same
// function reference and never creates a new [] on every call.
function getServerSnapshotIds(): string[] { return []; }
function getServerSnapshotApps(): import("@/types").Application[] { return []; }

function formatDaysAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

const APP_STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  review: "Under review",
  rejected: "Rejected",
  accepted: "Accepted",
};

const APP_STATUS_STYLES: Record<
  ApplicationStatus,
  { text: string; bg: string; dot: string }
> = {
  applied: {
    text: "text-muted-foreground",
    bg: "bg-muted",
    dot: "bg-muted-foreground",
  },
  shortlisted: {
    text: "text-success",
    bg: "bg-success/10",
    dot: "bg-success",
  },
  review: { text: "text-info", bg: "bg-info/10", dot: "bg-info" },
  rejected: {
    text: "text-destructive",
    bg: "bg-destructive/10",
    dot: "bg-destructive",
  },
  accepted: {
    text: "text-success",
    bg: "bg-success/10",
    dot: "bg-success",
  },
};

const PROFILE_COMPLETION = 72;
const MISSING_PROFILE_ITEMS = [
  "Add a professional summary",
  "Upload your resume",
  "Add 2 more skills",
];

// ─── Stat Card ──────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
}

function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xl font-semibold text-foreground tabular-nums mt-0.5">
          {value}
        </p>
        {sub && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Opportunity Row ───────────────────────────────────────

interface DashboardOppRowProps {
  opportunity: Opportunity;
  isSaved: boolean;
  onSaveToggle: (id: string, saving: boolean) => void;
}

function DashboardOppRow({
  opportunity,
  isSaved,
  onSaveToggle,
}: DashboardOppRowProps) {
  const typeLabel =
    opportunity.type === "internship"
      ? "Internship"
      : opportunity.type === "research"
        ? "Research"
        : opportunity.type === "project"
          ? "Project"
          : "Full-time";

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background hover:bg-muted/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 border border-border rounded px-1.5 py-0.5">
            {typeLabel}
          </span>
        </div>
        <p className="text-[14px] font-semibold text-foreground truncate">
          {opportunity.title}
        </p>
        <p className="text-[12px] text-muted-foreground">
          {opportunity.company} · {opportunity.location}
        </p>
        <div className="mt-2">
          <MatchScore
            score={opportunity.matchScore}
            label={opportunity.matchLabel}
            reason={opportunity.matchReason}
            size="sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onSaveToggle(opportunity.id, !isSaved)}
          aria-label={isSaved ? "Unsave" : "Save"}
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-lg border transition-colors",
            isSaved
              ? "border-accent/30 bg-accent/[0.08] text-accent"
              : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          )}
        >
          {isSaved ? (
            <BookmarkCheck className="size-3" />
          ) : (
            <Bookmark className="size-3" />
          )}
        </button>
        <Link href={`/opportunities/${opportunity.id}`}>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="size-3.5" />
            <span className="sr-only">View details</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const greeting = getGreeting();
  const firstName = currentUser.name.split(" ")[0];

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

  // Merge seed mock applications with any localStorage-applied ones
  const appliedIds = new Set([
    ...mockApplications.map((a) => a.opportunityId),
    ...applications.map((a) => a.opportunityId),
  ]);

  const totalApplied = appliedIds.size;
  const shortlisted = mockApplications.filter(
    (a) => a.status === "shortlisted"
  ).length;

  // Recommended: top 3 by match score, excluding already applied
  const recommended = [...mockOpportunities]
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((o) => !appliedIds.has(o.id))
    .slice(0, 3);

  const recentApplications = mockApplications.slice(0, 3).map((app) => ({
    ...app,
    opportunity: mockOpportunities.find((o) => o.id === app.opportunityId),
  }));

  const [localSaved, setLocalSaved] = useState<Set<string>>(
    new Set(savedIds)
  );

  function handleSaveToggle(id: string, saving: boolean) {
    if (saving) {
      saveOpportunity(id);
      setLocalSaved((prev) => new Set([...prev, id]));
    } else {
      unsaveOpportunity(id);
      setLocalSaved((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <div className="px-6 py-8 lg:px-8 lg:py-10 max-w-[1100px]">

      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {greeting}, {firstName}.
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening across your academic and professional journey.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">

        {/* ── Left column ─── */}
        <div className="space-y-10 min-w-0">

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={Briefcase} label="Applications" value={totalApplied} />
            <StatCard
              icon={Star}
              label="Shortlisted"
              value={shortlisted}
              sub="1 interview"
            />
            <StatCard
              icon={Bookmark}
              label="Saved"
              value={localSaved.size || savedIds.length || 6}
            />
            <StatCard icon={Eye} label="Profile views" value={18} sub="Last 7 days" />
          </div>

          <Divider />

          {/* Recommended */}
          <div>
            <SectionHeader
              title="Recommended for you"
              description="Opportunities that align with your skills and interests."
              action={
                <Link href="/opportunities">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-accent hover:text-accent"
                  >
                    View all
                    <ChevronRight className="size-3.5" />
                  </Button>
                </Link>
              }
            />
            <div className="space-y-3">
              {recommended.map((opp) => (
                <DashboardOppRow
                  key={opp.id}
                  opportunity={opp}
                  isSaved={localSaved.has(opp.id)}
                  onSaveToggle={handleSaveToggle}
                />
              ))}
            </div>
          </div>

          <Divider />

          {/* Application activity */}
          <div>
            <SectionHeader
              title="Recent applications"
              action={
                <Link href="/applications">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground hover:text-foreground"
                  >
                    View all
                    <ChevronRight className="size-3.5" />
                  </Button>
                </Link>
              }
            />
            <div className="space-y-px rounded-lg border border-border overflow-hidden">
              {recentApplications.map((app, i) => {
                if (!app.opportunity) return null;
                const styles = APP_STATUS_STYLES[app.status];
                return (
                  <div
                    key={app.opportunityId}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 bg-background hover:bg-muted/40 transition-colors",
                      i > 0 && "border-t border-border"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground truncate">
                        {app.opportunity.title}
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        {app.opportunity.company}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[11px] font-medium rounded-md px-2 py-0.5",
                          styles.bg,
                          styles.text
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0",
                            styles.dot
                          )}
                        />
                        {APP_STATUS_LABELS[app.status]}
                      </span>
                      <span className="text-[11px] text-muted-foreground/60 hidden sm:block">
                        {formatDaysAgo(app.appliedAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right column ─── */}
        <div className="space-y-6">

          {/* Profile completion */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold text-foreground">
                Profile strength
              </p>
              <span className="text-sm font-semibold text-accent tabular-nums">
                {PROFILE_COMPLETION}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${PROFILE_COMPLETION}%` }}
              />
            </div>
            <p className="text-[12px] text-muted-foreground mb-3">
              Complete your profile to improve opportunity matches.
            </p>
            <ul className="space-y-1.5 mb-4">
              {MISSING_PROFILE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  <span className="text-[12px] text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="sm" className="w-full text-[12px]">
              Complete profile
            </Button>
          </div>

          {/* Upcoming interview */}
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Upcoming
            </p>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Calendar className="size-3.5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-foreground">
                  Interview scheduled
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {mockUpcomingInterview.title} · {mockUpcomingInterview.company}
                </p>
                <p className="text-[12px] text-accent font-medium mt-1">
                  {mockUpcomingInterview.date} · {mockUpcomingInterview.time}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/opportunities/${mockUpcomingInterview.opportunityId}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-[12px] gap-1"
                >
                  View application
                  <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-border bg-background p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
              Quick actions
            </p>
            <div className="space-y-2">
              <Link href="/opportunities" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 text-[13px]"
                >
                  <Briefcase className="size-3.5" />
                  Explore opportunities
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-[13px]"
              >
                <BookOpen className="size-3.5" />
                Complete profile
              </Button>
              <Link href="/applications" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 text-[13px]"
                >
                  <CheckCircle2 className="size-3.5" />
                  View applications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
