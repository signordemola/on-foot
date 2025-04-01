"use client";

import { Product } from "@/constants/products";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductPageDetailsProps {
  product: Product;
  similarProducts: Product[];
}

const ProductPageDetails = ({
  product,
  similarProducts,
}: ProductPageDetailsProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.defaultProductVariant.size
  );
  const [selectedColor, setSelectedColor] = useState(
    product.defaultProductVariant.color
  );

  return (
    <div>
      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image
              src={product.mainImage}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product.mainImage, product.hoverImage]
              .filter(Boolean)
              .map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img!}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/products" className="hover:text-primary">
                Products
              </Link>{" "}
              / <span className="text-gray-900">{product.title}</span>
            </nav>

            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-gray-500 mb-4">
              {product.brand}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">
                ${product.defaultProductVariant.price}
              </span>
              {product.rating && (
                <div className="ml-4 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{product.rating}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 min-w-0 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-primary scale-110"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <Select
                    value={selectedSize}
                    onValueChange={(value) => setSelectedSize(value)}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            onClick={() => addToCart(product, selectedColor, selectedSize)}
          >
            Add to Cart
          </Button>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <p className="text-gray-600">{product.blurb}</p>
            <div className="space-y-2">
              <p>
                <strong>Material:</strong> {product.material}
              </p>
              <p>
                <strong>Category:</strong> {product.productType}
              </p>
              <p>
                <strong>Suitable for:</strong> {product.categories.join(", ")}
              </p>
            </div>
          </div>

          {product.body?.features && (
            <div className="pt-6 border-t">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                {product.body.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products Section */}
      <section className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-48 mb-4">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:opacity-0 transition-opacity"
                  />
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={product.title}
                      fill
                      className="object-contain opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500">
                      {product.brand}
                    </h3>
                    <h2 className="text-xl font-bold mb-2 line-clamp-1">
                      {product.title}
                    </h2>
                  </div>
                  <span className="text-lg font-bold">
                    ${product.defaultProductVariant.price}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {product.colors.slice(0, 3).map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {product.rating && (
                  <div className="mt-4 flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{product.rating}</span>
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPageDetails;
