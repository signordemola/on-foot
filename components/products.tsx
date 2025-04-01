"use client";

import { Product, PRODUCTS } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductCardProps {
  product: Product;
}

export default function ProductsPage() {
  const brands = ["All", ...new Set(PRODUCTS.map((product) => product.brand))];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Our Collection</h1>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex-wrap h-auto p-1 bg-transparent gap-2">
          {brands.map((brand) => (
            <TabsTrigger
              key={brand}
              value={brand}
              className="data-[state=active]:bg-primary cursor-pointer data-[state=active]:text-white px-4 py-2 rounded-full border border-gray-200 transition-colors hover:bg-gray-50"
            >
              {brand}
            </TabsTrigger>
          ))}
        </TabsList>

        {brands.map((brand) => (
          <TabsContent key={brand} value={brand} className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PRODUCTS.filter((product) =>
                brand === "All" ? true : product.brand === brand
              ).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const ProductCard = ({ product }: ProductCardProps) => (
  <article className="group relative bg-white border rounded-xl p-4 hover:shadow-lg transition-all">
    <Link href={`/products/${product.slug}`} className="space-y-4">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-cover group-hover:opacity-0 transition-opacity"
          priority
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.title}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-gray-500">{product.brand}</h3>
        <h2 className="text-lg font-semibold line-clamp-2 text-gray-900">
          {product.title}
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.defaultProductVariant.price}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm">{product.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {product.colors.map((color) => (
          <div
            key={color}
            className="w-6 h-6 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  </article>
);
