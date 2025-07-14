"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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
    <section className="w-full py-12 mb-12">
      <Container>
        <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8">DIVOT TOOLS</h2>
      </Container>
      
      <Carousel opts={{ align: "start", slidesToScroll }} className="w-full">
        <CarouselContent
          className="-ml-0"
          style={{
            paddingLeft: "max(1rem, calc((100vw - 92rem) / 2 + 1rem))",
          }}
        >
          {cards.map((card, idx) => (
            <CarouselItem
              key={idx}
              className={`${
                idx === 0 ? "" : "pl-6"
              } basis-[90vw] sm:basis-[60vw] md:basis-[40vw] lg:basis-[280px] xl:basis-[320px] 2xl:basis-[500px] flex-shrink-0 aspect-[3/4] min-h-[220px] lg:min-h-[320px] xl:min-h-[400px] 3xl:min-h-[550px] max-w-[280px] xl:max-w-[320px] 3xl:max-w-[550px]`}
            >
              <div
                className="relative rounded-lg overflow-hidden group w-full h-full flex flex-col justify-end select-none cursor-pointer"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Blurred background */}
                <Image
                  src={card.bg || "/placeholder.svg"}
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
                    src={card.overlay || "/placeholder.svg"}
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

                {/* Plus icon and SEE MORE */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <AnimatePresence>
                    {hoveredCard === idx && (
                      <motion.span
                        key="see-more"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.22, ease: [0.55, 0.085, 0.68, 0.53] }}
                        className="font-proxima-nova-extra-condensed text-white mr-1 font-extrabold text-sm 3xl:text-base"
                      >
                        LEARN MORE
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="inline-flex items-center justify-center w-7 h-7 3xl:w-8 3xl:h-8 rounded-full border border-white text-white text-2xl font-semibold bg-transparent group-hover:bg-caddi-brown group-hover:border-caddi-brown"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredCard === idx ? [1, 0.97, 1.12] : [1, 1.02, 1],
                      transition:
                        hoveredCard === idx
                          ? {
                              duration: 0.3,
                              times: [0, 0.3, 1],
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }
                          : {
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1.4,
                              ease: "easeInOut",
                              repeatDelay: 0.8,
                            },
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 5V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </div>
              </div>
            </CarouselItem>
          ))}

          {/* Ghost item for right margin */}
          <CarouselItem
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none flex-shrink-0 basis-0 sm:basis-0 md:basis-0 lg:basis-[calc((100vw-90rem)/2+1rem)]"
          />
        </CarouselContent>
      </Carousel>
    </section>
  )
}
