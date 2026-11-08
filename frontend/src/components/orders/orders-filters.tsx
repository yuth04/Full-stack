"use client";

import { Search, X } from "lucide-react";
import type { OrderFilter, OrderStatus } from "@/types/order";

interface OrdersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  status: OrderFilter;
  onStatusChange: (value: OrderFilter) => void;
  onReset: () => void;
}

export default function OrdersFilters({
  search,
  onSearchChange,
  date,
  onDateChange,
  status,
  onStatusChange,
  onReset,
}: OrdersFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search order ID or customer..."
          className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
      />

      {/* <button
        type="button"
        onClick={onReset}
        className="flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm transition hover:bg-muted"
      >
        <X size={16} />
        Reset
      </button> */}
    </div>
  );
}
