import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Package,
} from "lucide-react";
import type { Order } from "@/types/order";

export default function OrderDetailSummary({ order }: { order: Order }) {
  const cards = [
    {
      label: "Order Total",
      value: `$${order.total.toFixed(2)}`,
      icon: CreditCard,
    },
    {
      label: "Items",
      value: `${order.items} Items`,
      icon: Package,
    },
    {
      label: "Order Date",
      value: order.date,
      icon: CalendarDays,
    },
    {
      label: "Payment",
      value: order.payment,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>

            <p className="mt-3 text-xl font-bold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}