
"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  salesData,
  formatCurrency,
  type Period,
} from "./dashboard-data";

interface Props {
  period: Period;
}

export default function SalesChart({ period }: Props) {
  const data = salesData[period];
  const total = data.reduce((sum, item) => sum + item.sales, 0);

  return (
    <section className="min-w-0 rounded-xl border bg-card p-5 xl:col-span-2">
      <div>
        <h3 className="font-semibold">Sales overview</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Revenue for {period.toLowerCase()}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-3xl font-bold tracking-tight">
          {formatCurrency(total)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Total sales in selected period
        </p>
      </div>

      <div className="mt-6 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={60}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(value: number) =>
                value >= 1000
                  ? `$${(value / 1000).toFixed(1)}k`
                  : `$${value}`
              }
            />
            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Sales",
              ]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--chart-1)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--chart-1)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
