/**
 * ApplicationDialog — Confirm + apply prototype.
 * No backend. Persists application state to localStorage.
 */
"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { applyToOpportunity } from "@/lib/storage";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityTitle: string;
  company: string;
  opportunityId: string;
  onApplied?: () => void;
}

export function ApplicationDialog({
  open,
  onOpenChange,
  opportunityTitle,
  company,
  opportunityId,
  onApplied,
}: ApplicationDialogProps) {
  const [state, setState] = useState<"confirm" | "success">("confirm");

  function handleConfirm() {
    applyToOpportunity(opportunityId);
    setState("success");
    onApplied?.();
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) setState("confirm");
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        {state === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply to {opportunityTitle}?</DialogTitle>
              <DialogDescription>
                Your Synapse profile and resume will be shared with{" "}
                <strong className="text-foreground font-medium">{company}</strong>.
                This is a prototype — no real application will be submitted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose
                render={<Button variant="outline" />}
              >
                Cancel
              </DialogClose>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleConfirm}
              >
                Confirm application
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-4 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="size-6 text-success" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                Application submitted!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your application to{" "}
                <strong className="text-foreground font-medium">
                  {opportunityTitle}
                </strong>{" "}
                has been recorded.
              </p>
            </div>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
