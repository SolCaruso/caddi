"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const cardData = [
  {
    bg: "/webm/divot-bg.webp",
    overlay: "/webm/birdeye.webp",
    label: "BIRD'S EYE MAPLE",
  },
  {
    bg: "/webm/divot-bg-2.webp",
    overlay: "/webm/zebrawood.webp",
    label: "ZEBRAWOOD",
  },
]

export default function VerticalCards() {
  // Responsive slidesToScroll
  const [slidesToScroll, setSlidesToScroll] = useState(2)
  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setSlidesToScroll(1)
      } else {
        setSlidesToScroll(2)
      }
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const cards = Array.from({ length: 8 }, (_, i) => cardData[i % 2])

  return (
    <section className="w-full py-12 mb-20">
      <div className="mx-auto max-w-8xl w-full px-4">
        <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8">
          DIVOT TOOLS
        </h2>
      </div>
      <Carousel
        opts={{ align: "start", slidesToScroll }}
        className="w-full"
      >
        <CarouselContent
          className="-ml-0"
          style={{
            paddingLeft: "max(1rem, calc((100vw - 93rem) / 2 + 1rem))",
          }}
        >
          {cards.map((card, idx) => (
            <CarouselItem
              key={idx}
              className={`${idx === 0 ? "" : "pl-6"}  basis-[90vw] sm:basis-[60vw] md:basis-[40vw] lg:basis-[280px] xl:basis-[320px] 2xl:basis-[500px] flex-shrink-0 aspect-[3/4] min-h-[220px] lg:min-h-[320px] xl:min-h-[400px] 3xl:min-h-[550px] max-w-[280px] xl:max-w-[320px] 3xl:max-w-[550px]`}
            >
              <div className="relative rounded-lg overflow-hidden group w-full h-full flex flex-col justify-end select-none cursor-pointer">
                {/* Blurred background */}
                <Image
                  src={card.bg}
                  alt="Divot tool background"
                  fill
                  className="object-cover object-center blur-md scale-105 select-none pointer-events-none"
                  priority={idx < 2}
                  draggable={false}
                />
                {/* Hover overlay (now just above background, below overlay image) */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 z-10 pointer-events-none transition-all duration-200 ease-in-out-quad" />
                {/* Overlay image */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Image
                    src={card.overlay}
                    alt="Divot tool"
                    width={340}
                    height={340}
                    className="object-contain drop-shadow-xl select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
                {/* Label */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-white font-bold text-base drop-shadow-md uppercase tracking-wide">
                    {card.label}
                  </span>
                </div>
                {/* Plus icon */}
                <div className="absolute bottom-4 right-4 z-20">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white text-white text-2xl font-semibold hover:border-transparent bg-transparent group-hover:bg-caddi-brown group-hover:border-caddi-brown transition-all duration-200 ease-in-out-quad">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 5V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M5 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
          {/* Ghost item for right margin */}
          <CarouselItem
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none flex-shrink-0 basis-0 sm:basis-0 md:basis-0 lg:basis-[calc((100vw-93rem)/2+1rem)]"
          />
        </CarouselContent>
      </Carousel>
    </section>
  )
}