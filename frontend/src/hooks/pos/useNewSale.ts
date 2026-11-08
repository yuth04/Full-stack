"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  addHeldOrder,
  deleteHeldOrder,
  getHeldOrders,
} from "@/lib/pos-storage";
import { CartItem, Product, products } from "@/data/pos";


export function useNewSale() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [customer, setCustomer] = useState("walk-in");
  const [payment, setPayment] = useState("cash");
  const [discount, setDiscount] = useState("0");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeHeldOrderId, setActiveHeldOrderId] = useState<string | null>(
    null,
  );

  /* ------------------------- Restore a held order -------------------------- */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const heldOrderId = params.get("heldOrder");

    if (!heldOrderId) return;

    const heldOrder = getHeldOrders().find((o) => o.id === heldOrderId);

    if (!heldOrder) {
      toast.error("Held order not found.");
      return;
    }

    const restoredItems: CartItem[] = heldOrder.items
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;

        return {
          ...product,
          quantity: Math.min(item.quantity, product.stock),
        };
      })
      .filter((item): item is CartItem => item !== null);

    if (restoredItems.length === 0) {
      toast.error("Products from this held order are no longer available.");
      return;
    }

    setCart(restoredItems);
    setCustomer(heldOrder.customer);
    setPayment(heldOrder.paymentMethod);
    setDiscount(heldOrder.discount);
    setActiveHeldOrderId(heldOrder.id);

    toast.success("Held order restored.");

    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  // Close the mobile sheet automatically when the cart becomes empty.
  useEffect(() => {
    if (cart.length === 0) setCheckoutOpen(false);
  }, [cart.length]);

  /* ----------------------------- Calculations ------------------------------ */

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch = `${product.productName} ${product.sku}`
        .toLowerCase()
        .includes(term);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountAmount = Math.min(Math.max(Number(discount) || 0, 0), 100);
  const discountValue = subtotal * (discountAmount / 100);
  const total = subtotal - discountValue;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ----------------------------- Cart actions ------------------------------ */

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.error("Not enough stock available.");
          return current;
        }

        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (product.stock <= 0) {
        toast.error("This product is out of stock.");
        return current;
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: number, amount: number) {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== id) return item;

          const next = item.quantity + amount;

          if (next > item.stock) {
            toast.error("Maximum available stock reached.");
            return item;
          }

          return { ...item, quantity: next };
        })
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id: number) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
    setDiscount("0");
    setActiveHeldOrderId(null);
  }

  /* ------------------------------ Hold order ------------------------------- */

  function holdOrder() {
    if (cart.length === 0) {
      toast.error("Please add products before holding an order.");
      return;
    }

    const heldOrder = {
      id: activeHeldOrderId || crypto.randomUUID(),
      customer,
      paymentMethod: payment,
      discount,
      items: cart.map(
        ({ id, sku, productName, category, price, stock, quantity }) => ({
          id,
          sku,
          productName,
          category,
          price,
          stock,
          quantity,
        }),
      ),
      createdAt: new Date().toISOString(),
    };

    // Update an existing held order instead of creating a duplicate.
    if (activeHeldOrderId) deleteHeldOrder(activeHeldOrderId);

    addHeldOrder(heldOrder);

    clearCart();
    setCustomer("walk-in");
    setPayment("cash");
    setCheckoutOpen(false);

    toast.success("Order saved to Held Orders.");
    router.push("/pos/held-orders");
  }

  /* ------------------------------- Checkout -------------------------------- */

  function checkout() {
    if (cart.length === 0) {
      toast.error("Please add products to your cart.");
      return;
    }

    const saleData = {
      customer,
      paymentMethod: payment,
      items: cart.map(({ id, quantity, price }) => ({
        productId: id,
        quantity,
        unitPrice: price,
      })),
      subtotal,
      discount: discountValue,
      total,
    };

    // TODO: Connect to POST /api/v1/sales.
    // Only clear the cart and delete the held order after the API
    // confirms that the sale was completed.
    console.log("Sale:", saleData);

    toast.info("Connect your sales API to complete checkout.");
  }

  return {
    // state
    cart,
    search,
    category,
    customer,
    payment,
    discount,
    checkoutOpen,
    // setters
    setSearch,
    setCategory,
    setCustomer,
    setPayment,
    setDiscount,
    setCheckoutOpen,
    // derived
    filteredProducts,
    subtotal,
    discountAmount,
    discountValue,
    total,
    totalItems,
    // actions
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    holdOrder,
    checkout,
  };
}

export type Sale = ReturnType<typeof useNewSale>;