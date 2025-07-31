"use client"

import { Container } from "@/components/ui/container"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

const carouselImages = [
  {
    src: "/webp/app-1.webp",
    alt: "Lie Selection"
  },
  {
    src: "/webp/app-2.webp",
    alt: "Distance Calculator"
  },
  {
    src: "/webp/app-1.webp",
    alt: "GPS Map View"
  },
  {
    src: "/webp/app-2.webp",
    alt: "Shot Recommendation"
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
  const extendedImages = [...carouselImages, ...carouselImages, ...carouselImages]

  const getSlideOpacity = (index: number, currentIndex: number) => {
    const totalSlides = extendedImages.length;
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
    <section className="w-full pt-22 pb-42 bg-white">
      <Container>
        <div className="mx-auto w-full">
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8 uppercase text-center">
            Personalized Shot Guidance
          </h2>
          <p className="text-black/50 text-center mb-12 max-w-2xl mx-auto">
            Your personal golf caddie, offering real-time club and shot recommendations based on GPS, wind, slope, and lie—so you can play smarter and more confidently.
          </p>
        </div>

        <div className="w-full max-w-8xl mx-auto relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex justify-center">
            <div
              ref={emblaRef}
              className="overflow-x-hidden w-full h-[800px] max-w-8xl"
            >
            <div className="flex ml-[380px]">
              {extendedImages.map((image, index) => (
                <div key={`${image.alt}-${index}`} className="min-w-0 shrink-0 grow-0 basis-[400px] flex items-center justify-center h-[800px]">
                  <div className="px-[1px]">
                    <div className={`relative w-[370px] h-[590px] transition-all duration-300 ${getSlideOpacity(index, current)}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        priority={Math.abs(index - current) <= 2}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}