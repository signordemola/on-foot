"use client";

import { Product } from "@/constants/products";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  title: string;
  brand: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate totals directly from cartItems
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, color: string, size: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return updatedItems;
      }

      return [
        ...prevItems,
        {
          productId: product.id,
          quantity: 1,
          price: product.defaultProductVariant.price,
          color,
          size,
          title: product.title,
          brand: product.brand,
          image: product.mainImage,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex === -1) return prevItems;

      return [
        ...prevItems.slice(0, itemIndex),
        ...prevItems.slice(itemIndex + 1),
      ];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
