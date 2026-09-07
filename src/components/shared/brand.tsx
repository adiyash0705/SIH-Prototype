/**
 * Synapse Brand Mark
 * Text-based wordmark — understated, professional.
 * No complex logos. CSS-driven treatment only.
 */
import { cn } from "@/lib/utils";

interface BrandProps {
  size?: "sm" | "md" | "lg";
  showDescriptor?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    wordmark: "text-base font-semibold tracking-tight",
    descriptor: "text-[10px] tracking-widest",
    dot: "w-1 h-1",
  },
  md: {
    wordmark: "text-xl font-semibold tracking-tight",
    descriptor: "text-[11px] tracking-widest",
    dot: "w-1.5 h-1.5",
  },
  lg: {
    wordmark: "text-3xl font-semibold tracking-tight",
    descriptor: "text-xs tracking-widest",
    dot: "w-2 h-2",
  },
};

export function Brand({
  size = "md",
  showDescriptor = true,
  className,
}: BrandProps) {
  const styles = sizeMap[size];

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {/* Wordmark */}
      <div className="flex items-center gap-2">
        {/* Mark — geometric accent square */}
        <div
          className="flex-shrink-0 rounded-[4px] bg-foreground flex items-center justify-center"
          style={{ width: size === "lg" ? 28 : size === "md" ? 22 : 16, height: size === "lg" ? 28 : size === "md" ? 22 : 16 }}
          aria-hidden="true"
        >
          <div
            className="rounded-[2px] bg-background"
            style={{ width: size === "lg" ? 10 : size === "md" ? 8 : 6, height: size === "lg" ? 10 : size === "md" ? 8 : 6 }}
          />
        </div>

        <span className={cn("synapse-wordmark leading-none", styles.wordmark)}>
          Synapse
        </span>
      </div>

      {/* Descriptor */}
      {showDescriptor && (
        <p
          className={cn(
            "text-muted-foreground uppercase font-medium",
            styles.descriptor,
            size === "sm" ? "pl-6" : size === "md" ? "pl-8" : "pl-10"
          )}
        >
          Academia × Industry
        </p>
      )}
    </div>
  );
}
