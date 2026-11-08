export type Supplier = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  sku: string;
  productName: string;
  cost: number;
  stock: number;
};

export type PurchaseItem = {
  productId: number;
  sku: string;
  name: string;
  cost: number;
  quantity: number;
};

export type NewPurchaseData = {
  supplierId: number;
  reference: string;
  date: string;
  expectedDate: string;
  paymentMethod: string;
  shipping: number;
  discount: number;
  paid: number;
  notes: string;
  items: PurchaseItem[];
  subtotal: number;
  total: number;
  due: number;
};

export type AddPurchaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: NewPurchaseData) => void;
};
