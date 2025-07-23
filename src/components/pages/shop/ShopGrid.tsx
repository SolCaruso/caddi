import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import ShopHeader from "./ShopHeader";
import ShopFilter from "./ShopFilter";
import { getAllProducts, getProductImages, getAllCategories, getProductVariants, ProductVariant } from "@/lib/data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ShopGridProps {
  onFilterChange: (filterId: string, isChecked: boolean) => void;
  selectedFilters: string[];
}

export default function ShopGrid({ onFilterChange, selectedFilters }: ShopGridProps) {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const productsPerPage = 9;

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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  // Handle scroll to top after page change
  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setShouldScrollToTop(false);
    }
  }, [currentPage, shouldScrollToTop]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
        {currentProducts.map((product) => {
          // Get images and variants for this product
          const productImages = getProductImages(product.id)
          const productVariants = getProductVariants(product.id)
          
          // Get the first image - use the same logic as variant page
          let firstImage = productImages[0]
          
          // If product has variants, get the image for the first available color
          if (productVariants.length > 0) {
            // Get unique colors from variants
            const availableColors = [...new Set(productVariants.map((v: ProductVariant) => v.colors?.name).filter(Boolean))]
            
            if (availableColors.length > 0) {
              const firstColor = availableColors[0]
              
              // Find variants for the first color
              const colorVariants = productVariants.filter((v: ProductVariant) => v.colors?.name === firstColor)
              
              if (colorVariants.length > 0) {
                // Get the first variant ID for this color
                const variantId = colorVariants[0].id
                
                // Find image that has this variant ID in its variant_ids
                const colorImage = productImages.find(img => 
                  img["variant_ids (using the image)"] && 
                  Array.isArray(img["variant_ids (using the image)"]) &&
                  img["variant_ids (using the image)"].includes(variantId)
                )
                
                if (colorImage) {
                  firstImage = colorImage
                }
              }
            }
          }
          
          return (
            <Link key={product.id} href={`/shop/${product.id}`} className="group cursor-pointer">
              <div className="relative aspect-square mb-3 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
                <Image
                  src={firstImage?.path || "/webm/birdeye.webp"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  draggable={false}
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
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      setShouldScrollToTop(true);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(1);
                      setShouldScrollToTop(true);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Previous page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(currentPage - 1);
                      setShouldScrollToTop(true);
                    }}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page */}
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  isActive
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              
              {/* Next page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(currentPage + 1);
                      setShouldScrollToTop(true);
                    }}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(totalPages);
                      setShouldScrollToTop(true);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      setShouldScrollToTop(true);
                    }
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
} 