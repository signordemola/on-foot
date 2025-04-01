"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Product, PRODUCTS } from "@/constants/products";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchError, setSearchError] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const matches = PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(trimmedQuery) ||
        product.brand.toLowerCase().includes(trimmedQuery)
    );

    if (matches.length === 0) {
      setSearchError("No products found matching your search");
      setSearchResults([]);
    } else {
      setSearchError("");
      setSearchResults(matches);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults([]);
    }
  };
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
        <div
          className="flex-1 max-w-xl mx-8 hidden md:block"
          ref={searchContainerRef}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />

            {/* Search Results Dropdown */}
            {(searchResults.length > 0 || searchError) && (
              <div className="absolute top-full w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-96 overflow-y-auto">
                {searchError ? (
                  <div className="p-4 text-red-600 text-sm">{searchError}</div>
                ) : (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                      onClick={() => setSearchResults([])}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-gray-600">
                          {product.brand} · $
                          {product.defaultProductVariant.price}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </form>
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
