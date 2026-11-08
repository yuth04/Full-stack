"use client";

import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/pos";


type Props = {
  subtotal: number;
  discountAmount: number;
  discountValue: number;
  total: number;
  /** "panel" = desktop card, "footer" = mobile sticky footer */
  variant?: "panel" | "footer";
};

export function OrderSummary({
  subtotal,
  discountAmount,
  discountValue,
  total,
  variant = "panel",
}: Props) {
  if (variant === "footer") {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Discount ({discountAmount}%)</span>
            <span className="text-destructive">
              -{formatPrice(discountValue)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold tracking-tight">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl bg-muted/40 p-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Discount ({discountAmount}%)
        </span>
        <span className="text-destructive">-{formatPrice(discountValue)}</span>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="text-2xl font-bold tracking-tight">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}