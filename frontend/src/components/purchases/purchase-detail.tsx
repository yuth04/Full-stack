
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Printer,
  Truck,
  UserRound,
  Wallet,
  XCircle,
  MoreHorizontal,
  Building2,
  Hash,
  CircleDollarSign,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

type PurchaseStatus = "Received" | "Pending" | "Ordered" | "Cancelled";
type PaymentStatus = "Paid" | "Partial" | "Unpaid";

type PurchaseItem = {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  received: number;
  cost: number;
};

type Purchase = {
  id: string;
  reference: string;
  supplier: {
    name: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  expectedDate: string;
  status: PurchaseStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  items: PurchaseItem[];
  shipping: number;
  discount: number;
  paid: number;
  notes: string;
};

const purchases: Purchase[] = [
  {
    id: "PUR-2026-001",
    reference: "PO-TECH-001",
    supplier: {
      name: "Tech Distribution Co.",
      contact: "David Chen",
      email: "sales@techdistribution.com",
      phone: "+855 12 345 678",
      address: "Phnom Penh, Cambodia",
    },
    date: "November 05, 2026",
    expectedDate: "November 10, 2026",
    status: "Received",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: 1,
        sku: "LAP-001",
        name: "MacBook Pro 14-inch",
        category: "Laptops",
        quantity: 5,
        received: 5,
        cost: 1800,
      },
      {
        id: 2,
        sku: "AUD-002",
        name: "Sony WH-1000XM5",
        category: "Headphones",
        quantity: 10,
        received: 10,
        cost: 220,
      },
      {
        id: 3,
        sku: "MOU-003",
        name: "Logitech MX Master 3S",
        category: "Accessories",
        quantity: 10,
        received: 10,
        cost: 65,
      },
    ],
    shipping: 150,
    discount: 100,
    paid: 12500,
    notes: "Please check all electronic items before adding them to inventory.",
  },
  {
    id: "PUR-2026-002",
    reference: "PO-GLOB-002",
    supplier: {
      name: "Global Electronics",
      contact: "Sarah Lee",
      email: "orders@globalelectronics.com",
      phone: "+855 98 765 432",
      address: "Chamkarmon, Phnom Penh, Cambodia",
    },
    date: "November 06, 2026",
    expectedDate: "November 12, 2026",
    status: "Pending",
    paymentStatus: "Partial",
    paymentMethod: "Cash",
    items: [
      {
        id: 1,
        sku: "MON-001",
        name: "Dell UltraSharp 27-inch",
        category: "Monitors",
        quantity: 8,
        received: 0,
        cost: 650,
      },
      {
        id: 2,
        sku: "KEY-002",
        name: "Keychron K2 Keyboard",
        category: "Accessories",
        quantity: 10,
        received: 0,
        cost: 85,
      },
    ],
    shipping: 100,
    discount: 0,
    paid: 3000,
    notes: "Supplier confirmed the order. Waiting for delivery.",
  },
  {
    id: "PUR-2026-003",
    reference: "PO-DIGI-003",
    supplier: {
      name: "Digital Solutions Ltd.",
      contact: "Michael Tan",
      email: "contact@digitalsolutions.com",
      phone: "+855 10 222 333",
      address: "Sen Sok, Phnom Penh, Cambodia",
    },
    date: "November 04, 2026",
    expectedDate: "November 15, 2026",
    status: "Ordered",
    paymentStatus: "Unpaid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: 1,
        sku: "TAB-001",
        name: "iPad Air",
        category: "Tablets",
        quantity: 10,
        received: 0,
        cost: 780,
      },
      {
        id: 2,
        sku: "PEN-001",
        name: "Apple Pencil Pro",
        category: "Accessories",
        quantity: 10,
        received: 0,
        cost: 120,
      },
    ],
    shipping: 200,
    discount: 0,
    paid: 0,
    notes: "Order has been placed with the supplier.",
  },
  {
    id: "PUR-2026-004",
    reference: "PO-TECH-004",
    supplier: {
      name: "Tech Distribution Co.",
      contact: "David Chen",
      email: "sales@techdistribution.com",
      phone: "+855 12 345 678",
      address: "Phnom Penh, Cambodia",
    },
    date: "November 02, 2026",
    expectedDate: "November 04, 2026",
    status: "Received",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: 1,
        sku: "AUD-003",
        name: "AirPods Pro 2",
        category: "Audio",
        quantity: 20,
        received: 20,
        cost: 180,
      },
    ],
    shipping: 100,
    discount: 0,
    paid: 3700,
    notes: "All items received and inspected.",
  },
  {
    id: "PUR-2026-005",
    reference: "PO-SMART-005",
    supplier: {
      name: "Smart Devices Cambodia",
      contact: "John Smith",
      email: "info@smartdevices.com",
      phone: "+855 15 444 555",
      address: "Tuol Kork, Phnom Penh, Cambodia",
    },
    date: "October 30, 2026",
    expectedDate: "November 05, 2026",
    status: "Cancelled",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    items: [
      {
        id: 1,
        sku: "CAM-001",
        name: "Sony Alpha Camera",
        category: "Cameras",
        quantity: 5,
        received: 0,
        cost: 900,
      },
    ],
    shipping: 100,
    discount: 0,
    paid: 0,
    notes: "Purchase cancelled due to supplier availability.",
  },
  {
    id: "PUR-2026-006",
    reference: "PO-GLOB-006",
    supplier: {
      name: "Global Electronics",
      contact: "Sarah Lee",
      email: "orders@globalelectronics.com",
      phone: "+855 98 765 432",
      address: "Chamkarmon, Phnom Penh, Cambodia",
    },
    date: "October 28, 2026",
    expectedDate: "November 02, 2026",
    status: "Received",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      {
        id: 1,
        sku: "LAP-002",
        name: "Dell XPS 15",
        category: "Laptops",
        quantity: 10,
        received: 10,
        cost: 1850,
      },
    ],
    shipping: 400,
    discount: 0,
    paid: 18900,
    notes: "Received in good condition.",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

