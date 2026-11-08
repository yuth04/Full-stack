"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Undo2,
  Wallet,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import type { Order } from "@/types/order";

export type PaymentStatus = "Unpaid" | "Paid" | "Refunded";

interface UpdatePaymentStatusProps {
  order: Order;
  onPaymentUpdate?: (payment: PaymentStatus) => void;
}

const paymentOptions: {
  value: PaymentStatus;
  label: string;
  description: string;
  icon: typeof Wallet;
  color: string;
  background: string;
  border: string;
}[] = [
  {
    value: "Unpaid",
    label: "Unpaid",
    description: "Payment has not been received",
    icon: Clock3,
    color: "text-amber-600 dark:text-amber-400",
    background: "bg-amber-500/10",
    border: "border-amber-500/40",
  },
  {
    value: "Paid",
    label: "Paid",
    description: "Payment successfully received",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-500/10",
    border: "border-emerald-500/40",
  },
  {
    value: "Refunded",
    label: "Refunded",
    description: "Payment has been refunded",
    icon: Undo2,
    color: "text-slate-600 dark:text-slate-300",
    background: "bg-slate-500/10",
    border: "border-slate-500/40",
  },
];

export default function UpdatePaymentStatus({
  order,
  onPaymentUpdate,
}: UpdatePaymentStatusProps) {
  const current = order.payment as PaymentStatus;

  const [selected, setSelected] = useState<PaymentStatus>(current);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setSelected(current);
  }, [current]);

  const hasChanged = selected !== current;

  const currentOption =
    paymentOptions.find((option) => option.value === current) ??
    paymentOptions[0];

  const selectedOption =
    paymentOptions.find((option) => option.value === selected) ??
    paymentOptions[0];

  const CurrentIcon = currentOption.icon;
  const SelectedIcon = selectedOption.icon;

  const handleSave = async () => {
    if (!hasChanged || isUpdating) return;

    if (selected === "Refunded" && current !== "Paid") {
      toast.error("Only paid orders can be marked as refunded.");
      return;
    }

    try {
      setIsUpdating(true);

      // Connect your actual payment API here.
      // await orderService.updatePayment(order.id, selected);

      onPaymentUpdate?.(selected);
      toast.success(`Payment status updated to ${selected}.`);
    } catch {
      toast.error("Unable to update payment status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CircleDollarSign className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Payment status
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Manage payment confirmation and refunds
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* Current status */}
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                CURRENT PAYMENT STATUS
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${currentOption.background} ${currentOption.color}`}
                >
                  <CurrentIcon className="h-4 w-4" />
                </span>

                <span className="text-lg font-semibold">{current}</span>
              </div>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${currentOption.background} ${currentOption.color}`}
            >
              Current
            </span>
          </div>
        </div>

        {/* Status selection */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Change payment status</p>
            <span className="text-xs text-muted-foreground">
              Select one option
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {paymentOptions.map((option) => {
              const Icon = option.icon;
              const isActive = selected === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSelected(option.value)}
                  disabled={isUpdating}
                  className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    isActive
                      ? `${option.border} ${option.background}`
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/40"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${option.background} ${option.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </span>

                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isActive && <Check className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Change preview */}
        {hasChanged && (
          <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Status change preview</p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="rounded-lg bg-muted px-3 py-2 text-sm font-medium">
                {current}
              </span>

              <div className="flex flex-1 items-center justify-center">
                <div className="h-px flex-1 bg-border" />
                <RotateCcw className="mx-2 h-4 w-4 text-muted-foreground" />
                <div className="h-px flex-1 bg-border" />
              </div>

              <span
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${selectedOption.background} ${selectedOption.color}`}
              >
                {selected}
              </span>
            </div>
          </div>
        )}

        {/* Refund warning */}
        {selected === "Refunded" && current === "Paid" && (
          <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />

            <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
              This records the refunded status only. You must process the actual
              refund through your payment provider before confirming it.
            </p>
          </div>
        )}

        {selected === "Paid" && current !== "Paid" && (
          <div className="flex gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

            <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-300">
              Confirm that the payment was successfully received before marking
              this order as paid.
            </p>
          </div>
        )}

        {/* Actions */}
        {hasChanged && (
          <div className="flex gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setSelected(current)}
              disabled={isUpdating}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={
                isUpdating || (selected === "Refunded" && current !== "Paid")
              }
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Save changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
