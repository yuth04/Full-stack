
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { NewPurchaseData } from "@/types/purchase";

export type Product = {
  id: number;
  sku: string;
  name: string;
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

export type Supplier = {
  id: number;
  name: string;
};

// Temporary mock data
// Replace with API data when connecting your backend.
export const suppliers: Supplier[] = [
  { id: 1, name: "Tech Distribution Co." },
  { id: 2, name: "Global Electronics" },
  { id: 3, name: "Digital Solutions Ltd." },
  { id: 4, name: "Smart Devices Cambodia" },
];

export const products: Product[] = [
  {
    id: 1,
    sku: "LAP-001",
    name: "MacBook Pro 14-inch",
    cost: 1800,
    stock: 10,
  },
  {
    id: 2,
    sku: "AUD-002",
    name: "Sony WH-1000XM5",
    cost: 220,
    stock: 25,
  },
  {
    id: 3,
    sku: "MOU-003",
    name: "Logitech MX Master 3S",
    cost: 65,
    stock: 40,
  },
  {
    id: 4,
    sku: "LAP-002",
    name: "Dell XPS 15",
    cost: 1850,
    stock: 8,
  },
  {
    id: 5,
    sku: "KEY-002",
    name: "Keychron K2 Keyboard",
    cost: 85,
    stock: 15,
  },
  {
    id: 6,
    sku: "MON-001",
    name: "Dell UltraSharp 27-inch",
    cost: 650,
    stock: 6,
  },
];

const today = new Date().toISOString().split("T")[0];

type UseAddPurchaseProps = {
  onSubmit?: (data: NewPurchaseData) => void;
  onSuccess?: () => void;
};

export function useAddPurchase({
  onSubmit,
  onSuccess,
}: UseAddPurchaseProps = {}) {
  const [supplierId, setSupplierId] = useState("");
  const [reference, setReference] = useState("");
  const [date, setDate] = useState(today);
  const [expectedDate, setExpectedDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

  const [shipping, setShipping] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [paid, setPaid] = useState("0");
  const [notes, setNotes] = useState("");

  const [search, setSearch] = useState("");
  const [items, setItems] = useState<PurchaseItem[]>([]);

  // Calculations
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.cost * item.quantity,
        0
      ),
    [items]
  );

  const shippingAmount = Math.max(0, Number(shipping) || 0);
  const discountAmount = Math.max(0, Number(discount) || 0);
  const paidAmount = Math.max(0, Number(paid) || 0);

  const total = Math.max(
    0,
    subtotal + shippingAmount - discountAmount
  );

  const due = Math.max(0, total - paidAmount);

  // Product search
  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return [];

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.sku.toLowerCase().includes(keyword)
    );
  }, [search]);

  // Add product
  const addProduct = (product: Product) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.productId === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          cost: product.cost,
          quantity: 1,
        },
      ];
    });

    setSearch("");
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) return;

    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Update unit cost
  const updateCost = (productId: number, cost: number) => {
    if (!Number.isFinite(cost) || cost < 0) return;

    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, cost }
          : item
      )
    );
  };

  // Remove product
  const removeProduct = (productId: number) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    );
  };

  // Reset form
  const resetForm = () => {
    setSupplierId("");
    setReference("");
    setDate(today);
    setExpectedDate("");
    setPaymentMethod("Bank Transfer");
    setShipping("0");
    setDiscount("0");
    setPaid("0");
    setNotes("");
    setSearch("");
    setItems([]);
  };

  // Submit purchase
  const handleSubmit = () => {
    if (!supplierId) {
      toast.error("Please select a supplier.");
      return;
    }

    if (items.length === 0) {
      toast.error("Please add at least one product.");
      return;
    }

    if (expectedDate && expectedDate < date) {
      toast.error("Expected delivery date cannot be before purchase date.");
      return;
    }

    if (discountAmount > subtotal + shippingAmount) {
      toast.error("Discount cannot exceed the subtotal and shipping.");
      return;
    }

    if (paidAmount > total) {
      toast.error("Paid amount cannot exceed the purchase total.");
      return;
    }

    if (!onSubmit) {
      toast.info("Connect the purchase API to save this purchase.");
      return;
    }

    const purchaseData: NewPurchaseData = {
      supplierId: Number(supplierId),
      reference: reference.trim(),
      date,
      expectedDate,
      paymentMethod,
      shipping: shippingAmount,
      discount: discountAmount,
      paid: paidAmount,
      notes: notes.trim(),
      items,
      subtotal,
      total,
      due,
    };

    onSubmit(purchaseData);
    resetForm();
    onSuccess?.();
  };

  return {
    // State
    supplierId,
    setSupplierId,
    reference,
    setReference,
    date,
    setDate,
    expectedDate,
    setExpectedDate,
    paymentMethod,
    setPaymentMethod,
    shipping,
    setShipping,
    discount,
    setDiscount,
    paid,
    setPaid,
    notes,
    setNotes,
    search,
    setSearch,
    items,

    // Data
    suppliers,
    filteredProducts,

    // Calculations
    subtotal,
    total,
    paidAmount,
    due,

    // Actions
    addProduct,
    updateQuantity,
    updateCost,
    removeProduct,
    resetForm,
    handleSubmit,
  };
}
