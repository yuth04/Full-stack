"use client";

import { ChevronRight, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/pos";


type Props = {
  totalItems: number;
  total: number;
  onOpen: () => void;
};

/** Sticky bottom bar shown on mobile when the cart has items. */
export function MobileCheckoutBar({ totalItems, total, onOpen }: Props) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShoppingCart className="size-5" />
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "items"} in cart
            </p>
            <p className="truncate text-lg font-bold tracking-tight">
              {formatPrice(total)}
            </p>
          </div>
        </div>

        <Button className="h-12 shrink-0 rounded-xl px-5" onClick={onOpen}>
          View Cart
          <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}