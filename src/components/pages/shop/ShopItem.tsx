import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getProductById, getProductImages, getAllProducts, getProductVariants, Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import ShopVariantItem from "./client/ShopVariantItem"
import AddToBagButton from "@/components/pages/shop/client/AddToBagButton"
import RelatedProducts from "./RelatedProducts"

interface ShopItemProps {
  productId: number
}

export default function ShopItem({ productId }: ShopItemProps) {
  const product = getProductById(productId)
  const productImages = getProductImages(productId)
  const variants = getProductVariants(productId)

  // Get related products
  const allProducts = getAllProducts()
  let relatedProducts: Product[]
  
  // For clothing items (T-Shirts and Hoodies), show most recent clothing items
  if (product?.category_id === 1 || product?.category_id === 2) {
    // Get all clothing items (T-Shirts and Hoodies) excluding current product
    relatedProducts = allProducts
      .filter((p) => p.id !== productId && (p.category_id === 1 || p.category_id === 2))
      .slice(0, 3)
  } else {
    // For other products, show products in the same category
    relatedProducts = allProducts
      .filter((p) => p.id !== productId && p.category_id === product?.category_id)
      .slice(0, 3)
  }

  // Check if product has variants
  const hasVariants = variants.length > 0

  // If product not found, show error or redirect
  if (!product) {
    return (
      <main className="flex-1 bg-white flex flex-col">
        <Container className="flex-1">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold text-caddi-blue mb-4">Product Not Found</h1>
            <p className="text-caddi-black mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/shop" className="text-caddi-brown hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  // If product has variants, use the client component
  if (hasVariants) {
    return (
      <ShopVariantItem 
        product={product}
        variants={variants}
        productImages={productImages}
        relatedProducts={relatedProducts}
      />
    )
  }

  // For products without variants, use the server component version
  const firstImage = productImages[0]
  const mainImageSrc = firstImage?.path || "/placeholder.svg?height=600&width=600"

  return (
    <main className="bg-white">
      <Container className="mx-auto px-4">
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

            {/* Product Details */}
            <div className="space-y-6">
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
                <button className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer w-full">
                  Add to Bag
                </button>
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

              {/* Tag and Shop Button Row */}
              <div className="flex items-center justify-between mb-4">
                {/* Tag - Left Aligned (Hidden on screens under lg) */}
                {product.tag && (
                  <div className="hidden lg:flex">
                    <Badge variant="secondary" className="text-xs">
                      {product.tag}
                    </Badge>
                  </div>
                )}
                
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
              <p className="text-xl font-medium text-black/50">${product.price}</p>

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
                >
                  Add to Bag
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
