export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Completed"
  | "Cancelled";

export type OrderFilter = "All" | OrderStatus;

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  payment: string;
  status: OrderStatus;
}