function StatusBadge({ status }: { status: PurchaseStatus }) {
  const styles: Record<PurchaseStatus, string> = {
    Received: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Ordered: "border-blue-200 bg-blue-50 text-blue-700",
    Cancelled: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status === "Received" && <CheckCircle2 className="mr-1 h-3.5 w-3.5" />}
      {status === "Pending" && <Clock className="mr-1 h-3.5 w-3.5" />}
      {status === "Ordered" && <Truck className="mr-1 h-3.5 w-3.5" />}
      {status === "Cancelled" && <XCircle className="mr-1 h-3.5 w-3.5" />}
      {status}
    </Badge>
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Partial: "border-amber-200 bg-amber-50 text-amber-700",
    Unpaid: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

export default function PurchaseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const purchase = useMemo(
    () => purchases.find((item) => item.id === params.id),
    [params.id]
  );

  if (!purchase) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Purchase not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This purchase may have been removed or the ID is incorrect.
        </p>
        <Button className="mt-5" onClick={() => router.push("/purchases")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Purchases
        </Button>
      </div>
    );
  }

  const subtotal = purchase.items.reduce(
    (total, item) => total + item.quantity * item.cost,
    0
  );

  const total = subtotal + purchase.shipping - purchase.discount;
  const due = Math.max(total - purchase.paid, 0);
  const totalQuantity = purchase.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const receivedQuantity = purchase.items.reduce(
    (sum, item) => sum + item.received,
    0
  );

  const paymentProgress =
    total > 0 ? Math.min((purchase.paid / total) * 100, 100) : 0;

  const handleAction = (action: string) => {
    toast.info(`${action} is not connected yet.`);
  };

  const canReceive =
    purchase.status === "Pending" || purchase.status === "Ordered";

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push("/purchases")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Purchases
        </Button>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {purchase.id}
              </h1>
              <StatusBadge status={purchase.status} />
              <PaymentBadge status={purchase.paymentStatus} />
            </div>
            <p className="text-sm text-muted-foreground">
              Review purchase information, supplier details, items, and payment.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Hash className="h-4 w-4" />
                {purchase.reference}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Created {purchase.date}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleAction("Print")}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

            <Button
              variant="outline"
              onClick={() => handleAction("Download invoice")}
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("Edit purchase")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Edit Purchase
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("Record payment")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Record Payment
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("Duplicate purchase")}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Duplicate Purchase
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={purchase.status === "Cancelled"}
                  className="text-red-600 focus:text-red-600"
                  onClick={() => handleAction("Cancel purchase")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Purchase
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {canReceive && (
              <Button onClick={() => handleAction("Receive stock")}>
                <Truck className="mr-2 h-4 w-4" />
                Receive Stock
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Purchase Total</p>
              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(total)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Including shipping
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBagIcon />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {formatCurrency(purchase.paid)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {paymentProgress.toFixed(0)}% payment completed
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">
                {formatCurrency(due)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Remaining payment
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CircleDollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Items Received</p>
              <p className="mt-2 text-2xl font-bold">
                {receivedQuantity}
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  / {totalQuantity}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Total ordered quantity
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          {/* Supplier */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Supplier Information</CardTitle>
              <Badge variant="secondary">Supplier</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">
                    {purchase.supplier.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Contact: {purchase.supplier.contact}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="break-all">
                        {purchase.supplier.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" />
                      {purchase.supplier.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {purchase.supplier.address}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Purchased Items</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {purchase.items.length} products · {totalQuantity} units
                </p>
              </div>
              <Badge variant="secondary">
                {receivedQuantity}/{totalQuantity} Received
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-sm">
                  <thead>
                    <tr className="border-y bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Product</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Cost
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Ordered
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Received
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.sku} · {item.category}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {formatCurrency(item.cost)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span
                            className={
                              item.received === item.quantity
                                ? "font-medium text-emerald-600"
                                : "font-medium text-amber-600"
                            }
                          >
                            {item.received}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right font-semibold">
                          {formatCurrency(item.quantity * item.cost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-xl bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Receiving progress</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {receivedQuantity} of {totalQuantity} units received
                  </p>
                </div>
                <div className="w-full sm:max-w-[220px]">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {totalQuantity
                        ? Math.round((receivedQuantity / totalQuantity) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{
                        width: `${
                          totalQuantity
                            ? (receivedQuantity / totalQuantity) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Purchase Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {purchase.notes || "No notes added to this purchase."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6 xl:sticky xl:top-6">
          {/* Purchase summary */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {formatCurrency(purchase.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-emerald-600">
                  -{formatCurrency(purchase.discount)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Grand Total</span>
                <span className="text-xl font-bold">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="space-y-2 rounded-xl bg-muted/40 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(purchase.paid)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due</span>
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(due)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${paymentProgress}%` }}
                  />
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  {paymentProgress.toFixed(0)}% paid
                </p>
              </div>

              <div className="flex items-center gap-3 border-t pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium">
                    {purchase.paymentMethod}
                  </p>
                </div>
              </div>

              {due > 0 && purchase.status !== "Cancelled" && (
                <Button
                  className="w-full"
                  onClick={() => handleAction("Record payment")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Purchase information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                Purchase Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Purchase Date
                  </p>
                  <p className="mt-1 text-sm font-medium">{purchase.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Expected Delivery
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {purchase.expectedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Supplier</p>
                  <p className="mt-1 text-sm font-medium">
                    {purchase.supplier.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Reference Number
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {purchase.reference}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Purchase Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-5 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-border">
                <div className="relative flex gap-3">
                  <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-background">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Purchase created</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {purchase.date}
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-3">
                  <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-background">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Purchase recorded</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Reference: {purchase.reference}
                    </p>
                  </div>
                </div>

                {purchase.status === "Received" && (
                  <div className="relative flex gap-3">
                    <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-background">
                      <Package className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Stock received</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {receivedQuantity} units received
                      </p>
                    </div>
                  </div>
                )}

                {purchase.status === "Cancelled" && (
                  <div className="relative flex gap-3">
                    <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 ring-4 ring-background">
                      <XCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600">
                        Purchase cancelled
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Purchase was cancelled
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return <Package className="h-5 w-5" />;
}
