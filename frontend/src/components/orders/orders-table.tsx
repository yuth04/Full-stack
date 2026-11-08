
import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";

import { Order, OrderStatus } from "@/types/order";
import { formatCurrency } from "../dashboard/dashboard-data";
import { formatDate } from "@/data/order";

interface OrdersTableProps {
  orders: Order[];
}

const statusStyles: Record<OrderStatus, string> = {
  Pending:
    "bg-amber-500/10 text-amber-700 ring-amber-600/20 dark:text-amber-400",
  Completed:
    "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-400",
  Cancelled:
    "bg-red-500/10 text-red-700 ring-red-600/20 dark:text-red-400",
};

export default function OrdersTable({
  orders,
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-6 py-4 font-medium">Order ID</th>
            <th className="px-6 py-4 font-medium">Customer</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="px-6 py-4 font-medium">Items</th>
            <th className="px-6 py-4 font-medium">Total</th>
            <th className="px-6 py-4 font-medium">Payment</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="transition-colors hover:bg-muted/50"
            >
              <td className="px-6 py-4 font-semibold text-foreground">
                {order.id}
              </td>

              <td className="px-6 py-4">
                <p className="font-medium text-foreground">
                  {order.customer}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {order.email}
                </p>
              </td>

              <td className="px-6 py-4 text-muted-foreground">
                {formatDate(order.date)}
              </td>

              <td className="px-6 py-4 text-muted-foreground">
                {order.items}
              </td>

              <td className="px-6 py-4 font-semibold text-foreground">
                {formatCurrency(order.total)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`text-xs font-medium ${
                    order.payment === "Paid"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {order.payment}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <Link
                  href={`/orders/${order.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </Link>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center">
                <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="font-medium text-foreground">
                  No orders found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
