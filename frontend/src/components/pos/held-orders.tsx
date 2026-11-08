
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Trash2,
  Clock,
  ShoppingCart,
  Package,
  Search,
  Plus,
  ArrowLeft,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  getHeldOrders,
  deleteHeldOrder,
  type HeldOrder,
} from "@/lib/pos-storage";

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getOrderTotal(order: HeldOrder) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = Math.min(
    Math.max(Number(order.discount) || 0, 0),
    100
  );

  return subtotal - subtotal * (discount / 100);
}

function getTimeAgo(date: string) {
  const created = new Date(date).getTime();
  const now = Date.now();
  const difference = Math.max(0, now - created);

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString();
}

function getCustomerName(customer: string) {
  const customers: Record<string, string> = {
    "walk-in": "Walk-in Customer",
    "customer-1": "John Doe",
    "customer-2": "Jane Smith",
  };

  return customers[customer] || customer;
}

export default function HeldOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<HeldOrder[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrders(getHeldOrders());
    setIsLoading(false);
  }, []);

  const filteredOrders = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return orders.filter((order) => {
      return (
        order.id.toLowerCase().includes(searchTerm) ||
        getCustomerName(order.customer)
          .toLowerCase()
          .includes(searchTerm) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm)
        )
      );
    });
  }, [orders, search]);

  function handleDeleteOrder(id: string) {
    deleteHeldOrder(id);

    setOrders((current) =>
      current.filter((order) => order.id !== id)
    );

    toast.success("Held order deleted.");
  }

  function handleResumeOrder(id: string) {
    const orderExists = orders.some((order) => order.id === id);

    if (!orderExists) {
      toast.error("Held order not found.");
      return;
    }

    router.push(
      `/pos/sales?heldOrder=${encodeURIComponent(id)}`
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Held Orders
            </h1>

            <Badge variant="secondary">
              {orders.length}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage suspended carts and resume transactions when customers return.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push("/pos/sales")}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to New Sale
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Held Orders
              </p>
              <p className="mt-1 text-2xl font-bold">
                {orders.length}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <ShoppingCart className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Items
              </p>
              <p className="mt-1 text-2xl font-bold">
                {orders.reduce(
                  (sum, order) =>
                    sum +
                    order.items.reduce(
                      (itemSum, item) => itemSum + item.quantity,
                      0
                    ),
                  0
                )}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Package className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none sm:col-span-2 lg:col-span-1">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Held Order Value
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formatPrice(
                  orders.reduce(
                    (sum, order) => sum + getOrderTotal(order),
                    0
                  )
                )}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
              <Clock className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders */}
      <Card className="shadow-none">
        <CardHeader className="space-y-4">
          <div>
            <CardTitle className="text-lg">
              Suspended Transactions
            </CardTitle>
            <CardDescription>
              Search, resume, or remove held orders.
            </CardDescription>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search order ID, customer, or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading held orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed py-14 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <ShoppingCart className="size-6 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">
                {search ? "No matching orders" : "No held orders yet"}
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                {search
                  ? "Try searching with another order ID, customer, or product."
                  : "Orders you put on hold during checkout will appear here."}
              </p>

              {!search && (
                <Button
                  className="mt-4"
                  onClick={() => router.push("/pos/sales")}
                >
                  <Plus className="mr-2 size-4" />
                  Start New Sale
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map((order) => {
                const itemCount = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <Card
                    key={order.id}
                    className="overflow-hidden border shadow-none"
                  >
                    <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <Badge
                        variant="secondary"
                        className="shrink-0 gap-1"
                      >
                        <Clock className="size-3" />
                        {getTimeAgo(order.createdAt)}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Customer */}
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-muted p-2">
                          <UserRound className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {getCustomerName(order.customer)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Customer
                          </p>
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Items
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {itemCount} items
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Payment
                          </p>
                          <p className="mt-1 text-sm font-medium capitalize">
                            {order.paymentMethod}
                          </p>
                        </div>
                      </div>

                      {/* Product Preview */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          PRODUCTS
                        </p>

                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-2 text-sm"
                            >
                              <span className="min-w-0 truncate">
                                {item.name}
                              </span>

                              <span className="shrink-0 text-muted-foreground">
                                × {item.quantity}
                              </span>
                            </div>
                          ))}

                          {order.items.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{order.items.length - 3} more products
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between border-t pt-3">
                        <span className="text-sm text-muted-foreground">
                          Estimated Total
                        </span>

                        <span className="text-lg font-bold">
                          {formatPrice(getOrderTotal(order))}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-[44px_1fr] gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteOrder(order.id)}
                          aria-label="Delete held order"
                        >
                          <Trash2 className="size-4" />
                        </Button>

                        <Button
                          onClick={() => handleResumeOrder(order.id)}
                        >
                          <Play className="mr-2 size-4" />
                          Resume Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
