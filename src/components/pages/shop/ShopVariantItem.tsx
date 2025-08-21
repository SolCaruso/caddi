"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Container } from "@/components/ui/container"
import { Product, ProductVariant, Image as ProductImage, sortSizes, getAllCategories } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { normalizeImageUrl } from "@/lib/utils"
import AddToBagButton from "./AddToBagButton"
import RelatedProducts from "@/components/pages/shop/RelatedProducts"

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
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Check if product has variants
  const hasVariants = variants.length > 0
  
  // Get product category to determine variant type
  const categories = getAllCategories()
  const category = categories.find(cat => cat.id === product.category_id)
  const isDivotTool = category?.name === "Divot Tool"

  // Get unique colors and sizes from variants
  const availableColors = useMemo(() => {
    if (!hasVariants) return []
    const colors = variants.map(v => v.colors?.name).filter(Boolean)
    return [...new Set(colors)]
  }, [variants, hasVariants])

  const availableSizes = useMemo(() => {
    if (!hasVariants || isDivotTool) return []
    const sizes = variants.map(v => v.sizes?.name).filter((size): size is string => Boolean(size))
    const uniqueSizes = [...new Set(sizes)]
    return sortSizes(uniqueSizes)
  }, [variants, hasVariants, isDivotTool])

  const availableTypes = useMemo(() => {
    if (!hasVariants || !isDivotTool) return []
    const types = variants.map(v => v.types?.name).filter(Boolean)
    return [...new Set(types)]
  }, [variants, hasVariants, isDivotTool])

  // Set initial selections if product has variants
  useMemo(() => {
    if (isDivotTool) {
      // For divot tools, set initial type selection
      if (hasVariants && availableTypes.length > 0 && !selectedType) {
        setSelectedType(availableTypes[0] || null)
      }
    } else {
      // For clothing, set initial color and size selections
      if (hasVariants && availableColors.length > 0 && !selectedColor) {
        setSelectedColor(availableColors[0] || null)
      }
      if (hasVariants && availableSizes.length > 0 && !selectedSize) {
        setSelectedSize(availableSizes[0] || null)
      }
    }
  }, [hasVariants, availableColors, availableSizes, availableTypes, selectedColor, selectedSize, selectedType, isDivotTool])

  // Function to get the appropriate image based on selected variant
  const getImageForVariant = () => {
    if (!hasVariants) {
      return productImages[0]?.path || "/placeholder.svg?height=600&width=600"
    }
    
    let targetVariants: ProductVariant[]
    
    if (isDivotTool) {
      // For divot tools, find variants for the selected type
      targetVariants = selectedType 
        ? variants.filter(v => v.types?.name === selectedType)
        : variants
    } else {
      // For clothing, find variants for the selected color
      targetVariants = selectedColor 
        ? variants.filter(v => v.colors?.name === selectedColor)
        : variants
    }
    
    if (targetVariants.length === 0) {
      return productImages[0]?.path || "/placeholder.svg?height=600&width=600"
    }
    
    // Get the first variant ID
    const variantId = targetVariants[0].id
    
    // Find image that has this variant ID in its variant_ids
    const variantImage = productImages.find(img => 
      img["variant_ids (using the image)"] && 
      Array.isArray(img["variant_ids (using the image)"]) &&
      img["variant_ids (using the image)"].includes(variantId)
    )
    
    return variantImage?.path || productImages[0]?.path || "/placeholder.svg?height=600&width=600"
  }

  // Get the appropriate image for the current selection
  const mainImageSrc = normalizeImageUrl(getImageForVariant())

  // Get the current variant and its price/stock
  const getCurrentVariant = () => {
    if (!hasVariants) return null
    
    if (isDivotTool) {
      return selectedType 
        ? variants.find(v => v.types?.name === selectedType)
        : variants[0]
    } else {
      return selectedColor && selectedSize
        ? variants.find(v => v.colors?.name === selectedColor && v.sizes?.name === selectedSize)
        : variants[0]
    }
  }

  const currentVariant = getCurrentVariant()
  
  // Dynamic pricing: variant price overrides product price if available
  const displayPrice = currentVariant?.price !== null && currentVariant?.price !== undefined
    ? currentVariant.price
    : product.price

  // Get stock information
  const displayStock = currentVariant?.stock !== null && currentVariant?.stock !== undefined
    ? currentVariant.stock
    : product.stock

  // Check if stock is low (1 or 2 items)
  const isLowStock = displayStock !== null && displayStock !== undefined && displayStock > 0 && displayStock <= 2
  const isOutOfStock = displayStock !== null && displayStock !== undefined && displayStock === 0

  return (
    <main>
              <Container className=" mx-auto px-4 3xl:!max-w-8xl">
        {/* Main Product Section */}
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Product Info at Top */}
            <div className="mb-8">
              {/* Tag Badge */}
              {product.tag && (
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.tag}
                  </Badge>
                </div>
              )}
              
              {/* Category */}
              <p className="text-lg text-black/50 font-semibold">{product.categories?.name}</p>

              {/* Product Title and Back Button Row */}
              <div className="flex items-end justify-between gap-4">
                <div>
                                {/* Product Title */}
              <h1 className="text-4xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">{product.name}</h1>

                                {/* Price */}
                  <p className="text-xl font-medium text-black/50">${displayPrice}</p>
                  
                  {/* Low Stock Warning */}
                  {isLowStock && (
                    <p className="text-sm text-caddi-brown font-medium mt-1">
                      Only {displayStock} left!
                    </p>
                  )}
                  
                  {/* Out of Stock Warning */}
                  {isOutOfStock && (
                    <p className="text-sm text-red-600 font-medium mt-1">
                      Out of Stock
                    </p>
                  )}
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
                  priority
                  draggable={false}
                />
              </div>
            </div>

            {/* Product Options and Details */}
            <div className="space-y-6">
              {/* Type Selection for Divot Tools */}
              {isDivotTool && hasVariants && availableTypes.length > 0 && (
                <div className="space-y-3">
                  <p className="text-lg font-medium text-caddi-blue">Wood Type:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedType === type
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/50 hover:border-gray-400'
                        }`}
                      >
                        {type || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection for Clothing */}
              {!isDivotTool && hasVariants && availableColors.length > 0 && (
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

              {/* Size Selection for Clothing */}
              {!isDivotTool && hasVariants && availableSizes.length > 0 && (
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
                  productPrice={displayPrice}
                  productImage={mainImageSrc}
                  variants={variants}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  selectedType={selectedType}
                  hasVariants={hasVariants}
                  isDivotTool={isDivotTool}
                  isOutOfStock={isOutOfStock}
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : hasVariants && isDivotTool && !selectedType
                    ? "Select Wood Type"
                    : hasVariants && !isDivotTool && (!selectedColor || !selectedSize)
                    ? "Select Color & Size" 
                    : "Add to Bag"
                  }
                </AddToBagButton>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 600px' }}>
            {/* Left Side - Product Image */}
            <div className="pr-8">
              <div className="relative bg-[#D9D9D9]/30 overflow-hidden rounded-lg max-w-[650px] w-full h-[750px]">
                <Image
                  src={mainImageSrc || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority
                  draggable={false}
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="flex flex-col justify-center space-y-4 min-w-[500px] max-w-[600px]">

              {/* Tag and Shop Button Row */}
              <div className="flex items-center justify-between mb-4">
                {/* Tag - Left Aligned */}
                <div className="hidden lg:flex">
                  {product.tag && (
                    <Badge variant="secondary" className="text-xs">
                      {product.tag}
                    </Badge>
                  )}
                </div>
                
                {/* Back to Shop Button - Right Aligned */}
                <div className="flex-shrink-0">
                  <Link href="/shop" className="inline-flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
                    <svg className="h-4 w-4 text-black/50 group-hover:text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Shop
                  </Link>
                </div>
              </div>

              {/* Category */}
              <p className="text-lg text-black/50 font-semibold">{product.categories?.name}</p>

              {/* Product Title */}
              <h1 className="text-6xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">{product.name}</h1>

              {/* Price */}
              <p className="text-xl font-medium text-black/50">${displayPrice}</p>
              
              {/* Low Stock Warning */}
              {isLowStock && (
                <p className="text-sm text-caddi-brown font-medium mt-1">
                  Only {displayStock} left!
                </p>
              )}
              
              {/* Out of Stock Warning */}
              {isOutOfStock && (
                <p className="text-sm text-red-600 font-medium mt-1">
                  Out of Stock
                </p>
              )}

              {/* Type Selection for Divot Tools */}
              {isDivotTool && hasVariants && availableTypes.length > 0 && (
                <div className="space-y-3 mt-4">
                  <p className="text-lg font-medium text-caddi-blue">Wood Type:</p>
                  <div className="flex gap-2 flex-wrap">
                    {availableTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type || null)}
                        className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          selectedType === type
                            ? 'border-caddi-blue text-caddi-blue'
                            : 'border-gray-300 text-black/50 hover:border-gray-400'
                        }`}
                      >
                        {type || ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection for Clothing */}
              {!isDivotTool && hasVariants && availableColors.length > 0 && (
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

              {/* Size Selection for Clothing */}
              {!isDivotTool && hasVariants && availableSizes.length > 0 && (
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
                  productPrice={displayPrice}
                  productImage={mainImageSrc}
                  variants={variants}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  selectedType={selectedType}
                  hasVariants={hasVariants}
                  isDivotTool={isDivotTool}
                  isOutOfStock={isOutOfStock}
                  productStock={product.stock}
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : hasVariants && isDivotTool && !selectedType
                    ? "Select Wood Type"
                    : hasVariants && !isDivotTool && (!selectedColor || !selectedSize)
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