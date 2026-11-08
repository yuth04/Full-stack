export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  qty: number;
}

export type PaymentMethod = "cash" | "card" | "khqr";

export interface HeldOrder {
  id: number;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  createdAt: Date;
}