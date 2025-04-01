export interface ProductBody {
  description?: string;
  features?: string[];
  // Add more fields as needed
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  sizes: string[];
  colors: string[];
  material: string;
  productType: string;
  defaultProductVariant: {
    size: string;
    color: string;
    price: number;
  };
  mainImage: string;
  hoverImage?: string;
  blurb: string;
  categories: string[];
  slug: string;
  rating?: number;
  reviewsCount?: number;

  body?: ProductBody
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Air Runner Pro X",
    brand: "Nike",
    sizes: ["8", "9", "10", "11"],
    colors: ["#FF0000", "#000000", "#FFFFFF"],
    material: "Mesh & Synthetic",
    productType: "Running",
    defaultProductVariant: {
      size: "9",
      color: "#FF0000",
      price: 149.99,
    },
    mainImage: "/images/air-runner-red.jpg",
    hoverImage: "/images/air-runner-red-back.jpg",
    blurb: "Ultra-lightweight racing shoe with responsive cushioning",
    categories: ["men", "featured"],
    slug: "air-runner-pro-x",
    rating: 4.8,
    reviewsCount: 235,
  },
  {
    id: "2",
    title: "Classic Retro Sneaker",
    brand: "Adidas",
    sizes: ["7", "8", "9", "10"],
    colors: ["#0000FF", "#808080"],
    material: "Leather",
    productType: "Casual",
    defaultProductVariant: {
      size: "8",
      color: "#0000FF",
      price: 89.99,
    },
    mainImage: "/images/classic-retro-blue.png",
    hoverImage: "/images/classic-retro-blue-back.png",
    blurb: "Vintage-inspired sneaker with modern comfort",
    categories: ["unisex"],
    slug: "classic-retro-sneaker",
    rating: 4.6,
    reviewsCount: 189,
  },
  {
    id: "3",
    title: "Arizona Soft Footbed Sandal",
    brand: "Birkenstock",
    sizes: ["5", "6", "7", "8"],
    colors: ["#964B00", "#D2B48C"],
    material: "Cork & Suede",
    productType: "Sandals",
    defaultProductVariant: {
      size: "7",
      color: "#964B00",
      price: 99.95,
    },
    mainImage: "/images/ariza-sandal.jpg",
    hoverImage: "/images/ariza-sandal-back.webp",
    blurb: "Iconic comfort sandal with contoured footbed",
    categories: ["women"],
    slug: "arizona-soft-footbed",
    rating: 4.7,
    reviewsCount: 312,
  },
  {
    id: "4",
    title: "Chuck Taylor All Star",
    brand: "Converse",
    sizes: ["6", "7", "8", "9"],
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    material: "Canvas",
    productType: "Sneakers",
    defaultProductVariant: {
      size: "8",
      color: "#000000",
      price: 65.0,
    },
    mainImage: "/images/chuck-taylor-black.jpg",
    hoverImage: "/images/chuck-taylor-side.jpeg",
    blurb: "Timeless high-top canvas sneaker",
    categories: ["unisex"],
    slug: "chuck-taylor-all-star",
    rating: 4.5,
    reviewsCount: 478,
  },
  {
    id: "5",
    title: "Ultraboost 5.0 DNA",
    brand: "Adidas",
    sizes: ["9", "10", "11", "12"],
    colors: ["#00FF00", "#000000", "#FFFFFF"],
    material: "Primeknit",
    productType: "Athletic",
    defaultProductVariant: {
      size: "10",
      color: "#00FF00",
      price: 179.99,
    },
    mainImage: "/images/ultraboost-green.jpg",
    hoverImage: "/images/ultraboost-green-back.jpg",
    blurb: "Energy-returning running shoes with responsive cushioning",
    categories: ["men", "featured"],
    slug: "ultraboost-5-dna",
    rating: 4.9,
    reviewsCount: 156,
  },
  {
    id: "6",
    title: "Classic Slip-On",
    brand: "Vans",
    sizes: ["7", "8", "9", "10"],
    colors: ["#808080", "#000000"],
    material: "Canvas",
    productType: "Skate",
    defaultProductVariant: {
      size: "9",
      color: "#808080",
      price: 59.99,
    },
    mainImage: "/images/slip-on-checker.webp",
    hoverImage: "/images/slip-on-checker-back.webp",
    blurb: "Signature checkerboard slip-on skate shoe",
    categories: ["unisex"],
    slug: "classic-slip-on",
    rating: 4.4,
    reviewsCount: 289,
  },
  {
    id: "7",
    title: "Moab 3 Waterproof",
    brand: "Merrell",
    sizes: ["8", "9", "10", "11"],
    colors: ["#556B2F", "#808080"],
    material: "Suede & Mesh",
    productType: "Hiking",
    defaultProductVariant: {
      size: "10",
      color: "#556B2F",
      price: 129.95,
    },
    mainImage: "/images/moab-hiking.jpg",
    hoverImage: "/images/moab-hiking-back.webp",
    blurb: "Waterproof hiking boot with Vibram outsole",
    categories: ["men"],
    slug: "moab-3-waterproof",
    rating: 4.8,
    reviewsCount: 167,
  },
  {
    id: "8",
    title: "Cloudfoam Pure 2.0",
    brand: "Skechers",
    sizes: ["6", "7", "8", "9"],
    colors: ["#FF69B4", "#000000"],
    material: "Mesh",
    productType: "Walking",
    defaultProductVariant: {
      size: "7",
      color: "#FF69B4",
      price: 74.99,
    },
    mainImage: "/images/cloudfoam-pink.jpg",
    hoverImage: "/images/cloudfoam-pink-back.jpg",
    blurb: "Lightweight walking shoes with memory foam",
    categories: ["women"],
    slug: "cloudfoam-pure",
    rating: 4.3,
    reviewsCount: 94,
  },
  {
    id: "9",
    title: "Timberland Premium Boot",
    brand: "Timberland",
    sizes: ["8", "9", "10", "11"],
    colors: ["#8B4513", "#000000"],
    material: "Premium Leather",
    productType: "Boots",
    defaultProductVariant: {
      size: "9",
      color: "#8B4513",
      price: 199.99,
    },
    mainImage: "/images/timberland-boot.png",
    hoverImage: "/images/timberland-side.jpg",
    blurb: "Iconic waterproof leather boots",
    categories: ["men", "featured"],
    slug: "timberland-premium",
    rating: 4.7,
    reviewsCount: 432,
  },
  {
    id: "10",
    title: "FuelCell Rebel v3",
    brand: "New Balance",
    sizes: ["8", "9", "10", "11"],
    colors: ["#FFA500", "#000000"],
    material: "Engineered Mesh",
    productType: "Racing",
    defaultProductVariant: {
      size: "10",
      color: "#FFA500",
      price: 159.99,
    },
    mainImage: "/images/fuelcell-orange.webp",
    hoverImage: "/images/fuelcell-black.jpg",
    blurb: "Competition-ready racing shoe with carbon plate",
    categories: ["unisex"],
    slug: "fuelcell-rebel",
    rating: 4.9,
    reviewsCount: 201,
  },
];
