export type HeldOrder = {
  id: string;
  customer: string;
  paymentMethod: string;
  discount: string;
  items: {
    id: number;
    sku: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    quantity: number;
  }[];
  createdAt: string;
};

const STORAGE_KEY = "pos-held-orders";

export function getHeldOrders(): HeldOrder[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHeldOrders(orders: HeldOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function addHeldOrder(order: HeldOrder) {
  saveHeldOrders([...getHeldOrders(), order]);
}

export function deleteHeldOrder(id: string) {
  saveHeldOrders(getHeldOrders().filter((order) => order.id !== id));
}