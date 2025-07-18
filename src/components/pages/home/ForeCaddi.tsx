"use client"

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const slides = [
  {
    key: "how",
    label: "How it Works",
    image: "/webm/forecaddi.webp",
    heading: "GPS Precision Tracking.",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Understand the Technology",
      description:
        "Forecaddie combines advanced GPS tracking with your real-time input to deliver accurate, shot-by-shot recommendations.",
      details: [
        "Distance to your target",
        "Elevation changes (slope)",
        "Wind conditions",
        "Ball lie",
      ],
      detailsBold: [0],
    },
  },
  {
    key: "environmental",
    label: "Environmental",
    image: "/webm/forecaddi.webp",
    heading: "Master Every Variable",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Environmental Conditions",
      description: "Forecaddie adapts to live weather and terrain data so your shot recommendations stay razor-sharp.",
      details: [
        "Wind speed & direction",
        "Slope and elevation changes",
        "Temperature and weather impacts",
        "Ball lie and turf conditions",
      ],
      detailsBold: [],
    },
  },
  {
    key: "decision",
    label: "Decision Maker",
    image: "/webm/forecaddi.webp",
    heading: "Take the Guesswork Out",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Decision Maker",
      description: "Forecaddie acts as your personal caddie—distilling complex factors into clear club and shot guidance.",
      details: [
        "Personalized club recommendations",
        "Clear shot-type guidance (full, chip, pitch)",
        "Adjustments for wind and slope",
        "Confidence-boosting insights",
      ],
      detailsBold: [],
    },
  },
  {
    key: "simplicity",
    label: "Simplicity",
    image: "/webm/forecaddi.webp",
    heading: "One Swing at a Time",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Shot-by-Shot Simplicity",
      description: "Forecaddie's stateless design resets after each use so you can concentrate on your next shot without distractions.",
      details: [
        "Quick, one-step input",
        "Clean, intuitive interface",
        "Instant feedback on every shot",
        "Stateless resets after each recommendation",
      ],
      detailsBold: [],
    },
  },
];

export default function ForeCaddi() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slide = slides[activeIdx];

  return (
    <section className="w-full flex justify-center flex-col pt-12 pb-30 bg-white">
      <Container>
        <div className="mx-auto w-full">
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8 uppercase">Forecaddie Golf App</h2>
        </div>
        <div className="w-full rounded-lg md:rounded-xl bg-caddi-light pt-6 pb-16 xs:pt-12 xs:pb-20 sm:pt-18 sm:pb-24 sm:px-8 lg:px-12 flex flex-col items-center mx-auto relative">
          
          {/* Mobile Layout */}
          <div className="w-full lg:hidden">
            {/* Mobile: Heading */}
            <h2 className="text-caddi-blue px-4 xs:px-6 text-2xl xs:text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10">{slide.heading}</h2>
            
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
              <div className="relative w-[240px] h-[260px] xs:w-[400px] xs:h-[400px] sm:h-[460px]">
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
            
            {/* Mobile: Content */}
            <div className="px-4 xs:px-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-caddi-blue">{slide.content.title}</h3>
              <p className="text-black/50 mb-3 sm:mb-4 text-sm sm:text-base font-light">{slide.content.description}</p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 font-medium text-black/50 text-left text-sm sm:text-base">
                {slide.content.details.map((item) => (
                  <li key={item} className="font-medium text-black/50">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mobile: Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-[9.25px] h-[9.25px] rounded-full transition-all duration-200 ${
                    activeIdx === idx 
                      ? "bg-[#D9D9D9] opacity-96" 
                      : "bg-[#D9D9D9] opacity-24"
                  }`}
                  onClick={() => setActiveIdx(idx)}
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex w-full gap-10 items-start relative">
            {/* Left: Text & Selector */}
            <div className="flex-1 flex flex-col justify-center xl:pl-8 max-w-xl">
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
                <h3 className="text-lg font-semibold mb-2 text-caddi-blue">{slide.content.title}</h3>
                <p className="text-black/50 mb-4 text-base font-light">{slide.content.description}</p>
                <ul className="list-disc pl-5 space-y-1 font-medium text-black/50">
                  {slide.content.details.map((item) => (
                    <li key={item} className="font-medium text-black/50">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-[340px] h-[480px] md:w-[400px] md:h-[560px] lg:w-[440px] lg:h-[400px] xl:w-[680px] xl:h-[440px]">
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
          </div>
          
          {/* Desktop: Pagination Dots */}
          <div className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 justify-center items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-[11.25px] h-[11.25px] rounded-full transition-all duration-200 ${
                  activeIdx === idx 
                    ? "bg-[#D9D9D9] opacity-96" 
                    : "bg-[#D9D9D9] opacity-24"
                }`}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
