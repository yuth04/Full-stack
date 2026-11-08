
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { metricsData, type Period } from "./dashboard-data";

interface Props {
  period: Period;
}

const icons = {
  sales: Wallet,
  orders: ShoppingBag,
  average: Banknote,
  stock: Package,
};

export default function DashboardStats({ period }: Props) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricsData[period].map((metric) => {
        const Icon = icons[metric.icon];

        return (
          <div
            key={metric.title}
            className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/20"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {metric.title}
              </p>
              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-4 text-muted-foreground" />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight">
              {metric.value}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              {metric.positive ? (
                <ArrowUpRight className="size-3.5 text-emerald-600" />
              ) : (
                <ArrowDownRight className="size-3.5 text-amber-600" />
              )}
              <span
                className={
                  metric.positive
                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                    : "font-medium text-amber-600 dark:text-amber-400"
                }
              >
                {metric.change}
              </span>
              <span className="text-muted-foreground">
                {metric.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
