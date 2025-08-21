"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SlideContent {
  title: string
  description: string
  details: string[]
  detailsBold: number[]
}

interface Slide {
  key: string
  label: string
  image: string
  imageLarge: string
  heading: string
  subnav: string[]
  content: SlideContent
}

interface ForeCaddiContentProps {
  slides: Slide[]
}

export default function ForeCaddiContent({ slides }: ForeCaddiContentProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const slide = slides[activeIdx]
  
  // Touch/swipe handling
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsSwiping(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return
    
    const touchCurrentX = e.touches[0].clientX
    const touchCurrentY = e.touches[0].clientY
    const diffX = Math.abs(touchCurrentX - touchStartX.current)
    const diffY = Math.abs(touchCurrentY - touchStartY.current)
    
    // Only consider it a horizontal swipe if horizontal movement is greater than vertical
    if (diffX > diffY && diffX > 10) {
      setIsSwiping(true)
      e.preventDefault() // Prevent scrolling
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !isSwiping) {
      touchStartX.current = null
      touchStartY.current = null
      setIsSwiping(false)
      return
    }

    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX.current - touchEndX
    const minSwipeDistance = 50

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0 && activeIdx < slides.length - 1) {
        // Swipe left - go to next slide
        setActiveIdx(activeIdx + 1)
      } else if (diffX < 0 && activeIdx > 0) {
        // Swipe right - go to previous slide
        setActiveIdx(activeIdx - 1)
      }
    }

    touchStartX.current = null
    touchStartY.current = null
    setIsSwiping(false)
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="w-full lg:hidden">
        {/* Mobile: Heading */}
        <h2 className="text-caddi-blue px-4 xs:px-6 text-2xl xs:text-3xl sm:text-4xl font-semibold mb-10 transition-all duration-300 ease-in-out">
          {slide.heading}
        </h2>
        
        {/* Mobile: Selector Nav */}
        <div className="flex xs:gap-1 bg-caddi-dark rounded-full p-1 2sm:p-2 w-fit mx-auto 2sm:mx-6 overflow-x-auto">
          {slide.subnav.map((label, idx) => (
            <button
              key={label}
              className={`rounded-full px-2 2xs:px-2.5 xs:px-3 2sm:px-3.5 md:px-4 py-1.5 xs:py-1.5 2sm:py-1.75 md:py-2 font-semibold transition-all text-nowrap cursor-pointer text-[9.76px] xs:text-[11px] 2sm:text-sm md:text-base ${
                activeIdx === idx 
                  ? "bg-caddi-blue text-white" 
                  : "text-caddi-blue"
              }`}
              onClick={() => setActiveIdx(idx)}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* Mobile: Image */}
        <div className="flex justify-center items-center">
          <div 
            className="relative w-[240px] h-[260px] xs:w-[400px] xs:h-[400px] sm:h-[460px] sm:w-[500px] touch-pan-y transition-all duration-300 ease-in-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Regular image for screens below 2200px */}
            <Image
              src={slide.image}
              alt={`${slide.label} - ${slide.heading}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-opacity duration-300 ease-in-out min-[2200px]:hidden"
              priority
              draggable={false}
            />
            {/* Large image for 2200px+ screens */}
            <Image
              src={slide.imageLarge}
              alt={`${slide.label} - ${slide.heading} (large view)`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-opacity duration-300 ease-in-out hidden min-[2200px]:block"
              priority
              draggable={false}
            />
          </div>
        </div>
        
        {/* Mobile: Content */}
        <div className="px-4 xs:px-6 transition-all duration-300 ease-in-out">
          <h3 className="text-base sm:text-lg font-semibold mb-6 text-caddi-blue transition-all duration-300 ease-in-out">{slide.content.title}</h3>
          <p className="text-black/50 mb-4 text-sm sm:text-base font-light transition-all duration-300 ease-in-out">{slide.content.description}</p>
          <ul className="list-disc pl-4 sm:pl-5 space-y-2 font-medium text-black/50 text-left text-sm sm:text-base transition-all duration-300 ease-in-out">
            {slide.content.details.map((item) => (
              <li key={item} className="font-medium text-black/50">
                {item}
              </li>
            ))}
          </ul>
          
          {/* Learn More Button */}
          <div className="mt-12 2sm:mt-16">
            <Button asChild className="bg-[#F5F5F7] text-lg border border-caddi-blue text-caddi-black font-medium py-7 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer w-full mb-6 2sm:mb-12">
              <Link href="/forecaddi">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile: Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              className={`w-[9.25px] h-[9.25px] rounded-full transition-all duration-200 ${
                activeIdx === idx 
                  ? "bg-[#D9D9D9] opacity-96" 
                  : "bg-[#D9D9D9] opacity-24"
              }`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to ${slide.label} section`}
              aria-current={activeIdx === idx ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full gap-10 items-start relative pb-20 3xl:py-18">
        {/* Left: Text & Selector */}
        <div className="flex-1 flex flex-col justify-center xl:pl-8 max-w-xl 3xl:max-w-3xl">
          <h2 className="text-caddi-blue text-4xl xl:text-5xl 3xl:text-6xl font-semibold mb-10 lg:mb-12 3xl:mb-16">{slide.heading}</h2>
          
          {/* Selector Nav */}
          <div className="flex gap-1 xl:gap-2 mb-10 xl:mb-12 bg-caddi-dark rounded-full p-2 xl:p-2 w-fit">
            {slide.subnav.map((label, idx) => (
              <button
                key={label}
                className={`rounded-full px-4 xl:px-5 py-2 xl:py-2 font-semibold transition-all text-nowrap cursor-pointer text-sm xl:text-base ${
                  activeIdx === idx 
                    ? "bg-caddi-blue text-white" 
                    : "text-caddi-blue"
                }`}
                onClick={() => setActiveIdx(idx)}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="mt-2 lg:mt-4 3xl:mt-10">
            <h3 className="text-lg 3xl:text-3xl font-semibold mb-2 lg:mb-4 3xl:mb-10 text-caddi-blue">{slide.content.title}</h3>
            <p className="text-black/50 mb-4 lg:mb-6 3xl:mb-10 text-base lg:text-lg 3xl:text-xl font-light 3xl:max-w-xl">{slide.content.description}</p>
            <ul className="list-disc pl-5 space-y-1 lg:space-y-3 3xl:space-y-5 font-medium text-black/50">
              {slide.content.details.map((item) => (
                <li key={item} className="font-medium text-black/50 3xl:text-xl">
                  {item}
                </li>
              ))}
            </ul>
            
            {/* Learn More Button */}
            <div className="mt-22 3xl:mt-26">
              <Button asChild className="bg-[#F5F5F7] text-lg border border-caddi-blue text-caddi-black font-medium py-7 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer w-full max-w-md 3xl:text-xl 3xl:py-8 3xl:px-72">
                <Link href="/forecaddi">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center lg:justify-end 3xl:pr-10">
          <div className="relative w-[340px] h-[480px] md:w-[400px] md:h-[560px] lg:w-[440px] lg:h-[600px] xl:w-[680px] xl:h-[640px] 3xl:w-[1200px] 3xl:h-[800px]">
            {/* Regular image for screens below 2200px */}
            <Image
              src={slide.image}
              alt={`${slide.label} - ${slide.heading}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 680px"
              className="object-contain min-[2200px]:hidden"
              draggable={false}
              priority
            />
            {/* Large image for 2200px+ screens */}
            <Image
              src={slide.imageLarge}
              alt={`${slide.label} - ${slide.heading} (large view)`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 680px"
              className="object-contain hidden min-[2200px]:block"
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Desktop: Pagination Dots */}
      <div className="hidden lg:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 justify-center items-center gap-2">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            className={`w-[11.25px] h-[11.25px] rounded-full transition-all duration-200 ${
              activeIdx === idx 
                ? "bg-[#D9D9D9] opacity-96" 
                : "bg-[#D9D9D9] opacity-24"
            }`}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Go to ${slide.label} section`}
            aria-current={activeIdx === idx ? "true" : "false"}
          />
        ))}
      </div>
    </>
  )
} 