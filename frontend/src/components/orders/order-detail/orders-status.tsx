"use client";

import { useState } from "react";
import {
  Ban,
  Check,
  Clock3,
  Loader2,
  PackageCheck,
  RotateCcw,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import type { Order, OrderStatus } from "@/types/order";

interface UpdateOrderStatusProps {
  order: Order;
  onStatusUpdate?: (status: OrderStatus, note?: string) => void;
}

interface StatusConfig {
  value: OrderStatus;
  label: string;
  description: string;
  icon: LucideIcon;
}

// The happy path, in order. Cancelled sits outside the timeline.
const steps: StatusConfig[] = [
  {
    value: "Pending",
    label: "Pending",
    description: "Order received, waiting to be processed",
    icon: Clock3,
  },
  {
    value: "Processing",
    label: "Processing",
    description: "Items are being prepared and packed",
    icon: Truck,
  },
  {
    value: "Shipped",
    label: "Shipped",
    description: "On the way to the customer",
    icon: Truck,
  },
  {
    value: "Completed",
    label: "Completed",
    description: "Delivered and fulfilled",
    icon: PackageCheck,
  },
];

const cancelOption: StatusConfig = {
  value: "Cancelled",
  label: "Cancel order",
  description: "Stop this order and notify the customer",
  icon: Ban,
};

const pillStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Processing: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Shipped: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Cancelled: "bg-red-500/10 text-red-700 dark:text-red-400",
};

export default function UpdateOrderStatus({
  order,
  onStatusUpdate,
}: UpdateOrderStatusProps) {
  const [selected, setSelected] = useState<OrderStatus>(order.status);
  const [note, setNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const hasChanged = selected !== order.status;
  const selectedIndex = steps.findIndex((s) => s.value === selected);
  const isCancelSelected = selected === "Cancelled";

  const reset = () => {
    setSelected(order.status);
    setNote("");
  };

  const handleUpdate = async () => {
    if (!hasChanged || isUpdating) return;

    try {
      setIsUpdating(true);

      // Connect your actual API request here.
      // await orderService.updateStatus(order.id, selected, note);

      onStatusUpdate?.(selected, note.trim() || undefined);
      setNote("");
      toast.success(`Order marked as ${selected.toLowerCase()}.`);
    } catch {
      toast.error("Unable to update order status. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight">
            Track order
          </h2>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            Order #{order.id}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${pillStyles[order.status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {order.status}
        </span>
      </div>

      {/* Timeline */}
      <div
        role="radiogroup"
        aria-label="Order status"
        className="px-5 pb-2 pt-5"
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          const isActive = selected === step.value;
          const isDone = !isCancelSelected && i < selectedIndex;
          const isCurrent = order.status === step.value;

          return (
            <button
              key={step.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(step.value)}
              className="group relative flex w-full gap-4 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {/* Node + connector */}
              <div className="relative flex w-9 shrink-0 flex-col items-center">
                <div
                  className={`z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : isDone
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground group-hover:border-primary/50"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 transition-colors duration-300 ${
                      isDone ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>

              {/* Text */}
              <div className={`min-w-0 flex-1 ${isLast ? "pb-1" : "pb-6"}`}>
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isActive || isDone
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>

                  {isCurrent && (
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      Current
                    </span>
                  )}
                  {isActive && hasChanged && (
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cancel option */}
      <div className="px-5 pb-5">
        <button
          type="button"
          role="radio"
          aria-checked={isCancelSelected}
          onClick={() => setSelected(cancelOption.value)}
          className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-red-500/40 ${
            isCancelSelected
              ? "border-red-500/40 bg-red-500/10"
              : "border-dashed border-border hover:border-red-500/40 hover:bg-red-500/5"
          }`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              isCancelSelected
                ? "bg-red-500 text-white"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            <Ban className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {cancelOption.label}
            </p>
            <p className="text-sm text-muted-foreground">
              {cancelOption.description}
            </p>
          </div>

          {order.status === "Cancelled" && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              Current
            </span>
          )}
        </button>
      </div>

      {/* Footer: appears once something changes */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          hasChanged
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!hasChanged}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-border bg-muted/30 p-5">
            <p className="text-sm">
              Change status from{" "}
              <span className="font-semibold">{order.status}</span> to{" "}
              <span className="font-semibold">{selected}</span>
            </p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              maxLength={200}
              tabIndex={hasChanged ? 0 : -1}
              placeholder="Add a note for the order history (optional)"
              className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={reset}
                disabled={isUpdating}
                tabIndex={hasChanged ? 0 : -1}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Undo
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={!hasChanged || isUpdating}
                tabIndex={hasChanged ? 0 : -1}
                className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isCancelSelected
                    ? "bg-red-600 hover:bg-red-600/90"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : isCancelSelected ? (
                  "Cancel order"
                ) : (
                  "Save status"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
