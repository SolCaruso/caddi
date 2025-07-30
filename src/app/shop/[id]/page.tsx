import ShopItem from "@/components/pages/shop/ShopItem";
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
      <ShopItem productId={parseInt(id)} />
    </CartProvider>
  );
} 