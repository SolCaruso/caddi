import { Check, PenTool, Trophy, Trees, Warehouse } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'
import ContinuousCarousel from '@/components/ui/continuous-carousel'

export const metadata: Metadata = {
  title: 'Custom Work & Wholesale',
  description: 'Custom hardwood divot tools, tournament trophies, pro shop accents, and wholesale products. Handcrafted with precision and sustainability for golf courses and events.',
  keywords: ["custom golf divot tools", "wholesale golf accessories", "tournament trophies", "pro shop merchandise", "corporate golf gifts", "custom golf accessories"],
  openGraph: {
    title: 'Custom Work & Wholesale',
    description: 'Custom hardwood divot tools, tournament trophies, pro shop accents, and wholesale products. Handcrafted with precision and sustainability for golf courses and events.',
    url: 'https://caddi.ai/custom-work',
  },
  twitter: {
    title: 'Custom Work & Wholesale',
    description: 'Custom hardwood divot tools, tournament trophies, pro shop accents, and wholesale products. Handcrafted with precision and sustainability for golf courses and events.',
  },
}

const includedFeatures = [
  'Tournament trophies',
  'Proshop Accents',
  'Custom accessories',
  'Laser-cut precision',
  '100% natural materials',
  'Corporate gift options',
]

export default function CustomWorkPage() {
  return (
    <main className="py-24 sm:py-32 flex-1">

      {/* Background */}
      <div
          aria-hidden="true"
          className="absolute inset-x-0 top-64 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-[1108/632] w-[79.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#d99a6d] opacity-25"
          />
        </div>
        
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-pretty text-5xl font-semibold tracking-tight text-caddi-blue sm:text-balance sm:text-6xl">
            Custom Works & Wholesale
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Crafted for quality and sustainability, our hardwood divot tools are laser-cut for precision and hand-finished with 100% natural beeswax. Each tool is strong, biodegradable, and ALL uniquely grained.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-semibold tracking-tight text-gray-900">Perfect for souvenirs, pro shops, corporate gifts, or tournament giveaways</h3>
            <p className="mt-6 text-base/7 text-gray-600">
              Our custom hardwood divot tools are designed to meet your specific needs. Whether you're looking for tournament trophies, pro shop merchandise, or corporate gifts, we create high-quality, sustainable products that stand out.
            </p>
            <div className="mt-10 lg:flex items-center gap-x-4 hidden">
              <h4 className="flex-none text-sm/6 font-semibold text-caddi-blue">What we offer</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul role="list" className="mt-8 hidden lg:grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-caddi-blue" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-gray-50/50 backdrop-blur-xl py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Custom Quote</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">Contact Us</span>
                </p>
                <p className="mt-2 text-sm/6 font-semibold tracking-wide text-gray-600">for pricing</p>
                <Link
                  href="/contact"
                  className="mt-10 block w-full rounded-full bg-caddi-blue px-3 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-caddi-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caddi-blue"
                >
                  Inquire Now
                </Link>
                <p className="mt-6 text-xs/5 text-gray-600">
                  Let us know what you are looking for! (The more details you can provide, the better)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information Section */}
        <div className="mt-16 mx-auto max-w-7xl">
          <div className="bg-caddi-light/60 backdrop-blur-xl rounded-2xl p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Why Choose Our Custom Work?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
              <div className="flex items-center gap-8">
                <Trophy className="w-18 h-18 text-caddi-blue hidden lg:block" />
                <div>
                  <h4 className="font-semibold text-caddi-blue mb-2">Quality Craftsmanship</h4>
                  <p className="text-sm">Each piece is carefully crafted with attention to detail, ensuring the highest quality finish and durability.</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <Trees className="w-18 h-18 text-caddi-blue hidden lg:block" />
                <div>
                <h4 className="font-semibold text-caddi-blue mb-2">Sustainable Materials
                </h4>
                <p className="text-sm">We use 100% natural hardwood and beeswax, making our products both beautiful and environmentally friendly.</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <PenTool className="w-18 h-18 text-caddi-blue hidden lg:block" />
                <div>
                <h4 className="font-semibold text-caddi-blue mb-2">Custom Design</h4>
                <p className="text-sm">Work with us to create unique designs that perfectly match your brand, event, or personal style.</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <Warehouse className="w-18 h-18 text-caddi-blue hidden lg:block" />
                <div>
                <h4 className="font-semibold text-caddi-blue mb-2">Wholesale Pricing</h4>
                <p className="text-sm">Competitive wholesale pricing for bulk orders, perfect for pro shops, tournaments, and corporate events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom Work Carousel */}
        <div className="mt-16 lg:mt-28">
          <ContinuousCarousel
            images={[
              '/webp/custom/rs=w_1160,h_1320.webp',
              '/webp/custom/rs=w_1160,h_1434.webp',
              '/webp/custom/rs=w_1160,h_1467.webp',
              '/webp/custom/rs=w_1160,h_1508.webp',
              '/webp/custom/rs=w_1160,h_1547 (1).webp',
              '/webp/custom/rs=w_1160,h_1547.webp',
              '/webp/custom/rs=w_1160,h_1568.webp',
              '/webp/custom/rs=w_1160,h_1741.webp',
              '/webp/custom/rs=w_1160,h_1761.webp',
              '/webp/custom/rs=w_1160,h_646.webp',
              '/webp/custom/rs=w_1160,h_687.webp',
              '/webp/custom/rs=w_2320,h_1153 (1).webp',
              '/webp/custom/rs=w_2320,h_1586.webp',
              '/webp/custom/rs=w_2320,h_1740 (1).webp',
              '/webp/custom/rs=w_2320,h_1740 (2).webp',
              '/webp/custom/rs=w_2320,h_1740.webp',
              '/webp/custom/rs=w_2320,h_1760.webp',
              '/webp/custom/rs=w_2320,h_1772.webp',
              '/webp/custom/rs=w_2320,h_1797.webp',
              '/webp/custom/rs=w_2320,h_2056.webp',
              '/webp/custom/rs=w_2320,h_2337.webp',
              '/webp/custom/rs=w_2320,h_2421.webp',
              '/webp/custom/rs=w_984,h_1476 (1).webp',
              '/webp/custom/rs=w_984,h_1476 (2).webp',
              '/webp/custom/rs=w_984,h_1476.webp',
              '/webp/custom/rs=w_984,h_1483.webp'
            ]}
            speed={120}
          />
        </div>
      </div>
    </main>
  )
}
