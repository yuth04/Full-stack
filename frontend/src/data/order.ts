
import type { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ORD-2026-001",
    customer: "Dara Sok",
    email: "dara@example.com",
    date: "2026-11-08",
    items: 2,
    total: 1250,
    payment: "Paid",
    status: "Completed",
  },
  {
    id: "ORD-2026-002",
    customer: "Sokha Chan",
    email: "sokha@example.com",
    date: "2026-11-08",
    items: 1,
    total: 850,
    payment: "Unpaid",
    status: "Pending",
  },
  {
    id: "ORD-2026-003",
    customer: "Vicheka Lim",
    email: "vicheka@example.com",
    date: "2026-11-07",
    items: 3,
    total: 2100,
    payment: "Paid",
    status: "Completed",
  },
  {
    id: "ORD-2026-004",
    customer: "Pisey Kim",
    email: "pisey@example.com",
    date: "2026-11-07",
    items: 2,
    total: 650,
    payment: "Unpaid",
    status: "Cancelled",
  },
  {
    id: "ORD-2026-005",
    customer: "Borey Heng",
    email: "borey@example.com",
    date: "2026-11-06",
    items: 1,
    total: 450,
    payment: "Paid",
    status: "Pending",
  },
];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formatDate = (value: string) =>
  new Date(value + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
