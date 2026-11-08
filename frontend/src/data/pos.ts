import {
  Banknote,
  CreditCard,
  Headphones,
  Keyboard,
  Laptop,
  Mouse,
  Smartphone,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type Product = {
  id: number;
  sku: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
  icon: LucideIcon;
};

export type CartItem = Product & {
  quantity: number;
};
export const products: Product[] = [
  { id: 1, sku: "LAP-001", productName: "MacBook Pro 14", category: "Laptop", price: 1999, stock: 12, icon: Laptop },
  { id: 2, sku: "LAP-002", productName: "Dell XPS 15", category: "Laptop", price: 1499, stock: 3, icon: Laptop },
  { id: 3, sku: "LAP-003", productName: "ASUS ROG Zephyrus G14", category: "Laptop", price: 1599, stock: 8, icon: Laptop },
  { id: 4, sku: "AUD-001", productName: "Sony WH-1000XM5", category: "Accessories", price: 349, stock: 25, icon: Headphones },
  { id: 5, sku: "MOU-001", productName: "Logitech MX Master 3S", category: "Accessories", price: 99, stock: 15, icon: Mouse },
  { id: 6, sku: "KEY-001", productName: "Keychron K2", category: "Accessories", price: 89, stock: 20, icon: Keyboard },
];

export const categories = ["all", "Laptop", "Accessories"];

export const customers = [
  { value: "walk-in", label: "Walk-in Customer" },
  { value: "customer-1", label: "John Doe" },
  { value: "customer-2", label: "Jane Smith" },
];

export const paymentMethods = [
  { value: "cash", label: "Cash", description: "Physical cash", icon: Banknote },
  { value: "khqr", label: "KHQR", description: "Scan QR code", icon: Smartphone },
  { value: "aba", label: "ABA Pay", description: "ABA payment", icon: Smartphone },
  { value: "card", label: "Credit / Debit", description: "Bank card", icon: CreditCard },
];