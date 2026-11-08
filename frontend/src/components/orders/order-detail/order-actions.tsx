import Link from "next/link";
import type { Order } from "@/types/order";

interface OrderActionsProps {
  order: Order;
}

export default function OrderActions({ order }: OrderActionsProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Order Actions</h2>

      <div className="mt-4 space-y-2">
        <Link
          href={`/orders/${order.id}/edit`}
          className="flex w-full justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Edit Order
        </Link>

        <Link
          href="/orders"
          className="flex w-full justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Back to Orders
        </Link>
      </div>
    </section>
  );
}