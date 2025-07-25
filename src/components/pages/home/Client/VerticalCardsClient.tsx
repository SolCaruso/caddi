"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"

interface CardData {
  bg: string
  overlay: string
  label: string
}

interface VerticalCardsContentProps {
  cardData: CardData[]
}

// Separate component for the navigation that can use useCarousel
function CarouselNavigation() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, api } = useCarousel()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    const updatePagination = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setCount(api.scrollSnapList().length)
    }

    updatePagination()
    api.on("select", updatePagination)

    return () => {
      api.off("select", updatePagination)
    }
  }, [api])
  
  return (
    <Container>
      <div className="flex justify-start items-center gap-4 mt-16">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`w-10 h-10  rounded-full transition-colors duration-200 flex items-center justify-center ${
            canScrollPrev 
              ? 'bg-gray-200/50 hover:bg-gray-200 cursor-pointer' 
              : 'bg-gray-200/50'
          }`}
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke={canScrollPrev ? "#666" : "#ccc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <span className="text-gray-600 font-medium text-sm w-8 text-center">{current}/{count}</span>
        
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`w-10 h-10 rounded-full transition-colors duration-200 flex items-center justify-center ${
            canScrollNext 
              ? 'bg-gray-200/50 hover:bg-gray-200 cursor-pointer' 
              : 'bg-gray-200/50'
          }`}
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4L10 8L6 12" stroke={canScrollNext ? "#666" : "#ccc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </Container>
  )
}

export default function VerticalCardsContent({ cardData }: VerticalCardsContentProps) {
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
              idx === 0 ? "" : "pl-3"
            } basis-[95vw] sm:basis-[65vw] md:basis-[45vw] lg:basis-[320px] xl:basis-[380px] 2xl:basis-[580px] flex-shrink-0 aspect-[3/4] min-h-[240px] lg:min-h-[360px] xl:min-h-[450px] 3xl:min-h-[600px] max-w-[320px] xl:max-w-[380px] 3xl:max-w-[580px]`}
          >
            <div
              className="relative rounded-lg overflow-hidden group w-full h-full flex flex-col justify-end select-none cursor-pointer"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background with hover blur */}
              {card.bg.endsWith('.MOV') ? (
                <video
                  src={card.bg}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 select-none pointer-events-none"
                />
              ) : (
                <Image
                  src={card.bg || "/placeholder.svg"}
                  alt="Divot tool background"
                  fill
                  className="object-cover object-center scale-105 select-none pointer-events-none"
                  priority={idx < 2}
                  draggable={false}
                />
              )}

              {/* Black gradient overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

              {/* Hover black shader */}
              <div className={`absolute inset-0 z-[15] pointer-events-none bg-black/50 transition-opacity duration-300 ease-in-out ${
                hoveredCard === idx ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Label */}
              <div className="absolute top-4 left-4 z-20">
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
      
      {/* Navigation buttons */}
      <CarouselNavigation />
    </Carousel>
  )
}
