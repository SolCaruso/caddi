import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function ShopItem() {
  const productImages = [
    "/webm/birdeye.webp",
    "/webm/birdeye.webp",
    "/webm/birdeye.webp",
    "/webm/birdeye.webp",
    "/webm/birdeye.webp",
  ];

  const relatedProducts = [
    { name: "Par Tee Time", price: "$55", image: "/webm/birdeye.webp" },
    { name: "Par Tee Time", price: "$55", image: "/webm/birdeye.webp" },
    { name: "Par Tee Time", price: "$55", image: "/webm/birdeye.webp" },
  ];

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
                src="/webm/birdeye.webp"
                alt="Hardwood Divot Tool"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {productImages.map((image, index) => (
                <div key={index} className="relative w-20 h-20 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <h2 className="text-sm font-medium text-caddi-blue mb-2">
                  Hardwood Divot Tool
                </h2>
                <h1 className="text-3xl font-bold text-caddi-blue mb-2">
                  BIRD'S EYE MAPLE
                </h1>
                <p className="text-2xl font-semibold text-caddi-blue">
                  $15.99
                </p>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold text-black/70 mb-3">
                  Bird's Eye Maple - Domestic Hardwood Divot Tool
                </h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Growth Location: North America</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Colour: Light brown with tiny burls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Rupture Strength: 927 lbf/sq. Inch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Unique Feature: Rare natural grain anomaly</span>
                  </li>
                </ul>
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
        <div className="mb-24">
          <h2 className="text-2xl font-semibold text-caddi-blue mb-8">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square mb-3 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-proxima-nova font-semibold text-black/50 text-base">
                    {product.name}
                  </h3>
                  <p className="font-proxima-nova font-normal text-black/30 text-base">
                    3 Colours
                  </p>
                  <p className="font-proxima-nova font-semibold text-black/50 text-base">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
