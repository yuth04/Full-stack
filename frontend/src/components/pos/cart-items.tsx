"use client";

import { Minus, Package, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CartItem } from "@/data/pos";
import { formatPrice } from "@/utils/pos";

type ListProps = {
  cart: CartItem[];
  onUpdateQuantity: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
};

/* ----------------------------- Desktop list ------------------------------ */

export function CartItemsDesktop({
  cart,
  totalItems,
  onUpdateQuantity,
  onRemove,
}: ListProps & { totalItems: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Order Items</h3>
        <Badge variant="secondary">{totalItems} items</Badge>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-xl border border-dashed py-10 text-center">
          <ShoppingBag className="mx-auto mb-2 size-8 text-muted-foreground" />
          <p className="text-sm font-medium">Your cart is empty</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Select products to start a sale.
          </p>
        </div>
      ) : (
        <div className="max-h-[340px] space-y-4 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.productName}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.sku} · {formatPrice(item.price)} each
                  </p>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.productName}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </Button>

                  <span className="w-6 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8"
                    disabled={item.quantity >= item.stock}
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </Button>
                </div>

                <p className="text-sm font-bold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Mobile list ------------------------------ */

export function CartItemsMobile({
  cart,
  totalItems,
  onUpdateQuantity,
}: Omit<ListProps, "onRemove"> & { totalItems: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Order Items</h3>
        <span className="text-xs text-muted-foreground">
          {totalItems} items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-xl border border-dashed py-8 text-center">
          <ShoppingCart className="mx-auto mb-2 size-7 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        </div>
      ) : (
        <div className="divide-y rounded-xl border">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Package className="size-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} each
                </p>
                <p className="mt-1 text-sm font-bold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="icon"
                  variant="outline"
                  className="size-8"
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  aria-label={
                    item.quantity === 1
                      ? `Remove ${item.productName}`
                      : "Decrease quantity"
                  }
                >
                  {item.quantity === 1 ? (
                    <Trash2 className="size-3.5 text-destructive" />
                  ) : (
                    <Minus className="size-3.5" />
                  )}
                </Button>

                <span className="w-5 text-center text-sm font-semibold">
                  {item.quantity}
                </span>

                <Button
                  size="icon"
                  variant="outline"
                  className="size-8"
                  disabled={item.quantity >= item.stock}
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}