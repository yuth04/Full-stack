"use client";

import { PauseCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  onHold: () => void;
  onComplete: () => void;
  variant?: "panel" | "footer";
};

export function CheckoutActions({
  disabled,
  onHold,
  onComplete,
  variant = "panel",
}: Props) {
  if (variant === "footer") {
    return (
      <div className="grid grid-cols-[1fr_2fr] gap-2">
        <Button
          variant="outline"
          className="h-12 rounded-xl"
          disabled={disabled}
          onClick={onHold}
        >
          <PauseCircle className="size-4" />
          Hold
        </Button>

        <Button
          className="h-12 rounded-xl text-base"
          disabled={disabled}
          onClick={onComplete}
        >
          Complete Sale
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" disabled={disabled} onClick={onHold}>
          <PauseCircle className="size-4" />
          Hold Order
        </Button>

        <Button disabled={disabled} onClick={onComplete}>
          Complete Sale
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Review items and payment before completing the sale.
      </p>
    </>
  );
}