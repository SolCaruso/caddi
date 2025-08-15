"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface SlideContent {
  title: string
  description: string
  details: string[]
  detailsBold: number[]
}

interface VideoSources {
  webm: string
  mp4: string
  playOnce?: boolean
}

interface Slide {
  key: string
  label: string
  image: string
  video?: VideoSources
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
  
  // Video playback state
  const [videoKey, setVideoKey] = useState<string>('')
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  
  // Touch/swipe handling
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  // Handle video playback when slide changes
  useEffect(() => {
    setVideoKey(`${slide.key}-${activeIdx}`) // Force re-render of video elements
    
    if (slide.video?.playOnce) {
      // Small delay to ensure video elements are rendered
      setTimeout(() => {
        const mobileVideo = document.querySelector(`[data-video="${slide.key}-mobile"]`) as HTMLVideoElement
        const desktopVideo = document.querySelector(`[data-video="${slide.key}-desktop"]`) as HTMLVideoElement
        
        if (mobileVideo) {
          mobileVideo.currentTime = 0 // Reset to beginning
          mobileVideo.play()
        }
        if (desktopVideo) {
          desktopVideo.currentTime = 0 // Reset to beginning
          desktopVideo.play()
        }
      }, 100)
    }
  }, [activeIdx, slide.key, slide.video?.playOnce])

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
      {/* Desktop Layout */}
      <div className="flex w-full max-w-6xl gap-10 items-start relative justify-between px-6 sm:px-12 md:px-0">
        {/* Left: Text & Selector */}
        <div className="flex-1 flex flex-col justify-center pt-4 sm:pt-10 lg:pt-20 md:pl-10 lg:pl-0">
          <h2 className="text-caddi-blue sm:text-5xl text-3xl font-semibold md:mb-10 mb-6">{slide.heading}</h2>
          
          {/* Selector Nav */}
          <div className="flex gap-1 md:mb-12 mb-8 bg-caddi-dark rounded-full p-2 w-fit">
            {slide.subnav.map((label, idx) => (
              <button
                key={label}
                className={`rounded-full px-5 py-2 font-semibold transition-all text-nowrap cursor-pointer text-sm xl:text-base ${
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
          <div className="md:mt-2 pb-6 md:pb-0">
            <h3 className="md:text-xl text-lg font-semibold mb-7 text-caddi-blue">{slide.content.title}</h3>
            <p className="text-black/50 mb-5 md:text-lg text-base font-light">{slide.content.description}</p>
            <ul className="list-disc md:pl-10 pl-6 space-y-2.5 font-medium text-black/50 md:text-lg text-base">
              {slide.content.details.map((item) => (
                <li key={item} className="font-medium text-black/50">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right: Image/Video */}
          <div className="hidden md:block relative w-[260px] h-[560px]">
            {slide.video ? (
              <video
                key={`${slide.key}-desktop-${videoKey}`}
                ref={desktopVideoRef}
                data-video={`${slide.key}-desktop`}
                className="w-full h-full object-contain"
                autoPlay={!slide.video.playOnce}
                loop={!slide.video.playOnce}
                muted
                playsInline
                preload="metadata"
              >
                <source src={slide.video.webm} type="video/webm" />
                <source src={slide.video.mp4} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
                draggable={false}
              />
            )}
          </div>
      </div>
    </>
  )
} 