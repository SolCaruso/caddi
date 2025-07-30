"use client";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import ShopSidebar from "@/components/pages/shop/ShopSidebar";
import ProductGrid from "@/components/pages/shop/ShopGrid";
import { CartProvider } from "@/lib/cart";

export default function ShopPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string, isChecked: boolean) => {
    setSelectedFilters(prev => {
      if (isChecked) {
        return [...prev, filterId];
      } else {
        return prev.filter(id => id !== filterId);
      }
    });
  };

  return (
    <CartProvider>
      <main className="flex-1 bg-white flex flex-col">
        <Container className="flex-1 3xl:!max-w-8xl">

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8 flex-1 mb-24 lg:mt-24">
            <ShopSidebar onFilterChange={handleFilterChange} selectedFilters={selectedFilters} />
            <ProductGrid onFilterChange={handleFilterChange} selectedFilters={selectedFilters} />
          </div>

        </Container>
      </main>
    </CartProvider>
  );
}
