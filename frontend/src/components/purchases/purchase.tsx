"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  ShoppingBag,
  Package,
  Wallet,
  TrendingUp,
  CalendarDays,
  Eye,
  MoreHorizontal,
  Download,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

import { AddPurchaseDialog } from "@/components/purchases/add-purchase-dialog";

import type {
  NewPurchaseData,
  PurchaseStatus,
  PaymentStatus,
} from "@/types/purchase";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Purchase = {
  id: string;
  supplierId: number;
  supplier: string;
  reference: string;
  date: string;
  items: number;
  amount: number;
  paymentStatus: PaymentStatus;
  status: PurchaseStatus;
};

const initialPurchases: Purchase[] = [
  {
    id: "PUR-2026-001",
    supplierId: 1,
    supplier: "Tech Distribution Co.",
    reference: "INV-TD-001",
    date: "2026-11-07",
    items: 12,
    amount: 12500,
    paymentStatus: "Paid",
    status: "Received",
  },
  {
    id: "PUR-2026-002",
    supplierId: 2,
    supplier: "Global Electronics",
    reference: "INV-GE-102",
    date: "2026-11-06",
    items: 8,
    amount: 8400,
    paymentStatus: "Partial",
    status: "Pending",
  },
  {
    id: "PUR-2026-003",
    supplierId: 3,
    supplier: "Digital Solutions Ltd.",
    reference: "INV-DS-203",
    date: "2026-11-05",
    items: 15,
    amount: 15800,
    paymentStatus: "Unpaid",
    status: "Ordered",
  },
  {
    id: "PUR-2026-004",
    supplierId: 1,
    supplier: "Tech Distribution Co.",
    reference: "INV-TD-002",
    date: "2026-11-03",
    items: 6,
    amount: 4200,
    paymentStatus: "Paid",
    status: "Received",
  },
  {
    id: "PUR-2026-005",
    supplierId: 4,
    supplier: "Smart Devices Cambodia",
    reference: "INV-SD-055",
    date: "2026-11-02",
    items: 10,
    amount: 6900,
    paymentStatus: "Unpaid",
    status: "Cancelled",
  },
  {
    id: "PUR-2026-006",
    supplierId: 2,
    supplier: "Global Electronics",
    reference: "INV-GE-103",
    date: "2026-11-01",
    items: 20,
    amount: 18900,
    paymentStatus: "Paid",
    status: "Received",
  },
];

