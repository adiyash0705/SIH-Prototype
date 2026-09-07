/**
 * PageHeader — Per-page title + description + actions slot.
 * Used at the top of each page's content area.
 * Typography-first — no card wrapping.
 */
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        "pb-6 border-b border-border mb-8",
        className
      )}
    >
      {/* Title block */}
      <div className="space-y-1">
        {/* Optional badge above title */}
        {badge && <div>{badge}</div>}

        <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-snug">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-muted-foreground max-w-prose">
            {description}
          </p>
        )}
      </div>

      {/* Actions slot */}
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
