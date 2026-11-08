"use client";

import { Package } from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "MacBook Pro 14",
    sku: "LAP-001",
    quantity: 1,
    price: 1899,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    sku: "AUD-002",
    quantity: 2,
    price: 89,
  },
];

const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function OrderItems() {
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 5;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold">Order Items</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Products included in this order
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">SKU</th>
              <th className="px-5 py-3 text-center font-medium">Qty</th>
              <th className="px-5 py-3 text-right font-medium">Price</th>
              <th className="px-5 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {orderItems.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>

                <td className="px-5 py-4 text-muted-foreground">{item.sku}</td>
                <td className="px-5 py-4 text-center">{item.quantity}</td>
                <td className="px-5 py-4 text-right">{currency(item.price)}</td>
                <td className="px-5 py-4 text-right font-medium">
                  {currency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-5 py-4">
        <div className="ml-auto max-w-xs space-y-3 text-sm">
          <TotalRow label="Subtotal" value={currency(subtotal)} />
          <TotalRow label="Shipping" value={currency(shipping)} />
          <TotalRow label="Discount" value={`-${currency(discount)}`} />

          <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}