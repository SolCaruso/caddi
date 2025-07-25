import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/data"
import { getProductImages, getProductVariants, getAllCategories } from "@/lib/data"
import { normalizeImageUrl } from "@/lib/utils"

interface RelatedProductsProps {
  relatedProducts: Product[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  const categories = getAllCategories()
  
  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="pb-32">
      <h2 className="text-4xl font-semibold text-caddi-blue mb-8 uppercase font-family-proxima-nova-extra-condensed">YOU MIGHT ALSO LIKE</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.slice(0, 2).map((relatedProduct) => {
          const relatedImages = getProductImages(relatedProduct.id)
          const firstRelatedImage = relatedImages[0]
          const productVariants = getProductVariants(relatedProduct.id)
          
          return (
            <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`} className="group">
              <div className="relative aspect-square mb-4 bg-[#D9D9D9]/30 overflow-hidden rounded-lg">
                <Image
                  src={normalizeImageUrl(firstRelatedImage?.path || "/placeholder.svg?height=400&width=400")}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-black/50 text-lg">{relatedProduct.name}</h3>
                <p className="text-lg text-black/30 text-regular">
                  {(() => {
                    // Check if product has variants
                    const hasVariants = productVariants.length > 0
                    
                    if (relatedProduct.subtitle) {
                      return relatedProduct.subtitle
                    } else if (hasVariants) {
                      // Count unique colors for variant products
                      const uniqueColors = new Set()
                      productVariants.forEach(v => {
                        if (v.colors?.name) uniqueColors.add(v.colors.name)
                      })
                      const colorCount = uniqueColors.size
                      return `${colorCount} ${colorCount === 1 ? 'Colour' : 'Colours'}`
                    } else {
                      // For non-variant products, show "Category - Tag" or just "Category"
                      const category = categories.find(cat => cat.id === relatedProduct.category_id)
                      if (category) {
                        return relatedProduct.tag ? `${category.name} - ${relatedProduct.tag}` : category.name
                      }
                      return "Product"
                    }
                  })()}
                </p>
                <p className="font-semibold text-black/50 text-lg">${relatedProduct.price}</p>
              </div>
            </Link>
          )
        })}
        {/* Show third product only on large screens */}
        {relatedProducts.length > 2 && (
          <div className="hidden lg:block">
            <Link href={`/shop/${relatedProducts[2].id}`} className="group">
              <div className="relative aspect-square mb-4 bg-[#D9D9D9]/30 overflow-hidden rounded-lg">
                <Image
                  src={normalizeImageUrl(getProductImages(relatedProducts[2].id)[0]?.path || "/placeholder.svg?height=400&width=400")}
                  alt={relatedProducts[2].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-black/50 text-lg">{relatedProducts[2].name}</h3>
                <p className="text-lg text-black/30 text-regular">
                  {(() => {
                    const productVariants = getProductVariants(relatedProducts[2].id)
                    // Check if product has variants
                    const hasVariants = productVariants.length > 0
                    
                    if (relatedProducts[2].subtitle) {
                      return relatedProducts[2].subtitle
                    } else if (hasVariants) {
                      // Count unique colors for variant products
                      const uniqueColors = new Set()
                      productVariants.forEach(v => {
                        if (v.colors?.name) uniqueColors.add(v.colors.name)
                      })
                      const colorCount = uniqueColors.size
                      return `${colorCount} ${colorCount === 1 ? 'Colour' : 'Colours'}`
                    } else {
                      // For non-variant products, show "Category - Tag" or just "Category"
                      const category = categories.find(cat => cat.id === relatedProducts[2].category_id)
                      if (category) {
                        return relatedProducts[2].tag ? `${category.name} - ${relatedProducts[2].tag}` : category.name
                      }
                      return "Product"
                    }
                  })()}
                </p>
                <p className="font-semibold text-black/50 text-lg">${relatedProducts[2].price}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 