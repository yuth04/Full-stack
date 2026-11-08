"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const historyData = [
  { id: "TRX-9082", time: "Today, 02:45 PM", customer: "Walk-in Customer", items: 3, total: "$12.50", payment: "Cash", status: "Completed" },
  { id: "TRX-9081", time: "Today, 01:15 PM", customer: "Sarah Jenkins", items: 5, total: "$34.00", payment: "Credit Card", status: "Completed" },
  { id: "TRX-9080", time: "Yesterday, 05:20 PM", customer: "Michael Brown", items: 2, total: "$18.50", payment: "Debit Card", status: "Completed" },
  { id: "TRX-9079", time: "Yesterday, 11:10 AM", customer: "Walk-in Customer", items: 1, total: "$4.50", payment: "Cash", status: "Refunded" },
];

export default function SalesHistoryPage() {
  const router = useRouter();

  const handleViewSale = (saleId: string) => {
    router.push(`/pos/history/${saleId}`);
  };

  return (
    <div className="space-y-6 px-3 py-2">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Sales History
            </h1>
            <Badge variant="secondary" className="rounded-full">
              {historyData.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            View, search, and audit past store terminal transactions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => router.push("/pos/sales")}>
            <Plus className="size-4" />
            New sale
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="shadow-none">
        <CardContent className="space-y-4 pt-6">
          {/* Toolbar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search transaction ID..."
                className="pl-9"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>
          </div>

          {/* Sales Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {historyData.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell className="font-medium">
                      #{trx.id}
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {trx.time}
                    </TableCell>

                    <TableCell>{trx.customer}</TableCell>

                    <TableCell>{trx.items} items</TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {trx.payment}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          trx.status === "Completed"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }
                      >
                        {trx.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {trx.total}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewSale(trx.id)}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}