
"use client";

import type { Period } from "./dashboard-data";

interface DashboardFiltersProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

const periods: Period[] = ["Today", "This Week", "This Month"];

export default function DashboardFilters({
  period,
  onPeriodChange,
}: DashboardFiltersProps) {
  return (
    <div
      className="inline-flex flex-wrap items-center gap-1 rounded-lg border bg-muted/40 p-1"
      aria-label="Filter dashboard by date"
    >
      {periods.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPeriodChange(item)}
          aria-pressed={period === item}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            period === item
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
