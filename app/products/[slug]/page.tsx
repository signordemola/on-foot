import ProductPageDetails from "@/components/product-details";
import { PRODUCTS } from "@/constants/products";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function SingleProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  const similarProducts = PRODUCTS.filter((p) => {
    if (!product) return false;
    return (
      p.id !== product.id &&
      (p.productType === product.productType ||
        p.categories.some((cat) => product.categories.includes(cat)))
    );
  }).slice(0, 4);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ProductPageDetails  product={product} similarProducts={similarProducts} />
    </div>
  );
}
