
"use client";

import { useCallback, useMemo, useState } from "react";
import { ELECTRONIC_PRODUCTS } from "@/data/pos-products";

import type {
  CartItem,
  HeldOrder,
  PaymentMethod,
  Product,
} from "@/types/pos";

import { showToast } from "@/lib/toast";

export function usePos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("khqr");

  const [cart, setCart] = useState<CartItem[]>([
    {
      ...ELECTRONIC_PRODUCTS[1],
      qty: 1,
    },
    {
      ...ELECTRONIC_PRODUCTS[5],
      qty: 2,
    },
  ]);

  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [saleCompleted, setSaleCompleted] = useState(false);

  // Filter products by search term and category
  const filteredProducts = useMemo(() => {
    return ELECTRONIC_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Items" ||
        product.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Cart financial calculations
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  }, [cart]);

  const tax = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.qty, 0);
  }, [cart]);

  // Add product to cart
  const addToCart = useCallback(
    (product: Product) => {
      if (saleCompleted) return;

      const existingItem = cart.find(
        (item) => item.id === product.id
      );

      const currentQty = existingItem?.qty ?? 0;

      if (currentQty >= product.stock) {
        showToast.error(
          `Cannot add more. Only ${product.stock} in stock.`
        );
        return;
      }

      setCart((previous) => {
        const existing = previous.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return previous.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }

        return [...previous, { ...product, qty: 1 }];
      });

      showToast.success(`Added ${product.name} to cart!`);
    },
    [cart, saleCompleted]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    (id: number, delta: number) => {
      if (saleCompleted) return;

      const targetItem = cart.find((item) => item.id === id);

      if (!targetItem) return;

      if (delta > 0 && targetItem.qty >= targetItem.stock) {
        showToast.error(
          `Cannot add more. Max stock limit reached (${targetItem.stock}).`
        );
        return;
      }

      setCart((previous) =>
        previous
          .map((item) => {
            if (item.id !== id) return item;

            const newQty = item.qty + delta;

            if (newQty <= 0) return null;

            return { ...item, qty: newQty };
          })
          .filter((item): item is CartItem => item !== null)
      );
    },
    [cart, saleCompleted]
  );

  // Remove product from cart
  const removeFromCart = useCallback(
    (id: number) => {
      if (saleCompleted) return;

      const removedItem = cart.find((item) => item.id === id);

      setCart((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (removedItem) {
        showToast.info(`Removed ${removedItem.name} from cart.`);
      }
    },
    [cart, saleCompleted]
  );

  // Clear cart
  const clearCart = useCallback(() => {
    if (saleCompleted || cart.length === 0) return;

    setCart([]);
    showToast.info("Cart cleared.");
  }, [cart.length, saleCompleted]);

  // Hold current order
  const holdOrder = useCallback(() => {
    if (cart.length === 0 || saleCompleted) return;

    const order: HeldOrder = {
      id: Date.now(),
      items: cart,
      paymentMethod,
      createdAt: new Date(),
    };

    setHeldOrders((previous) => [...previous, order]);
    setCart([]);
    setSaleCompleted(false);

    showToast.success("Order placed on hold.");
  }, [cart, paymentMethod, saleCompleted]);

  // Resume most recently held order
  const resumeOrder = useCallback(() => {
    if (heldOrders.length === 0) {
      showToast.error("No held orders available.");
      return;
    }

    if (cart.length > 0) {
      showToast.warning(
        "Clear or complete current cart before resuming an order."
      );
      return;
    }

    const lastOrder = heldOrders[heldOrders.length - 1];

    setCart(lastOrder.items);
    setPaymentMethod(lastOrder.paymentMethod);

    setHeldOrders((previous) =>
      previous.filter((order) => order.id !== lastOrder.id)
    );

    showToast.success("Resumed held order.");
  }, [cart.length, heldOrders]);

  // Handle checkout flow
  const handleCheckout = useCallback(() => {
    if (cart.length === 0 || saleCompleted) return;

    setSaleCompleted(true);

    showToast.info(
      `Processing payment via ${paymentMethod.toUpperCase()}...`
    );

    // Demo behavior only. Replace with an API request.
    setTimeout(() => {
      setCart([]);
      setSaleCompleted(false);

      showToast.success("Transaction completed successfully!");
    }, 1800);
  }, [cart.length, paymentMethod, saleCompleted]);

  return {
    searchQuery,
    setSearchQuery,

    selectedCategory,
    setSelectedCategory,

    paymentMethod,
    setPaymentMethod,

    filteredProducts,
    cart,
    heldOrders,
    saleCompleted,

    subtotal,
    tax,
    total,
    totalItems,

    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    holdOrder,
    resumeOrder,
    handleCheckout,
  };
}
