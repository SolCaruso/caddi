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
      <div className="relative">
        <ShoppingBag className="h-10 w-10 md:h-9 md:w-9 text-caddi-blue group-hover:text-caddi-brown transition-all duration-100 ease-in-out-quad" />
        
        {/* Item Count Badge - Centered in the bag */}
        {isClient && itemCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center translate-y-0.5">
            <span className="text-caddi-blue text-xs font-bold">
              {itemCount > 99 ? '99' : itemCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
} 