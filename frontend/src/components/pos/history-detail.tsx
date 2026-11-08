
"use client";

import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Download,
  Receipt,
  UserRound,
  CreditCard,
  CalendarDays,
  Package,
  CheckCircle2,
  Clock,
  RotateCcw,
  MapPin,
  Mail,
  Phone,
  FileText,
  ShoppingBag,
  ArrowUpRight,
  Banknote,
  Hash,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sale = {
  id: "SAL-2026-001",
  date: "November 07, 2026",
  time: "10:30 AM",
  status: "Completed",
  paymentStatus: "Paid",
  paymentMethod: "KHQR",
  reference: "KHQR-REF-98231",

  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
  },

  items: [
    {
      id: 1,
      name: "MacBook Pro 14",
      sku: "LAP-001",
      category: "Laptop",
      quantity: 1,
      price: 1999,
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      sku: "AUD-001",
      category: "Accessories",
      quantity: 2,
      price: 349,
    },
    {
      id: 3,
      name: "Logitech MX Master 3S",
      sku: "MOU-001",
      category: "Accessories",
      quantity: 1,
      price: 99,
    },
  ],

  subtotal: 2796,
  discount: 100,
  tax: 0,
  shipping: 0,
  total: 2696,
  amountPaid: 2696,
  change: 0,
  notes: "Customer requested original packaging.",
};

const currency = (value: number) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const summaryCards = [
  {
    label: "Total Amount",
    value: currency(sale.total),
    description: "Final sale amount",
    icon: Receipt,
  },
  {
    label: "Payment Status",
    value: sale.paymentStatus,
    description: sale.paymentMethod,
    icon: CreditCard,
  },
  {
    label: "Items Sold",
    value: String(
      sale.items.reduce((sum, item) => sum + item.quantity, 0)
    ),
    description: `${sale.items.length} different products`,
    icon: Package,
  },
  {
    label: "Sale Date",
    value: "Nov 07, 2026",
    description: sale.time,
    icon: CalendarDays,
  },
];

export default function HistoryDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const saleId = params.id;

  const isCompleted = sale.status === "Completed";

  return (
    <div className="min-h-screen space-y-6 p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-3"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sales
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              Sale Details
            </h1>

            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className="rounded-full"
            >
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {sale.status}
            </Badge>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Sales</span>
            <span>/</span>
            <span>Transactions</span>
            <span>/</span>
            <span className="font-medium text-foreground">
              {String(saleId)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>

          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Return Items
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="shadow-none">
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-2.5">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Layout */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">

        {/* Left Content */}
        <div className="min-w-0 space-y-6">

          {/* Products */}
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Purchased Products
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Products included in this transaction.
                </p>
              </div>

              <Badge variant="secondary">
                {sale.items.length} Products
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="pb-3 font-medium">PRODUCT</th>
                      <th className="pb-3 font-medium">SKU</th>
                      <th className="pb-3 font-medium">PRICE</th>
                      <th className="pb-3 text-center font-medium">QTY</th>
                      <th className="pb-3 text-right font-medium">TOTAL</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sale.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </td>

                        <td className="py-4 text-muted-foreground">
                          {item.sku}
                        </td>

                        <td className="py-4 whitespace-nowrap">
                          {currency(item.price)}
                        </td>

                        <td className="py-4 text-center">
                          {item.quantity}
                        </td>

                        <td className="py-4 text-right font-semibold whitespace-nowrap">
                          {currency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Separator className="my-5" />

              {/* Price Summary */}
              <div className="ml-auto max-w-sm space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currency(sale.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-destructive">
                    -{currency(sale.discount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{currency(sale.tax)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{currency(sale.shipping)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Grand Total</span>
                  <span className="text-2xl font-bold">
                    {currency(sale.total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sale Notes */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Sale Notes
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  {sale.notes || "No notes added."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">
                Transaction Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                History of this sale.
              </p>
            </CardHeader>

            <CardContent>
              <div className="relative space-y-6 before:absolute before:bottom-3 before:left-[11px] before:top-2 before:w-px before:bg-border">

                <div className="relative flex gap-4">
                  <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sale Created</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {sale.date} · {sale.time}
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Received</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {sale.paymentMethod} · {currency(sale.amountPaid)}
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Inventory Updated</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Stock deductions recorded.
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          {/* Transaction Information */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Hash className="h-4 w-4" />
                Transaction Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Sale ID</span>
                <span className="font-medium">{sale.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{sale.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{sale.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge>{sale.status}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UserRound className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="font-semibold">{sale.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Customer
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3 text-sm">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="break-all">{sale.customer.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{sale.customer.phone}</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>{sale.customer.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium">{sale.paymentMethod}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Reference</span>
                <span className="max-w-[150px] truncate font-medium">
                  {sale.reference}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">
                  {currency(sale.amountPaid)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Change</span>
                <span className="font-medium">
                  {currency(sale.change)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="font-medium">Payment Status</span>
                <Badge className="bg-green-600 hover:bg-green-600">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  {sale.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
