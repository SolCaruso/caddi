import { getProductImages, getProductVariants } from '@/lib/data'
import { normalizeImageUrl } from '@/lib/utils'

interface ProductImagePreloaderProps {
  productId: number
}

export default function ProductImagePreloader({ productId }: ProductImagePreloaderProps) {
  // Get all images for this specific product
  const productImages = getProductImages(productId)
  const productVariants = getProductVariants(productId)
  
  // If product has variants, get unique variant images
  let imagesToPreload: string[] = []
  
  if (productVariants.length > 0) {
    // Get images that are used by variants (color variations)
    const variantImages = productImages.filter(img => 
      img["variant_ids (using the image)"] && 
      Array.isArray(img["variant_ids (using the image)"]) &&
      img["variant_ids (using the image)"].length > 0
    )
    imagesToPreload = variantImages.map(img => normalizeImageUrl(img.path))
  } else {
    // For non-variant products, just get the first few images
    imagesToPreload = productImages.slice(0, 3).map(img => normalizeImageUrl(img.path))
  }
  
  return (
    <>
      {imagesToPreload.map((imagePath, index) => (
        <link
          key={`product-preload-${index}`}
          rel="preload"
          as="image"
          href={imagePath}
        />
      ))}
    </>
  )
}