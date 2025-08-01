import ShopItem from "@/components/pages/shop/ShopItem";
import ProductImagePreloader from "@/components/pages/shop/ProductImagePreloader";
import { CartProvider } from "@/lib/cart";

interface ShopItemPageProps {
  params: Promise<{
    id: string;
  }>;
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