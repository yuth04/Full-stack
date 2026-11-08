"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customers } from "@/data/pos";
import { cn } from "@/lib/utils";


type Props = {
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

export function CustomerSelect({ value, onChange, compact = false }: Props) {
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <Label>Customer</Label>

      <Select
        value={value}
        items={customers}
        onValueChange={(v) => onChange(v ?? "walk-in")}
      >
        <SelectTrigger className={cn("w-full", compact ? "h-10" : "h-11")}>
          <SelectValue placeholder="Select customer" />
        </SelectTrigger>

        <SelectContent>
          {customers.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}