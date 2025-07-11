import ShoppingBag from "@/components/icons/ShoppingBag";

export default function CartButton() {
  return (
    <button className="transition-all cursor-pointer duration-100 group ease-in-out-quad -mr-1.5">
      <ShoppingBag className="h-9 w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
    </button>
  );
} 