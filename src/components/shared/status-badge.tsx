/**
 * StatusBadge — Semantic status indicator.
 * Uses dot + label for inline status. Intentional, not decorative.
 */
import { cn } from "@/lib/utils";
import type { Status } from "@/types";

interface StatusBadgeProps {
  status: Status;
  showDot?: boolean;
  className?: string;
}

const statusConfig: Record<
  Status,
  { label: string; dotColor: string; textColor: string; bgColor: string }
> = {
  active: {
    label: "Active",
    dotColor: "bg-success",
    textColor: "text-success",
    bgColor: "bg-success/10",
  },
  pending: {
    label: "Pending",
    dotColor: "bg-warning",
    textColor: "text-warning",
    bgColor: "bg-warning/10",
  },
  inactive: {
    label: "Inactive",
    dotColor: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  review: {
    label: "Under Review",
    dotColor: "bg-info",
    textColor: "text-info",
    bgColor: "bg-info/10",
  },
  closed: {
    label: "Closed",
    dotColor: "bg-destructive",
    textColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export function StatusBadge({
  status,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("inline-block rounded-full w-1.5 h-1.5 flex-shrink-0", config.dotColor)}
          aria-hidden="true"
        />
      )}
      {config.label}
    </span>
  );
}

/**
 * StatusDot — minimal dot-only status for tables / lists.
 */
interface StatusDotProps {
  status: Status;
  label?: boolean;
  className?: string;
}

export function StatusDot({ status, label = false, className }: StatusDotProps) {
  const config = statusConfig[status];

  if (!label) {
    return (
      <span
        className={cn(
          "inline-block rounded-full w-2 h-2 flex-shrink-0",
          config.dotColor,
          className
        )}
        aria-label={config.label}
        title={config.label}
      />
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <span
        className={cn("inline-block rounded-full w-2 h-2 flex-shrink-0", config.dotColor)}
        aria-hidden="true"
      />
      <span className={cn("text-sm", config.textColor)}>{config.label}</span>
    </span>
  );
}
