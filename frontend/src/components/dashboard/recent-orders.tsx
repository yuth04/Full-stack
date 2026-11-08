
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrency, recentOrders } from "./dashboard-data";

export default function RecentOrders() {
  return (
    <section className="min-w-0 rounded-xl border bg-card xl:col-span-2">
      <div className="flex items-center justify-between gap-3 border-b p-5">
        <div>
          <h3 className="font-semibold">Recent orders</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest transactions from your store
          </p>
        </div>
        <Link
          href="/orders"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/30 text-xs text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Payment</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/20">
                <td className="whitespace-nowrap px-5 py-4">
                  <Link href="/orders" className="font-medium hover:text-primary">
                    {order.id}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {order.date}
                  </p>
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  {order.customer}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                  {order.payment}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-medium">
                  {formatCurrency(order.amount)}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : order.status === "Pending"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          : "bg-red-500/10 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
