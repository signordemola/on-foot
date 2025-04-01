"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckedOut(true);
      clearCart();
    }, 1000);
  };

  const shippingCost = 9.99;
  const taxes = totalPrice * 0.07;
  const orderTotal = totalPrice + shippingCost + taxes;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {!isCheckedOut ? (
        <form onSubmit={handleCheckout} className="space-y-8">
          <h1 className="text-3xl font-bold">Checkout</h1>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Card Number
                </label>
                <Input type="text" placeholder="4242 4242 4242 4242" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expiration
                  </label>
                  <Input type="text" placeholder="MM/YY" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <Input type="text" placeholder="123" required />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing || cartItems.length === 0}
            >
              {isProcessing ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
          <h2 className="text-2xl font-bold">Order Confirmed!</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              Thank you for your purchase of ${orderTotal.toFixed(2)}.
            </p>
            <p className="text-gray-600">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/products">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
