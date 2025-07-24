"use client"

import ShoppingBag from "@/components/icons/ShoppingBag";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CartItem } from "@/lib/cart";

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const cartItems = JSON.parse(saved);
        const total = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
        setItemCount(total);
      } else {
        setItemCount(0);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateCartCount(); // Initial load
    
    // Listen for localStorage changes (from other tabs/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };
    
    // Listen for custom cart update events (from same tab)
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

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