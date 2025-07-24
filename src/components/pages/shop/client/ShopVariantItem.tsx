"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Container } from "@/components/ui/container"
import { Product, ProductVariant, Image as ProductImage } from "@/lib/data"
import AddToBagButton from "@/components/pages/shop/Client/AddToBagButton"
import RelatedProducts from "../RelatedProducts"

interface ShopVariantItemProps {
  product: Product
  variants: ProductVariant[]
  productImages: ProductImage[]
  relatedProducts: Product[]
}

export default function ShopVariantItem({ product, variants, productImages, relatedProducts }: ShopVariantItemProps) {
  // State for selected variations
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  // Check if product has variants
  const hasVariants = variants.length > 0

  // Get unique colors and sizes from variants
  const availableColors = useMemo(() => {
    if (!hasVariants) return []
    const colors = variants.map(v => v.colors?.name).filter(Boolean)
    return [...new Set(colors)]
  }, [variants, hasVariants])

  const availableSizes = useMemo(() => {
    if (!hasVariants) return []
    const sizes = variants.map(v => v.sizes?.name).filter(Boolean)
    return [...new Set(sizes)]
  }, [variants, hasVariants])

  // Set initial selections if product has variants
  useMemo(() => {
    if (hasVariants && availableColors.length > 0 && !selectedColor) {
      setSelectedColor(availableColors[0] || null)
    }
    if (hasVariants && availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0] || null)
    }
  }, [hasVariants, availableColors, availableSizes, selectedColor, selectedSize])

  // Function to get the appropriate image based on selected color
  const getImageForColor = (color: string | null) => {
    if (!color || !hasVariants) {
      return productImages[0]?.path || "/placeholder.svg?height=600&width=600"
    }
    
    // Find variants for the selected color
    const colorVariants = variants.filter(v => v.colors?.name === color)
    if (colorVariants.length === 0) {
      return productImages[0]?.path || "/placeholder.svg?height=600&width=600"
    }
    
    // Get the first variant ID for this color
    const variantId = colorVariants[0].id
    
    // Find image that has this variant ID in its variant_ids
    const colorImage = productImages.find(img => 
      img["variant_ids (using the image)"] && 
      Array.isArray(img["variant_ids (using the image)"]) &&
      img["variant_ids (using the image)"].includes(variantId)
    )
    
    return colorImage?.path || productImages[0]?.path || "/placeholder.svg?height=600&width=600"
  }

  // Get the appropriate image for the current selection
  const mainImageSrc = getImageForColor(selectedColor)

  return (
    <main className="bg-white">
      <Container className=" mx-auto px-4">
        {/* Main Product Section */}
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44 max-w-6xl mx-auto">
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Product Info at Top */}
            <div className="mb-8">
              {/* Category */}
              <p className="text-lg text-black/50 font-semibold">{product.categories?.name}</p>

              {/* Product Title and Back Button Row */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  {/* Product Title */}
                  <h1 className="text-4xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">{product.name}</h1>

                  {/* Price */}
                  <p className="text-xl font-medium text-black/50">${product.price}</p>
                </div>

                {/* Back to Shop Button - Right Aligned */}
                <div className="flex-shrink-0">
                  <Link href="/shop" className="flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
                    <svg className="h-4 w-4 text-black/50 group-hover:text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Image - Full Width */}
            <div className="mb-8 -mx-4 lg:mx-0">
              <div className="relative aspect-square bg-[#D9D9D9]/30 overflow-hidden w-full lg:rounded-lg">
                <Image
                  src={mainImageSrc || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Product Options and Details */}
            <div className="space-y-6">
              {/* Color Selection */}
              {hasVariants && availableColors.length > 0 && (
                <div className="space-y-3">
                  <p className="text-lg font-medium text-caddi-blue">Color:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedColor === color
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/50 hover:border-gray-400'
                        }`}
                      >
                        {color || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {hasVariants && availableSizes.length > 0 && (
                <div className="space-y-3">
                  <p className="text-lg font-medium text-caddi-blue">Size:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedSize === size
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/70 hover:border-gray-400'
                        }`}
                      >
                        {size || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                {product.header && <p className="text-caddi-blue font-medium text-xl pt-2">{product.header}</p>}

                {product.description && <p className="text-black/50 text-lg font-normal ">{product.description}</p>}

                {product.bullets && (
                  <ul className="space-y-1">
                    {product.bullets.split(",").map((bullet, index) => (
                      <li key={index} className="flex items-start text-black/50">
                        <span className="w-1 h-1 bg-black/50 rounded-full mt-3.5 mr-3 flex-shrink-0"></span>
                        <span className="text-lg font-light text-black/50">{bullet.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Add to Bag Button */}
              <div className="pt-8">
                <AddToBagButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={mainImageSrc}
                  variants={variants}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  hasVariants={hasVariants}
                >
                  {hasVariants && (!selectedColor || !selectedSize) 
                    ? "Select Color & Size" 
                    : "Add to Bag"
                  }
                </AddToBagButton>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2">
            {/* Left Side - Product Image */}
            <div>
              <div className="relative aspect-square bg-[#D9D9D9]/30 overflow-hidden rounded-lg w-[450px] h-[550px]">
                <Image
                  src={mainImageSrc || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="flex flex-col justify-center space-y-4 ">

              {/* Back to Shop Button - Right Aligned */}
              <div className="mb-4 flex justify-end">
                <Link href="/shop" className="inline-flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
                  <svg className="h-4 w-4 text-black/50 group-hover:text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Shop
                </Link>
              </div>

              {/* Category */}
              <p className="text-lg text-black/50 font-semibold">{product.categories?.name}</p>

              {/* Product Title */}
              <h1 className="text-6xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">{product.name}</h1>

              {/* Price */}
              <p className="text-xl font-medium text-black/50">${product.price}</p>

              {/* Color Selection */}
              {hasVariants && availableColors.length > 0 && (
                <div className="space-y-3 mt-4">
                  <p className="text-lg font-medium text-caddi-blue">Color:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedColor === color
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/50 hover:border-gray-400'
                        }`}
                      >
                        {color || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {hasVariants && availableSizes.length > 0 && (
                <div className="space-y-3 mt-4">
                  <p className="text-lg font-medium text-caddi-blue">Size:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedSize === size
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/70 hover:border-gray-400'
                        }`}
                      >
                        {size || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4 mt-4">
                {product.header && <p className="text-caddi-blue font-medium text-xl pt-2">{product.header}</p>}

                {product.description && <p className="text-black/50 text-lg font-normal ">{product.description}</p>}

                {product.bullets && (
                  <ul className="space-y-1">
                    {product.bullets.split(",").map((bullet, index) => (
                      <li key={index} className="flex items-start text-black/50">
                        <span className="w-1 h-1 bg-black/50 rounded-full mt-3.5 mr-3 flex-shrink-0"></span>
                        <span className="text-lg font-light text-black/50">{bullet.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Add to Bag Button */}
              <div className="pt-8">
                <AddToBagButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={mainImageSrc}
                  variants={variants}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  hasVariants={hasVariants}
                >
                  {hasVariants && (!selectedColor || !selectedSize) 
                    ? "Select Color & Size" 
                    : "Add to Bag"
                  }
                </AddToBagButton>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </Container>
    </main>
  )
} 