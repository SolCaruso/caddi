import { Check } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Work & Wholesale - Caddi',
  description: 'Custom hardwood divot tools, tournament trophies, pro shop accents, and wholesale products. Handcrafted with precision and sustainability.',
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
    <div className=" py-24 sm:py-32">
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
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm/6 font-semibold text-caddi-blue">What we offer</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-caddi-blue" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Custom Quote</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">Contact Us</span>
                </p>
                <p className="mt-2 text-sm/6 font-semibold tracking-wide text-gray-600">for pricing</p>
                <Link
                  href="/contact"
                  className="mt-10 block w-full rounded-md bg-caddi-blue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-caddi-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caddi-blue"
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
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Our Custom Work?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Craftsmanship</h4>
                <p className="text-sm">Each piece is carefully crafted with attention to detail, ensuring the highest quality finish and durability.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Sustainable Materials</h4>
                <p className="text-sm">We use 100% natural hardwood and beeswax, making our products both beautiful and environmentally friendly.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Custom Design</h4>
                <p className="text-sm">Work with us to create unique designs that perfectly match your brand, event, or personal style.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Wholesale Pricing</h4>
                <p className="text-sm">Competitive wholesale pricing for bulk orders, perfect for pro shops, tournaments, and corporate events.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
