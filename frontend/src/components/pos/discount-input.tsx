"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { noSpinner } from "@/utils/pos";


type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

// `id` is required because desktop and mobile checkout can both be mounted.
export function DiscountInput({ id, value, onChange, compact = false }: Props) {
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <Label htmlFor={id}>Discount (%)</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={noSpinner}
      />
    </div>
  );
}