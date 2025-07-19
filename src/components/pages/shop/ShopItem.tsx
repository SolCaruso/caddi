import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { getProductById, getProductImages, getAllProducts } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

interface ShopItemProps {
  productId: number
}

export default function ShopItem({ productId }: ShopItemProps) {
  const product = getProductById(productId)
  const productImages = getProductImages(productId)

  // Get related products (other products in the same category)
  const allProducts = getAllProducts()
  const relatedProducts = allProducts
    .filter((p) => p.id !== productId && p.category_id === product?.category_id)
    .slice(0, 3)

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

  // Get the first image for the main display
  const firstImage = productImages[0]
  const mainImageSrc = firstImage?.path || "/placeholder.svg?height=600&width=600"

  return (
    <main className="bg-white">
      <Container className=" mx-auto px-4">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 pt-32 pb-44 max-w-6xl mx-auto">
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

            {/* Tag - Top Right */}
            {product.tag && (
              <div className="flex justify-end mb-4">
                <Badge variant="secondary" className="text-xs">
                  {product.tag}
                </Badge>
              </div>
            )}

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
              <button className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                Add to Bag
              </button>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="pb-32">
            <h2 className="text-4xl font-semibold text-caddi-blue mb-8 uppercase font-family-proxima-nova-extra-condensed">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 2).map((relatedProduct) => {
                const relatedImages = getProductImages(relatedProduct.id)
                const firstRelatedImage = relatedImages[0]
                return (
                  <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`} className="group">
                    <div className="relative aspect-square mb-4 bg-gray-200 overflow-hidden rounded-lg">
                      <Image
                        src={firstRelatedImage?.path || "/placeholder.svg?height=400&width=400"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-black/50 text-lg">{relatedProduct.name}</h3>
                      <p className="text-lg text-black/30 text-regular">{relatedProduct.subtitle || "3 Colours"}</p>
                      <p className="font-semibold text-black/50 text-lg">${relatedProduct.price}</p>
                    </div>
                  </Link>
                )
              })}
              {/* Show third product only on large screens */}
              {relatedProducts.length > 2 && (
                <div className="hidden lg:block">
                  <Link href={`/shop/${relatedProducts[2].id}`} className="group">
                    <div className="relative aspect-square mb-4 bg-gray-200 overflow-hidden rounded-lg">
                      <Image
                        src={getProductImages(relatedProducts[2].id)[0]?.path || "/placeholder.svg?height=400&width=400"}
                        alt={relatedProducts[2].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-black/50 text-lg">{relatedProducts[2].name}</h3>
                      <p className="text-lg text-black/30 text-regular">{relatedProducts[2].subtitle || "3 Colours"}</p>
                      <p className="font-semibold text-black/50 text-lg">${relatedProducts[2].price}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}
