import ShopItem from "@/components/pages/shop/ShopItem";

interface ShopItemPageProps {
  params: {
    id: string;
  };
}

export default function ShopItemPage({ params }: ShopItemPageProps) {
  return <ShopItem productId={parseInt(params.id)} />;
} 