const formatPrice = (price: number) =>
  `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusStyle(status: PurchaseStatus) {
  switch (status) {
    case "Received":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400";
    case "Pending":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400";
    case "Ordered":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400";
    case "Cancelled":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400";
  }
}

function getPaymentStyle(status: PaymentStatus) {
  switch (status) {
    case "Paid":
      return "text-emerald-600 dark:text-emerald-400";
    case "Partial":
      return "text-amber-600 dark:text-amber-400";
    case "Unpaid":
      return "text-muted-foreground";
  }
}

function getStatusIcon(status: PurchaseStatus) {
  switch (status) {
    case "Received":
      return <CheckCircle2 className="size-3.5" />;
    case "Pending":
      return <Clock className="size-3.5" />;
    case "Ordered":
      return <Truck className="size-3.5" />;
    case "Cancelled":
      return <XCircle className="size-3.5" />;
  }
}

export default function PurchasesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [openAddPurchase, setOpenAddPurchase] = useState(false);

  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);

  // Summary calculations
  const totalPurchases = purchases.length;

  const totalValue = purchases
    .filter((purchase) => purchase.status !== "Cancelled")
    .reduce((sum, purchase) => sum + purchase.amount, 0);

  const receivedPurchases = purchases.filter(
    (purchase) => purchase.status === "Received"
  ).length;

  const pendingPurchases = purchases.filter(
    (purchase) =>
      purchase.status === "Pending" || purchase.status === "Ordered"
  ).length;

  // Filter purchases
  const filteredPurchases = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return purchases.filter((purchase) => {
      const matchesSearch =
        purchase.id.toLowerCase().includes(keyword) ||
        purchase.supplier.toLowerCase().includes(keyword) ||
        purchase.reference.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || purchase.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        purchase.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [purchases, search, statusFilter, paymentFilter]);

  function viewPurchase(id: string) {
    router.push(`/purchases/${encodeURIComponent(id)}`);
  }

  // Create purchase in local React state
  function handleCreatePurchase(data: NewPurchaseData) {
    const supplierNames: Record<number, string> = {
      1: "Tech Distribution Co.",
      2: "Global Electronics",
      3: "Digital Solutions Ltd.",
      4: "Smart Devices Cambodia",
    };

    const nextNumber =
      purchases.reduce((max, purchase) => {
        const number = Number(purchase.id.split("-").at(-1));
        return Number.isFinite(number) ? Math.max(max, number) : max;
      }, 0) + 1;

    const newPurchase: Purchase = {
      id: `PUR-2026-${String(nextNumber).padStart(3, "0")}`,
      supplierId: data.supplierId,
      supplier: supplierNames[data.supplierId] ?? "Unknown Supplier",
      reference: data.reference || "N/A",
      date: data.date,
      items: data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      amount: data.total,
      paymentStatus:
        data.due === 0
          ? "Paid"
          : data.paid > 0
            ? "Partial"
            : "Unpaid",
      status: "Pending",
    };

    setPurchases((current) => [newPurchase, ...current]);

    toast.success("Purchase added to the list.");
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
  }

  function exportPurchases() {
    const headers = [
      "Purchase ID",
      "Supplier",
      "Reference",
      "Date",
      "Items",
      "Amount",
      "Payment Status",
      "Status",
    ];

    const rows = filteredPurchases.map((purchase) => [
      purchase.id,
      purchase.supplier,
      purchase.reference,
      purchase.date,
      purchase.items,
      purchase.amount,
      purchase.paymentStatus,
      purchase.status,
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "purchases.csv";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Purchases exported successfully.");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Purchases
            </h1>
            <Badge variant="secondary" className="rounded-full">
              {totalPurchases}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Manage supplier orders, incoming stock, and purchase payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={exportPurchases}>
            <Download className="size-4" />
            Export CSV
          </Button>

          <Button onClick={() => setOpenAddPurchase(true)}>
            <Plus className="size-4" />
            New Purchase
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="shadow-none">
          <CardContent className="flex items-start justify-between p-5">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Total Purchases
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {totalPurchases}
              </p>
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="size-3.5" />
                Purchase records
              </p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <ShoppingBag className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex items-start justify-between p-5">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Purchase Value
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {formatPrice(totalValue)}
              </p>
              <p className="text-xs text-muted-foreground">
                Excluding cancelled orders
              </p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
              <Wallet className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex items-start justify-between p-5">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Received Orders
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {receivedPurchases}
              </p>
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <CheckCircle2 className="size-3.5" />
                Successfully received
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
              <Package className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex items-start justify-between p-5">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Outstanding Orders
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {pendingPurchases}
              </p>
              <p className="flex items-center gap-1 text-xs text-amber-600">
                <Clock className="size-3.5" />
                Awaiting completion
              </p>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
              <Truck className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase history */}
      <Card className="overflow-hidden shadow-none">
        <div className="space-y-4 border-b p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Purchase History
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage all your supplier purchases.
            </p>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search purchase ID, supplier, or reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value ?? "All")}
              >
                <SelectTrigger className="h-10 w-full sm:w-[155px]">
                  <Filter className="mr-2 size-4 text-muted-foreground" />
                  <SelectValue placeholder="Purchase status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All statuses</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={paymentFilter}
                onValueChange={(value) => setPaymentFilter(value ?? "All")}
              >
                <SelectTrigger className="h-10 w-full sm:w-[145px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All payments</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">Purchase ID</th>
                <th className="px-5 py-3.5 font-medium">Supplier</th>
                <th className="px-5 py-3.5 font-medium">Date</th>
                <th className="px-5 py-3.5 text-center font-medium">Items</th>
                <th className="px-5 py-3.5 font-medium">Amount</th>
                <th className="px-5 py-3.5 font-medium">Payment</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredPurchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => viewPurchase(purchase.id)}
                      className="font-semibold text-primary hover:underline"
                    >
                      {purchase.id}
                    </button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Ref: {purchase.reference}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Truck className="size-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium">
                        {purchase.supplier}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-3.5" />
                      {formatDate(purchase.date)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center tabular-nums">
                    {purchase.items}
                  </td>

                  <td className="px-5 py-4 font-semibold tabular-nums">
                    {formatPrice(purchase.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={getPaymentStyle(purchase.paymentStatus)}>
                      {purchase.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={`gap-1 rounded-full font-medium ${getStatusStyle(
                        purchase.status
                      )}`}
                    >
                      {getStatusIcon(purchase.status)}
                      {purchase.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${purchase.id}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => viewPurchase(purchase.id)}
                        >
                          <Eye className="mr-2 size-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => window.print()}>
                          <FileText className="mr-2 size-4" />
                          Print Purchase
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/purchases/new?duplicate=${encodeURIComponent(
                                purchase.id
                              )}`
                            )
                          }
                        >
                          <Copy className="mr-2 size-4" />
                          Duplicate Purchase
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {filteredPurchases.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                      <ShoppingBag className="size-6 text-muted-foreground" />
                    </div>

                    <h3 className="mt-3 font-semibold">
                      No purchases found
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing your search or filters.
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-2 border-t px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            Showing {filteredPurchases.length} of {purchases.length} purchases
          </p>
          <p>Purchase Management</p>
        </div>
      </Card>

      {/* Add Purchase Dialog */}
      <AddPurchaseDialog
        open={openAddPurchase}
        onOpenChange={setOpenAddPurchase}
        onSubmit={handleCreatePurchase}
      />
    </div>
  );
}