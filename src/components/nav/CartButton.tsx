"use client"

import ShoppingBag from "@/components/icons/ShoppingBag";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartButton() {
  const { state } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const total = state.items.reduce((total, item) => total + item.quantity, 0);
      setItemCount(total);
    }
  }, [state.items, isClient]);

  return (
    <Link 
      href="/cart"
      className="cart-trigger transition-all cursor-pointer duration-100 group ease-in-out-quad -mr-1.5 relative"
    >
      <ShoppingBag className="h-10 w-10 md:h-9 md:w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
      
      {/* Item Count Badge - Only render on client */}
      {isClient && itemCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-caddi-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </div>
      )}
    </Link>
  );
} 