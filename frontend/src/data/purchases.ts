import { Product, Supplier } from "@/types/purchase";

const suppliers: Supplier[] = [
  { id: 1, name: "Tech Distribution Co." },
  { id: 2, name: "Global Electronics" },
  { id: 3, name: "Digital Solutions Ltd." },
  { id: 4, name: "Smart Devices Cambodia" },
];

const products: Product[] = [
  {
    id: 1,
    sku: "LAP-001",
    productName: "MacBook Pro 14-inch",
    cost: 1800,
    stock: 10,
  },
  {
    id: 2,
    sku: "AUD-002",
    productName: "Sony WH-1000XM5",
    cost: 220,
    stock: 25,
  },
  {
    id: 3,
    sku: "MOU-003",
    productName: "Logitech MX Master 3S",
    cost: 65,
    stock: 40,
  },
  {
    id: 4,
    sku: "LAP-002",
    productName: "Dell XPS 15",
    cost: 1850,
    stock: 8,
  },
  {
    id: 5,
    sku: "KEY-002",
    productName: "Keychron K2 Keyboard",
    cost: 85,
    stock: 15,
  },
  {
    id: 6,
    sku: "MON-001",
    productName: "Dell UltraSharp 27-inch",
    cost: 650,
    stock: 6,
  },
];