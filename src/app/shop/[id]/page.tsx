import ShopItem from "@/components/pages/shop/ShopItem";

interface ShopItemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShopItemPage({ params }: ShopItemPageProps) {
  const { id } = await params;
  return <ShopItem productId={parseInt(id)} />;
} 