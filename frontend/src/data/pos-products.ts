import type { Product } from "@/types/pos";

export const ELECTRONIC_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "LAP-001",
    name: 'MacBook Pro 14"',
    price: 1599,
    category: "Laptops",
    stock: 8,
  },
  {
    id: 2,
    sku: "AUD-002",
    name: "Wireless Noise-Canceling Earbuds",
    price: 149,
    category: "Audio",
    stock: 25,
  },
  {
    id: 3,
    sku: "ACC-003",
    name: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "Accessories",
    stock: 14,
  },
  {
    id: 4,
    sku: "ACC-004",
    name: "Ergonomic Wireless Mouse",
    price: 45.5,
    category: "Accessories",
    stock: 30,
  },
  {
    id: 5,
    sku: "WEA-005",
    name: "Fitness Smartwatch v2",
    price: 199,
    category: "Wearables",
    stock: 12,
  },
  {
    id: 6,
    sku: "ACC-006",
    name: "65W GaN Fast Charger",
    price: 35,
    category: "Accessories",
    stock: 50,
  },
  {
    id: 7,
    sku: "ACC-007",
    name: "20,000mAh Power Bank",
    price: 49.99,
    category: "Accessories",
    stock: 18,
  },
  {
    id: 8,
    sku: "AUD-008",
    name: "Bluetooth Desktop Speaker",
    price: 79,
    category: "Audio",
    stock: 10,
  },
];

export const CATEGORIES = [
  "All Items",
  "Laptops",
  "Audio",
  "Accessories",
  "Wearables",
];