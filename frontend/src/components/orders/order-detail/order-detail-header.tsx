"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Cancelled: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function OrderDetailHeader({ order }: { order: Order }) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Order Details
          </h1>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
          >
            {order.status}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Order ID: <span className="font-medium text-foreground">{order.id}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <FileText className="h-4 w-4" />
          Download Invoice
        </button>
      </div>
    </div>
  );
}