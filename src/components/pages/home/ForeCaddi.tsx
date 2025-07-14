"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
    heading: "GPS Precision Tracking.",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Environmental Placeholder",
      description: "Replace this with environmental content.",
      details: ["Detail 1", "Detail 2", "Detail 3"],
      detailsBold: [],
    },
  },
  {
    key: "decision",
    label: "Decision Maker",
    image: "/webm/forecaddi.webp",
    heading: "GPS Precision Tracking.",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Decision Maker Placeholder",
      description: "Replace this with decision maker content.",
      details: ["Detail 1", "Detail 2", "Detail 3"],
      detailsBold: [],
    },
  },
  {
    key: "simplicity",
    label: "Simplicity",
    image: "/webm/forecaddi.webp",
    heading: "GPS Precision Tracking.",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Simplicity Placeholder",
      description: "Replace this with simplicity content.",
      details: ["Detail 1", "Detail 2", "Detail 3"],
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
        <div className="w-full rounded-xl bg-caddi-light py-12 flex flex-col md:flex-row gap-10 md:gap-0 items-center md:items-start mx-auto">
          {/* Left: Text & Selector */}
          <div className="flex-1 flex flex-col justify-center md:pl-8 max-w-xl">
            <h2 className="text-caddi-blue text-4xl md:text-5xl font-semibold mb-6 ">{slide.heading}</h2>
            {/* Selector Nav */}
            <div className="flex gap-2 mb-8 bg-caddi-dark rounded-full p-1 w-fit">
              {slide.subnav.map((label, idx) => (
                <Button
                  key={label}
                  variant={activeIdx === idx ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full px-5 font-semibold transition-all ${activeIdx === idx ? "bg-caddi-blue text-white" : "text-caddi-blue"}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  {label}
                </Button>
              ))}
            </div>
            {/* Content */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-2 text-caddi-blue">{slide.content.title}</h3>
              <p className="text-black/50 mb-4 text-base font-light">{slide.content.description}</p>
              <ul className="list-disc pl-5 space-y-1 font-medium text-black/50">
                {slide.content.details.map((item, i) => (
                  <li key={item} className="font-medium text-black/50">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-[340px] h-[480px] md:w-[400px] md:h-[560px] lg:w-[440px] lg:h-[600px] xl:w-[780px] xl:h-[540px]">
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
      </Container>
    </section>
  );
}
