import { CreditCard } from "lucide-react";
import type { Order } from "@/types/order";

export default function PaymentInformation({ order }: { order: Order }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-muted-foreground" />
        <h2 className="font-semibold">Payment Information</h2>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Payment Status</span>
          <span
            className={
              order.payment === "Paid"
                ? "font-medium text-emerald-600 dark:text-emerald-400"
                : "font-medium text-amber-600 dark:text-amber-400"
            }
          >
            {order.payment}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Payment Method</span>
          <span className="font-medium">Not provided</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Transaction ID</span>
          <span className="font-medium">—</span>
        </div>
      </div>
    </section>
  );
}