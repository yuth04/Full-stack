"use client";

import { Check } from "lucide-react";

import { Label } from "@/components/ui/label";
import { paymentMethods } from "@/data/pos";


type Props = {
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

export function PaymentMethods({ value, onChange, compact = false }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <Label className="font-semibold">Payment Method</Label>
        <p className="mt-1 text-xs text-muted-foreground">
          {compact
            ? "Choose a payment method."
            : "Select how the customer will pay."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const selected = value === method.value;

          return compact ? (
            <button
              key={method.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(method.value)}
              className={`flex h-12 items-center gap-2 rounded-xl border px-3 text-left text-sm font-medium transition ${
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <Icon
                className={`size-4 shrink-0 ${
                  selected ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="truncate">{method.label}</span>
              {selected && (
                <Check className="ml-auto size-3.5 shrink-0 text-primary" />
              )}
            </button>
          ) : (
            <button
              key={method.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(method.value)}
              className={`relative flex min-w-0 items-center gap-2 rounded-xl border p-3 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{method.label}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {method.description}
                </p>
              </div>

              {selected && (
                <Check className="absolute right-2 top-2 size-3.5 text-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}