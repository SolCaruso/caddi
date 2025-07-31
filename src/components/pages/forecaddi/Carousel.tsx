"use client"

import { Container } from "@/components/ui/container"
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const carouselImages = [
  {
    src: "/webp/how-it-works.webp",
    alt: "How it Works",
    className: "opacity-50 scale-75"
  },
  {
    src: "/webp/environmental.webp",
    alt: "Environmental",
    className: "scale-100"
  },
  {
    src: "/webp/decision.webp",
    alt: "Decision Maker",
    className: "scale-100"
  },
  {
    src: "/webp/simplicity.webp",
    alt: "Simplicity",
    className: "opacity-50 scale-75"
  }
]

export default function Carousel() {
  return (
    <section className="w-full py-16 bg-white">
      <Container>
        <div className="mx-auto w-full">
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8 uppercase text-center">
            Personalized Shot Guidance
          </h2>
          <p className="text-black/50 text-center mb-12 max-w-2xl mx-auto">
            Your personal golf caddie, offering real-time club and shot recommendations based on GPS, wind, slope, and lie—so you can play smarter and more confidently.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <CarouselRoot
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <div className="flex justify-center">
                    <div className={`relative w-full max-w-[300px] h-[400px] transition-all duration-300 ${image.className}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </CarouselRoot>
        </div>
      </Container>
    </section>
  )
}
