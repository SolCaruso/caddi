import type { Metadata } from 'next'
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Caddi AI Inc. - Our Story",
  description: "Meet Simon, founder of Caddi AI Inc. Learn about our journey from a passion project to creating premium golf divot tools and the Forecaddie app to make golf easier and more enjoyable.",
  keywords: ["about caddi ai", "simon founder", "golf app development", "forecaddie app", "golf divot tools", "golf passion project"],
  openGraph: {
    title: "About Caddi AI Inc. - Our Story",
    description: "Meet Simon, founder of Caddi AI Inc. Learn about our journey from a passion project to creating premium golf divot tools and the Forecaddie app to make golf easier and more enjoyable.",
    url: 'https://caddi.ai/about',
  },
  twitter: {
    title: "About Caddi AI Inc. - Our Story",
    description: "Meet Simon, founder of Caddi AI Inc. Learn about our journey from a passion project to creating premium golf divot tools and the Forecaddie app to make golf easier and more enjoyable.",
  },
}

export default function AboutPage() {
  const stats = [
    { label: 'Passion fuels my creativity', value: 'Drive' },
    { label: 'Caddi built from scratch', value: 'History' },
    { label: 'Passion project to prototype', value: 'How it Started' },
    { label: 'Making golf easier, enjoyable', value: 'Mission' },
  ]

  return (
    <div className="pb-42">
      <main className="relative isolate">
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#d99a6d] opacity-25"
          />
        </div>

        {/* Header section */}
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-30">
            <h1 className="xs:text-5xl text-4xl font-semibold text-caddi-blue sm:text-6xl">About Caddi AI Inc.</h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              My goal is to make golf easier and more enjoyable by giving every golfer <span className='hidden md:inline'>the confidence and clarity of having </span> a personal caddie by their side.
            </p>
          </div>
        </div>

        {/* Image section - Mobile first */}
        <div className="md:hidden xl:mx-auto xl:max-w-7xl xl:px-8 pt-18">
          <Image
            alt="Simon, founder of Caddi AI"
            src="/webp/zolas-59.webp"
            width={800}
            height={600}
            className="aspect-[9/4] w-full object-cover outline-1 -outline-offset-1 outline-black/5"
          />
        </div>

        {/* Stat section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-600 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>
                  I&apos;m Simon, the founder of Caddi AI and the creative mind behind its flagship product, Forecaddie—a fresh take on golf GPS apps. Born out of pure passion and creativity, this project has quickly become my life&apos;s work. Everything you see here has been imagined, designed, and built by me, and I&apos;m just getting started.
                </p>
                <p className="mt-8">
                  My journey began in April 2024, in my parents&apos; basement in Ottawa, Canada, with nothing but a vision and determination. Currently, Caddi AI operates as a one-man army, and to fund the app&apos;s ongoing development, I personally create all apparel and divot tools to order. The incredible support I&apos;ve received along the way fuels my passion, and I&apos;m deeply grateful to everyone who&apos;s become part of this adventure.
                </p>
              </div>
              <div>
                <p>
                  It all started with a simple challenge: golf is notoriously hard, with constantly changing conditions like lie, slope, and wind making every shot a unique puzzle. Remembering all the intricate rules and adapting to shifting variables was a constant struggle. Determined to solve this problem, I taught myself to code, built a prototype, and launched Forecaddie within a year.
                </p>
                <p className="mt-8">
                  My mission remains straightforward: I aim to simplify the complexities of golf, freeing golfers&apos; minds and giving them the confidence to swing better and enjoy the game more—just like having a real golf caddie at your side.
                </p>
              </div>
            </div>
            <dl className="mt-16 grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4 hidden md:grid">
              {stats.map((stat, statIdx) => (
                <div key={statIdx} className="flex flex-col-reverse gap-y-3 border-l border-gray-200 pl-6">
                  <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Image section - Desktop */}
        <div className="hidden md:block mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <Image
            alt="Simon, founder of Caddi AI"
            src="/jpg/zolas-59.jpg"
            width={800}
            height={600}
            className="aspect-[9/4] w-full object-cover outline-1 -outline-offset-1 outline-black/5 xl:rounded-3xl"
          />
        </div>
      </main>
    </div>
  )
}
