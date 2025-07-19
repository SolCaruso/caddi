import Image from "next/image";
import ShopHeader from "./ShopHeader";
import ShopFilter from "./ShopFilter";

export default function ShopGrid() {
  const products = [
    { name: "Fairway to Heaven", price: "$55" },
    { name: "Grip It & Rip It", price: "$55" },
    { name: "Par Tee Time", price: "$55" },
    { name: "Shank You Very Much", price: "$55" },
    { name: "Caddie Up", price: "$55" },
    { name: "Tee'd Off", price: "$55" },
    { name: "Birdies & Brews", price: "$55" },
    { name: "Born to Bogey", price: "$55" },
    { name: "Swing State Champion", price: "$55" },
  ];

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
            <ShopFilter />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {products.map((product, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-square mb-3 bg-[#D9D9D9]/30 rounded-md overflow-hidden">
              <Image
                src="/webm/birdeye.webp"
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  );
} 