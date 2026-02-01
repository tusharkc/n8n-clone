"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { Rocket } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade Plan</DialogTitle>
          <DialogDescription>
            Unlock all features by upgrading your subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Alert>
            <Rocket className="h-4 w-4" />
            <AlertTitle>Pro Features Locked</AlertTitle>
            <AlertDescription>
              Upgrade to the Pro plan to access advanced workflows and higher
              limits.
            </AlertDescription>
          </Alert>
          <Button
            className="w-full"
            onClick={async () => {
              await (authClient as any).checkout({
                product: "n8n-clone-pro", // Using the slug defined in auth-client.ts
              });
            }}
          >
            Upgrade to Pro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
