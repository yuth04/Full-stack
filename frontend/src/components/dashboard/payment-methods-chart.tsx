
"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  paymentData,
  formatCurrency,
  type Period,
} from "./dashboard-data";

interface Props {
  period: Period;
}

export default function PaymentMethodsChart({ period }: Props) {
  const data = paymentData[period];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="min-w-0 rounded-xl border bg-card p-5">
      <h3 className="font-semibold">Payment methods</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Payment breakdown for {period.toLowerCase()}
      </p>

      <div className="relative mt-4 h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                formatCurrency(Number(value)),
                "Amount",
              ]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">
            Total payments
          </span>
          <span className="mt-1 text-lg font-bold">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-4">
        {data.map((item) => {
          const percentage =
            total > 0 ? (item.value / total) * 100 : 0;

          return (
            <div key={item.name}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.value)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span className="w-12 text-right text-xs text-muted-foreground">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
