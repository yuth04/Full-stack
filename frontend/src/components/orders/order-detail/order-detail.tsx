"use client";

import { useMemo, useState } from "react";
import { Package, ReceiptText, ShoppingBag } from "lucide-react";

import { orders } from "@/data/order";
import type { OrderStatus } from "@/types/order";
import type { PaymentStatus } from "./payment-status";

import OrderDetailHeader from "./order-detail-header";
import OrderItems from "./order-items";
import OrderTimeline from "./order-timeline";
import CustomerInformation from "./customer-information";
import PaymentInformation from "./payment-information";
import OrderDetailSummary from "./order-detail-summary";
import OrderActions from "./order-actions";
import UpdateOrderStatus from "./orders-status";
import UpdatePaymentStatus from "./payment-status";

interface OrderDetailProps {
  orderId: string;
}

interface OrderOverride {
  status?: OrderStatus;
  payment?: PaymentStatus;
}

export default function OrderDetail({ orderId }: OrderDetailProps) {
  const [overrides, setOverrides] = useState<Record<string, OrderOverride>>({});

  const order = useMemo(() => {
    const found = orders.find((item) => item.id === orderId);

    if (!found) return undefined;

    return {
      ...found,
      ...overrides[found.id],
    };
  }, [orderId, overrides]);

  const handleStatusUpdate = (status: OrderStatus) => {
    setOverrides((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        status,
      },
    }));
  };

  const handlePaymentUpdate = (payment: PaymentStatus) => {
    setOverrides((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        payment,
      },
    }));
  };

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          Order not found
        </h2>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          This order does not exist or may have been removed. Please check the
          order ID and try again.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-3 py-5 sm:px-5 lg:px-7 lg:py-7">
        {/* Page Header */}
        <OrderDetailHeader order={order} />

        {/* Order Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Order overview</h2>
          </div>

          <OrderDetailSummary order={order} />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Left Content */}
          <div className="min-w-0 space-y-6 xl:col-span-8">
            {/* Order Items */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Ordered products</h2>
                </div>
              </div>

              <OrderItems />
            </section>

            {/* Order Timeline */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Order activity</h2>
              </div>

              <OrderTimeline order={order} />
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="min-w-0 space-y-5 xl:col-span-4">
            {/* Status Management */}
            <div className="space-y-4">
              <UpdateOrderStatus
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />

              <UpdatePaymentStatus
                order={order}
                onPaymentUpdate={handlePaymentUpdate}
              />
            </div>

            {/* Customer Details */}
            <CustomerInformation order={order} />

            {/* Payment Details */}
            <PaymentInformation order={order} />

            {/* Order Actions */}
            <OrderActions order={order} />
          </aside>
        </div>
      </div>
    </main>
  );
}
