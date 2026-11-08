"use client";

import { ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sale } from "@/hooks/pos/useNewSale";
import { CustomerSelect } from "./customer-select";
import { CartItemsDesktop } from "./cart-items";
import { DiscountInput } from "./discount-input";
import { PaymentMethods } from "./payment-methods";
import { OrderSummary } from "./order-summary";
import { CheckoutActions } from "./checkout-action";



/** Desktop (xl+) checkout card. Hidden on smaller screens. */
export function CheckoutPanel({ sale }: { sale: Sale }) {
  const isEmpty = sale.cart.length === 0;

  return (
    <Card className="hidden shadow-none xl:sticky xl:top-6 xl:block">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="size-5" />
            Current Checkout
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {sale.totalItems} items in your cart
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          disabled={isEmpty}
          onClick={sale.clearCart}
          aria-label="Clear cart"
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        <CustomerSelect value={sale.customer} onChange={sale.setCustomer} />

        <Separator />

        <CartItemsDesktop
          cart={sale.cart}
          totalItems={sale.totalItems}
          onUpdateQuantity={sale.updateQuantity}
          onRemove={sale.removeItem}
        />

        <Separator />

        <DiscountInput
          id="discount-desktop"
          value={sale.discount}
          onChange={sale.setDiscount}
        />

        <PaymentMethods value={sale.payment} onChange={sale.setPayment} />

        <OrderSummary
          subtotal={sale.subtotal}
          discountAmount={sale.discountAmount}
          discountValue={sale.discountValue}
          total={sale.total}
        />

        <CheckoutActions
          disabled={isEmpty}
          onHold={sale.holdOrder}
          onComplete={sale.checkout}
        />
      </CardContent>
    </Card>
  );
}