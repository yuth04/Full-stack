"use client";

import { ShoppingCart, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomerSelect } from "./customer-select";
import { DiscountInput } from "./discount-input";
import { CartItemsMobile } from "./cart-items";
import { PaymentMethods } from "./payment-methods";
import { OrderSummary } from "./order-summary";
import { CheckoutActions } from "./checkout-action";
import { Sale } from "@/hooks/pos/useNewSale";


export function MobileCheckoutSheet({ sale }: { sale: Sale }) {
  const isEmpty = sale.cart.length === 0;

  return (
    <Sheet open={sale.checkoutOpen} onOpenChange={sale.setCheckoutOpen}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex h-[92dvh] flex-col gap-0 rounded-t-2xl p-0"
      >
        {/* Drag handle */}
        <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-muted" />

        {/* Header */}
        <SheetHeader className="flex-row items-center justify-between space-y-0 border-b px-4 py-4 text-left">
          <div>
            <SheetTitle className="flex items-center gap-2 text-base">
              <ShoppingCart className="size-5" />
              Current Checkout
              <Badge variant="secondary" className="rounded-full">
                {sale.totalItems}
              </Badge>
            </SheetTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Review your order before payment.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isEmpty}
              onClick={sale.clearCart}
              aria-label="Clear cart"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => sale.setCheckoutOpen(false)}
              aria-label="Close checkout"
            >
              <X className="size-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="grid grid-cols-2 gap-3">
            <CustomerSelect
              compact
              value={sale.customer}
              onChange={sale.setCustomer}
            />
            <DiscountInput
              compact
              id="discount-mobile"
              value={sale.discount}
              onChange={sale.setDiscount}
            />
          </div>

          <Separator />

          <CartItemsMobile
            cart={sale.cart}
            totalItems={sale.totalItems}
            onUpdateQuantity={sale.updateQuantity}
          />

          <Separator />

          <PaymentMethods
            compact
            value={sale.payment}
            onChange={sale.setPayment}
          />
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 space-y-3 border-t bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <OrderSummary
            variant="footer"
            subtotal={sale.subtotal}
            discountAmount={sale.discountAmount}
            discountValue={sale.discountValue}
            total={sale.total}
          />

          <CheckoutActions
            variant="footer"
            disabled={isEmpty}
            onHold={sale.holdOrder}
            onComplete={sale.checkout}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}