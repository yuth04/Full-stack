"use client";

import { CheckoutPanel } from "@/components/pos/checkout-pandel";
import { MobileCheckoutBar } from "@/components/pos/mobile-checkout-bar";
import { MobileCheckoutSheet } from "@/components/pos/mobile-checkout-sheet";
import { ProductCatalog } from "@/components/pos/product-catalog";
import { SaleHeader } from "@/components/pos/sale-header";
import { useNewSale } from "@/hooks/pos/useNewSale";



export default function NewSalePage() {
  const sale = useNewSale();

  return (
    <div className="space-y-6 p-4 pb-28 md:p-6 md:pb-28 xl:pb-6">
      <SaleHeader totalItems={sale.totalItems} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <ProductCatalog sale={sale} />
        <CheckoutPanel sale={sale} />
      </div>

      {/* Mobile checkout (hidden on xl+) */}
      <div className="xl:hidden">
        <MobileCheckoutBar
          totalItems={sale.totalItems}
          total={sale.total}
          onOpen={() => sale.setCheckoutOpen(true)}
        />
        <MobileCheckoutSheet sale={sale} />
      </div>
    </div>
  );
}