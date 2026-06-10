"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartItem } from "@/types";

const CART_KEY = "megamart-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();

    const handler = () => refresh();
    window.addEventListener("cart-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("cart-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  const addItem = useCallback(
    (product: {
      id: string;
      name: string;
      nameAr: string | null;
      price: number;
      image: string;
      quantity?: number;
    }) => {
      const cart = readCart();
      const existing = cart.find((i) => i.id === product.id);
      const qtyToAdd = product.quantity || 1;
      
      const productData = {
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.image,
      };

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        cart.push({ ...productData, quantity: qtyToAdd });
      }
      writeCart(cart);
      refresh();
    },
    [refresh]
  );

  const removeItem = useCallback(
    (id: string) => {
      writeCart(readCart().filter((i) => i.id !== id));
      refresh();
    },
    [refresh]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const cart = readCart();
      const item = cart.find((i) => i.id === id);
      if (!item) return;
      if (quantity <= 0) {
        writeCart(cart.filter((i) => i.id !== id));
      } else {
        item.quantity = quantity;
        writeCart(cart);
      }
      refresh();
    },
    [refresh]
  );

  const clearCart = useCallback(() => {
    writeCart([]);
    refresh();
  }, [refresh]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    items,
    mounted,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
