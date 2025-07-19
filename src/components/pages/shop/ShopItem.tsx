import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getProductById, getProductImages, getProductVariants, getAllProducts } from "@/lib/data";

interface ShopItemProps {
  productId: number;
}

export default function ShopItem({ productId }: ShopItemProps) {
  const product = getProductById(productId);
  const productImages = getProductImages(productId);
  const productVariants = getProductVariants(productId);
  
  // Get related products (other products in the same category)
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== productId && p.category_id === product?.category_id)
    .slice(0, 3);

  // If product not found, show error or redirect
  if (!product) {
    return (
      <main className="flex-1 bg-white flex flex-col">
        <Container className="flex-1">
          <div className="pt-12 sm:pt-18 h-[50vh]">
            <h1 className="text-2xl font-bold text-caddi-blue mb-4">Product Not Found</h1>
            <p className="text-black/60 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/shop" className="text-caddi-blue hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </Container>
      </main>
    );
  }
  // Get the first image for the main display
  const firstImage = productImages[0];
  const mainImageSrc = firstImage?.path || "/webm/placeholder.webp";

  return (
    <main className="flex-1 bg-white flex flex-col">
      <Container className="flex-1">
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24 pt-4 md:pt-2">
          {/* Left Side - Product Images */}
          <div className="lg:w-1/2">
            {/* Main Image */}
            <div className="relative aspect-square mb-6 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
              <Image
                src={mainImageSrc}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>


          </div>

          {/* Right Side - Product Details */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                {product.tag && (
                  <Badge variant="secondary" className="mb-2">
                    {product.tag}
                  </Badge>
                )}
                <h2 className="text-sm font-medium text-caddi-blue mb-2">
                  {product.categories?.name || "Product"}
                </h2>
                <h1 className="text-3xl font-bold text-caddi-blue mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-caddi-blue">
                  ${product.price}
                </p>
              </div>

              {/* Product Description */}
              <div>
                {product.header && (
                  <h3 className="text-lg font-semibold text-black/70 mb-3">
                    {product.header}
                  </h3>
                )}
                <div className="text-sm text-black/60 mb-4">
                  <p>{product.description}</p>
                </div>
                {product.bullets && (
                  <ul className="space-y-2 text-sm text-black/60">
                    {product.bullets.split(',').map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{bullet.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Add to Bag Button */}
              <div className="pt-4">
                <button className="w-full bg-white border-2 border-caddi-blue text-caddi-blue font-semibold py-3 px-6 rounded-lg hover:bg-caddi-blue hover:text-white transition-colors">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-24">
            <h2 className="text-2xl font-semibold text-caddi-blue mb-8">
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedImages = getProductImages(relatedProduct.id);
                const firstRelatedImage = relatedImages[0];
                
                return (
                  <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`} className="group cursor-pointer">
                    <div className="relative aspect-square mb-3 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
                      <Image
                        src={firstRelatedImage?.path || "/webm/birdeye.webp"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-proxima-nova font-semibold text-black/50 text-base">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-proxima-nova font-normal text-black/30 text-base">
                        {relatedProduct.subtitle || "3 Colours"}
                      </p>
                      <p className="font-proxima-nova font-semibold text-black/50 text-base">
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
