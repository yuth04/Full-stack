import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Download,
} from "lucide-react";

export interface MetricItem {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

const defaultMetrics: MetricItem[] = [
  {
    title: "Total Sales Revenue",
    value: "$45,231.89",
    change: "+20.1% vs last month",
    icon: DollarSign,
  },
  {
    title: "Orders Completed",
    value: "2,350",
    change: "+12.4% vs last month",
    icon: CreditCard,
  },
  {
    title: "Average Order Value",
    value: "$124.50",
    change: "+3.2% vs last month",
    icon: TrendingUp,
  },
  {
    title: "New Paying Customers",
    value: "412",
    change: "+18.5% vs last month",
    icon: Users,
  },
];

interface SalesSummaryProps {
  metrics?: MetricItem[];
  onDownloadReport?: () => void;
}

export function SalesSummary({
  metrics = defaultMetrics,
  onDownloadReport,
}: SalesSummaryProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Sales Summary</h2>
          <p className="text-sm text-muted-foreground">
            Key revenue metrics and performance indicators.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onDownloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}