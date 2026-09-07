/**
 * MatchScore — Displays an opportunity match percentage.
 * Sophisticated but restrained. Accent treatment, not a gaudy chart.
 */
import { cn } from "@/lib/utils";

interface MatchScoreProps {
  score: number;
  label: string;
  reason?: string;
  size?: "sm" | "md";
  className?: string;
}

function getMatchColor(score: number): string {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-accent";
  if (score >= 55) return "text-warning";
  return "text-muted-foreground";
}

function getMatchBarColor(score: number): string {
  if (score >= 85) return "bg-success";
  if (score >= 70) return "bg-accent";
  if (score >= 55) return "bg-warning";
  return "bg-muted-foreground";
}

export function MatchScore({
  score,
  label,
  reason,
  size = "md",
  className,
}: MatchScoreProps) {
  const colorClass = getMatchColor(score);
  const barColorClass = getMatchBarColor(score);

  if (size === "sm") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className={cn("text-sm font-semibold tabular-nums", colorClass)}>
          {score}%
        </span>
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline gap-1.5">
        <span className={cn("text-base font-semibold tabular-nums", colorClass)}>
          {score}%
        </span>
        <span className="text-[12px] font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full", barColorClass)}
          style={{ width: `${score}%` }}
          aria-hidden="true"
        />
      </div>
      {reason && (
        <p className="text-[11px] text-muted-foreground leading-snug">
          {reason}
        </p>
      )}
    </div>
  );
}
