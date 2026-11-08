
import { Order } from "@/types/order";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface OrdersSummaryProps {
  orders: Order[];
}

const cards = [
  {
    title: "Total Orders",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: ShoppingBag,
    status: "All",
  },
  {
    title: "Pending",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Clock,
    status: "Pending",
  },
  {
    title: "Completed",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
    status: "Completed",
  },
  {
    title: "Cancelled",
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
    icon: XCircle,
    status: "Cancelled",
  },
] as const;

export default function OrdersSummary({
  orders,
}: OrdersSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const count =
          card.status === "All"
            ? orders.length
            : orders.filter((order) => order.status === card.status).length;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card p-4 shadow-sm transition-colors sm:p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                {card.title}
              </p>

              <div className={`rounded-lg p-2 ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              {count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
