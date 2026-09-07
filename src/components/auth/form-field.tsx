/**
 * FormField — Label + Input + error message wrapper.
 * Consistent spacing and accessible error association.
 */
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string | null;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-foreground"
      >
        {label}
      </label>

      {children}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[12px] text-destructive leading-snug"
        >
          {error}
        </p>
      )}

      {/* Hint (shown only if no error) */}
      {!error && hint && (
        <p className="text-[12px] text-muted-foreground leading-snug">
          {hint}
        </p>
      )}
    </div>
  );
}

/**
 * FieldError — Standalone error display for non-field messages.
 */
export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-[13px] text-destructive"
    >
      {message}
    </div>
  );
}
