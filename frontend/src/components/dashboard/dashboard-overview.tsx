
"use client";

import { useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";

import DashboardFilters from "./dashboard-filters";
import DashboardStats from "./dashboard-stats";
import SalesChart from "./sales-chart";
import PaymentMethodsChart from "./payment-methods-chart";
import QuickActions from "./quick-actions";
import RecentOrders from "./recent-orders";
import InventoryAlerts from "./inventory-alerts";
import type { Period } from "./dashboard-data";

export default function DashboardOverview() {
  const [period, setPeriod] = useState<Period>("Today");

  return (
    <div className="space-y-6">
      {/* Dashboard heading and shared date filter */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Store performance
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor sales, payments, orders, and inventory.
          </p>
        </div>

        <DashboardFilters
          period={period}
          onPeriodChange={setPeriod}
        />
      </section>

      {/* Statistics update with selected period */}
      <DashboardStats period={period} />

      {/* Both charts share the selected period */}
      <section className="grid min-w-0 gap-6 xl:grid-cols-3">
        <SalesChart period={period} />
        <PaymentMethodsChart period={period} />
      </section>

      <QuickActions />

      {/* Orders and inventory */}
      <section className="grid min-w-0 gap-6 xl:grid-cols-3">
        <RecentOrders />
        <InventoryAlerts />
      </section>

      {/* Footer reminder */}
      <section className="flex flex-col gap-3 rounded-xl border border-dashed p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Clock3 className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Keep your store running smoothly
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Review stock levels, orders, and returns regularly.
            </p>
          </div>
        </div>

        <Link
          href="/returns"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Review returns
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
