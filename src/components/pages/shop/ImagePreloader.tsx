import { getAllProducts, getProductImages } from '@/lib/data'
import { normalizeImageUrl } from '@/lib/utils'

export default function ImagePreloader() {
  // Only preload images for the first 12 products (likely above the fold)
  const products = getAllProducts().slice(0, 12)
  
  // Get the first image for each product (what shows in grid)
  const preloadImagePaths = products.map(product => {
    const productImages = getProductImages(product.id)
    const firstImage = productImages[0]
    return firstImage ? normalizeImageUrl(firstImage.path) : null
  }).filter(Boolean) as string[]
  
  return (
    <>
      {preloadImagePaths.map((imagePath, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          as="image"
          href={imagePath}
        />
      ))}
    </>
  )
}