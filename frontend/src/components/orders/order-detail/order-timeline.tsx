import {
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import type { Order } from "@/types/order";

export default function OrderTimeline({ order }: { order: Order }) {
  const cancelled = order.status === "Cancelled";

  const steps = [
    {
      title: "Order Created",
      description: "The order was successfully created.",
      icon: CheckCircle2,
      active: true,
    },
    {
      title: "Payment",
      description:
        order.payment === "Paid"
          ? "Payment has been received."
          : "Waiting for payment.",
      icon: CreditCard,
      active: order.payment === "Paid",
    },
    {
      title: "Order Processing",
      description: "Order preparation and fulfillment.",
      icon: Truck,
      active: order.status === "Completed",
    },
    {
      title: cancelled ? "Order Cancelled" : "Order Completed",
      description: cancelled
        ? "This order has been cancelled."
        : "The order has been completed.",
      icon: cancelled ? XCircle : Package,
      active: order.status === "Completed" || cancelled,
    },
  ];

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Order Timeline</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Track the progress of this order
      </p>

      <div className="mt-6 space-y-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="relative flex gap-3">
              {index !== steps.length - 1 && (
                <div className="absolute left-4 top-9 h-full w-px bg-border" />
              )}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  step.active
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="pb-4">
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}