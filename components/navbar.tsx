"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";
import { useCart } from "@/context/cart-context";
import Image from "next/image";

export default function Navbar() {
  const { totalQuantity } = useCart();

  return (
    <nav className="sticky top-0 bg-white z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={`/logo-new.png`}
              className="overflow-hidden object-cover "
              width={86}
              height={100}
              alt="logo"
            />
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <Input />
        </div>

        {/* Right Section - User & Cart */}
        <div className="flex items-center gap-4">
          <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-5 h-5" />
            <span className="sr-only">Account</span>
          </Link>

          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalQuantity}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
