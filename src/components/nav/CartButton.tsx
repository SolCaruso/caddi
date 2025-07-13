import ShoppingBag from "@/components/icons/ShoppingBag";
import Link from "next/link";

export default function CartButton() {
  return (
    <Link href='/' className="transition-all cursor-pointer duration-100 group ease-in-out-quad -mr-1.5">
      <ShoppingBag className=" h-10 w-10 md:h-9 md:w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
    </Link>
  );
} 