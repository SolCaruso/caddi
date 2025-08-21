import type { Metadata } from 'next'
import ShopItem from "@/components/pages/shop/ShopItem";
import ProductImagePreloader from "@/components/pages/shop/ProductImagePreloader";
import { CartProvider } from "@/lib/cart";
import { getProductById } from "@/lib/data";

interface ShopItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ShopItemPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(parseInt(id));
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const productName = product.name;
  const category = product.categories?.name || "Golf Accessory";
  const tag = product.tag ? `${product.tag} ` : "";
  
  return {
    title: `${productName} - ${tag}${category}`,
    description: product.description || `${productName} - Premium ${category.toLowerCase()} crafted with attention to detail. ${tag}${category} available at Caddi AI Inc.`,
    keywords: [
      productName.toLowerCase(),
      category.toLowerCase(),
      tag.toLowerCase(),
      "golf accessory",
      "premium golf tool",
      "handcrafted golf accessory"
    ].filter(Boolean),
    openGraph: {
      title: `${productName} - ${tag}${category}`,
      description: product.description || `${productName} - Premium ${category.toLowerCase()} crafted with attention to detail.`,
      url: `https://caddi.ai/shop/${id}`,
      images: [
        {
          url: `/api/og/product/${id}`,
          width: 1200,
          height: 630,
          alt: `${productName} - ${tag}${category}`,
        },
      ],
    },
    twitter: {
      title: `${productName} - ${tag}${category}`,
      description: product.description || `${productName} - Premium ${category.toLowerCase()} crafted with attention to detail.`,
    },
  };
}

export default async function ShopItemPage({ params }: ShopItemPageProps) {
  const { id } = await params;
  return (
    <CartProvider>
      <ProductImagePreloader productId={parseInt(id)} />
      <ShopItem productId={parseInt(id)} />
    </CartProvider>
  );
} 