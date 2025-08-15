"use client"

import { Container } from "@/components/ui/container"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

const carouselItems = [
  {
    src: "/webp/app-results.webp",
    alt: "Lie Selection",
    type: "image"
  },
  {
    src: "/webp/app-distance.webp",
    alt: "Distance Calculator",
    type: "image"
  },
  {
    video: {
      webm: "/webm/Iphone-hero.webm",
      mp4: "/mp4/Iphone-hero.mp4"
    },
    alt: "GPS Map View",
    type: "video"
  },
  {
    src: "/webp/app-wind-2.webp",
    alt: "Shot Recommendation",
    type: "image"
  }
]

export default function CarouselComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    slidesToScroll: 1,
    startIndex: 2,
    containScroll: "trimSnaps",
  })
  const [current, setCurrent] = useState(2)

  useEffect(() => {
    if (!emblaApi) return;
    const updateCurrent = () => setCurrent(emblaApi.selectedScrollSnap());
    updateCurrent();
    emblaApi.on("select", updateCurrent);
    return () => {
      emblaApi.off("select", updateCurrent);
    };
  }, [emblaApi]);

  // Create extended array for infinite effect
  const extendedItems = [...carouselItems, ...carouselItems, ...carouselItems]

  const getSlideOpacity = (index: number, currentIndex: number) => {
    const totalSlides = extendedItems.length;
    const adjustedCurrent = currentIndex % totalSlides;
    const adjustedIndex = index % totalSlides;
    const prevIndex = (adjustedCurrent - 1 + totalSlides) % totalSlides;

    if (adjustedIndex === adjustedCurrent || adjustedIndex === prevIndex) {
      return "opacity-100 scale-135 z-20";
    } else {
      return "opacity-20 scale-115";
    }
  }

  return (
    <section className="w-full pt-16 sm:pt-22 pb-24 sm:pb-32 3xl:pt-26 3xl:pb-42 ">
      <Container>
        <div className="mx-auto w-full">
          <h2 className="text-caddi-blue sm:text-4xl text-2xl font-semibold mb-6 text-center">
            Personalized Shot Guidance
          </h2>
          <p className="text-black/50 text-center mb-6 sm:mb-0 3xl:mb-12 max-w-2xl mx-auto">
            Your personal golf caddie, offering real-time club and shot recommendations based on GPS, wind, slope, and lie—so you can play smarter and more confidently.
          </p>
        </div>

        <div className="w-full max-w-8xl mx-auto relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-[#FCFCFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-[#FCFCFC] to-transparent z-10 pointer-events-none" />
          
          <div className="flex justify-center">
            <div
              ref={emblaRef}
              className="overflow-x-hidden w-full h-[400px] sm:h-[800px] max-w-8xl"
            >
            <div className="flex ml-[160px] sm:ml-[320px] 3xl:ml-[400px]">
              {extendedItems.map((item, index) => (
                <div key={`${item.alt}-${index}`} className="min-w-0 shrink-0 grow-0 basis-[160px] sm:basis-[320px] 3xl:basis-[400px] flex items-center justify-center h-[400px] sm:h-[800px]">
                  <div className="px-[1px]">
                    <div className={`relative w-[135px] h-[245px] sm:w-[270px] sm:h-[490px] 3xl:w-[370px] 3xl:h-[590px] transition-all cursor-grab active:cursor-grabbing duration-300 ${getSlideOpacity(index, current)}`}>
                      {item.type === "video" ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload={Math.abs(index - current) <= 2 ? "auto" : "metadata"} // Preload full video for nearby slides, metadata only for distant ones
                          className="absolute inset-0 w-full h-full object-contain"
                          draggable={false}
                        >
                          <source src={item.video?.webm} type="video/webm" />
                          <source src={item.video?.mp4} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={item.src!}
                          alt={item.alt}
                          fill
                          sizes="370px"
                          className="object-contain"
                          priority={Math.abs(index - current) <= 2}
                          draggable={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
          
          {/* Mobile: Pagination Dots */}
          <div className="absolute sm:bottom-6 left-1/2 transform -translate-x-1/2 flex lg:hidden justify-center items-center gap-2">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                className={`w-[9.25px] h-[9.25px] rounded-full transition-all duration-200 ${
                  ((current - 2 + carouselItems.length) % carouselItems.length) === idx 
                    ? "bg-[#D9D9D9] opacity-96" 
                    : "bg-[#D9D9D9] opacity-24"
                }`}
                onClick={() => emblaApi?.scrollTo(idx + 2)}
              />
            ))}
          </div>
          
          {/* Desktop: Pagination Dots */}
          <div className="hidden lg:flex absolute bottom-6 3xl:-bottom-6 left-1/2 transform -translate-x-1/2 justify-center items-center gap-2">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                className={`w-[11.25px] h-[11.25px] rounded-full transition-all duration-200 ${
                  ((current - 2 + carouselItems.length) % carouselItems.length) === idx 
                    ? "bg-[#D9D9D9] opacity-96" 
                    : "bg-[#D9D9D9] opacity-24"
                }`}
                onClick={() => emblaApi?.scrollTo(idx + 2)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}