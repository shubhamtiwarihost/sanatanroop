'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  titleSa: string;
  price: number;
  mrp: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sanatan_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sanatan_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items]);

  const addToCart = (product: any, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          titleEn: product.titleEn,
          titleHi: product.titleHi,
          titleSa: product.titleSa,
          price: product.price,
          mrp: product.mrp,
          imageUrl: product.imageUrl,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SANATAN10') {
      setCouponCode(clean);
      setDiscountPercent(10);
      return true;
    } else if (clean === 'GITA20') {
      setCouponCode(clean);
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        total,
        couponCode,
        applyCoupon,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
