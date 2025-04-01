"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPageComponent() {
  const { cartItems, removeFromCart, clearCart, totalPrice, totalQuantity } =
    useCart();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <span className="bg-primary text-white rounded-full px-3 py-1 text-sm">
          {totalQuantity} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Button asChild variant="outline">
            <Link href="/products" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-6 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={160}
                  className="w-32 h-32 object-contain bg-gray-50 rounded-lg"
                />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.productId, item.color, item.size)
                      }
                      className="text-red-300 hover:text-red-600 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Size:</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {item.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Color:</span>
                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white border-t pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </h2>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              <div className="grid gap-4">
                <Button asChild size="lg" className="w-full h-12">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                <Button asChild variant="outline" className="w-full h-12">
                  <Link href="/products" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
