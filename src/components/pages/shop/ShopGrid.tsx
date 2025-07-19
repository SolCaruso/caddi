import Image from "next/image";
import { useState, useMemo } from "react";
import ShopHeader from "./ShopHeader";
import ShopFilter from "./ShopFilter";
import { getAllProducts, getProductImages, getAllCategories } from "@/lib/data";

interface ShopGridProps {
  onFilterChange: (filterId: string, isChecked: boolean) => void;
  selectedFilters: string[];
}

export default function ShopGrid({ onFilterChange, selectedFilters }: ShopGridProps) {
  const allProducts = getAllProducts();
  const categories = getAllCategories();

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) {
      return allProducts; // Show all products when no filters selected
    }

    return allProducts.filter(product => {
      const category = categories.find(cat => cat.id === product.category_id);
      if (!category) return false;

      // Check if the product's category matches any selected filter
      return selectedFilters.some(filter => {
        if (filter === "divot-tools-all" && category.name === "Divot Tool") {
          return true;
        }
        if (filter === "t-shirts" && category.name === "T-Shirt") {
          return true;
        }
        if (filter === "hoodies" && category.name === "Hoodie") {
          return true;
        }
        return false;
      });
    });
  }, [allProducts, categories, selectedFilters]);

  return (
    <div className="lg:w-3/4 flex-1">
      {/* Mobile Header Section */}
      <div className="w-full mb-8 mt-12 lg:hidden">
        <div className="flex items-end justify-between gap-4">
          {/* Left side - Breadcrumbs and Title */}
          <div>
            <ShopHeader />
          </div>

          {/* Right side - Filter Button */}
          <div className="flex-shrink-0">
            <ShopFilter onFilterChange={onFilterChange} selectedFilters={selectedFilters} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {filteredProducts.map((product) => {
          // Get the first image for this product
          const productImages = getProductImages(product.id)
          const firstImage = productImages[0]
          
          return (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square mb-3 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
                <Image
                  src={firstImage?.path || "/webm/birdeye.webp"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-proxima-nova font-semibold text-black/50 text-base">
                  {product.name}
                </h3>
                <p className="font-proxima-nova font-normal text-black/30 text-base">
                  {product.subtitle || "3 Colours"}
                </p>
                <p className="font-proxima-nova font-semibold text-black/50 text-base">
                  ${product.price}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
} 