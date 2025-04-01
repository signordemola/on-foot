import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) =>
    p.categories.includes("featured")
  );
  const trendingProducts = PRODUCTS.slice(0, 4); // First 4 as trending

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-200px)] min-h-[500px] max-h-[800px] w-full">
        <div className="absolute inset-0 z-0 w-full">
          <Image
            src="/images/hero-main.webp"
            alt="Featured Shoes"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/80" />
        </div>

        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-xl">
              Step Into Style
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow-md">
              New Arrivals Up to 40% Off
            </p>
            <Link href={`/products`}>
              <Button size="lg" variant={`secondary`}>
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64 mb-4">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md group-hover:opacity-0 transition-opacity"
                  />
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={product.title}
                      fill
                      className="object-cover rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500">
                      {product.brand}
                    </h3>
                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                  </div>
                  <span className="text-lg font-bold">
                    ${product.defaultProductVariant.price}
                  </span>
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
                {product.rating && (
                  <div className="mt-4 flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{product.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64 mb-4">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md group-hover:opacity-0 transition-opacity"
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
                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                  </div>
                  <span className="text-lg font-bold">
                    ${product.defaultProductVariant.price}
                  </span>
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
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Running", "Sneakers", "Boots", "Sandals"].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="relative h-48 rounded-xl overflow-hidden hover:shadow-xl transition-all bg-gray-100"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
