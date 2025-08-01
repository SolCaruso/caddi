"use client"

import { useState, useRef } from "react"
import Image from "next/image"

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
        <h2 className="text-caddi-blue px-4 xs:px-6 text-2xl xs:text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10 transition-all duration-300 ease-in-out">
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
            className="relative w-[240px] h-[260px] xs:w-[400px] xs:h-[400px] sm:h-[460px] touch-pan-y transition-all duration-300 ease-in-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-contain transition-opacity duration-300 ease-in-out"
              priority
              draggable={false}
            />
          </div>
        </div>
        
        {/* Mobile: Content */}
        <div className="px-4 xs:px-6 transition-all duration-300 ease-in-out">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-caddi-blue transition-all duration-300 ease-in-out">{slide.content.title}</h3>
          <p className="text-black/50 mb-3 sm:mb-4 text-sm sm:text-base font-light transition-all duration-300 ease-in-out">{slide.content.description}</p>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 font-medium text-black/50 text-left text-sm sm:text-base transition-all duration-300 ease-in-out">
            {slide.content.details.map((item) => (
              <li key={item} className="font-medium text-black/50">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full max-w-6xl gap-10 items-start relative justify-between">
        {/* Left: Text & Selector */}
        <div className="flex-1 flex flex-col justify-center pt-20">
          <h2 className="text-caddi-blue text-4xl xl:text-5xl font-semibold mb-10">{slide.heading}</h2>
          
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
          <div className="mt-2">
            <h3 className="text-xl font-semibold mb-7 text-caddi-blue">{slide.content.title}</h3>
            <p className="text-black/50 mb-5 text-lg font-light">{slide.content.description}</p>
            <ul className="list-disc pl-10 space-y-2.5 font-medium text-black/50 text-lg">
              {slide.content.details.map((item) => (
                <li key={item} className="font-medium text-black/50">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right: Image */}
          <div className="relative w-[260px] h-[560px]">
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-contain"
              priority
              draggable={false}
            />
          </div>
      </div>
    </>
  )
} 