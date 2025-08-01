"use client"

import { Container } from "@/components/ui/container"
import {
  Accordion as AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTriggerLarge,
} from "@/components/ui/accordion"
import Image from "next/image"
import { useState } from "react"

interface DetailItem {
  bold: string
  text: string
}

type AccordionDetail = string | DetailItem

const accordionData: Array<{
  value: string
  title: string
  content: string
  image: string
  details: AccordionDetail[]
}> = [
  {
    value: "setting-distance",
    title: "Setting Your Distance",
    content: "There are two ways to input your distance to get accurate recommendations:",
    image: "/webp/app-3.webp",
    details: [
      { bold: "Manual Entry:", text: " Use number pad for rangefinder/GPS distances" },
      { bold: "GPS Pin Drop:", text: " Tap 'Pick on Map' and drop pin on target" },
      { bold: "Face your target:", text: " map aligns to your direction" },
      { bold: "", text: "Zoom and tap target location" },
      { bold: "", text: "Adjust GPS location if slightly off" },
      { bold: "", text: "Tap 'Enter' to submit distance" }
    ]
  },
  {
    value: "lie-adjustment",
    title: "Lie Adjustment",
    content: "Forecaddie assumes you're on a tee box or fairway unless you say otherwise. Choose the lie type that best describes your current position.",
    image: "/webp/app-3.webp",
    details: ["Light Rough", "Rough", "Heavy Rough", "Bunker", "Fescue", "Pine Straw"]
  },
  {
    value: "slope-adjustment",
    title: "Slope Adjustment",
    content: "Adjust the angle of the ground at your address position to account for slope impact on your shot:",
    image: "/webp/app-3.webp",
    details: ["Tap arrows for up/down slope adjustments", "Tap arrows for left/right slope adjustments", "Mix directions (e.g., 2 up and 1 right)", "Central cylinder shows slope direction visually"]
  },
  {
    value: "wind-adjustment",
    title: "Wind Adjustment",
    content: "Forecaddie assumes no wind unless specified. Use descriptive levels (1-7) to set wind direction and strength:",
    image: "/webp/app-3.webp",
    details: [
      { bold: "1", text: " Minimal" },
      { bold: "2", text: " Light" },
      { bold: "3", text: " Mild" },
      { bold: "4", text: " Moderate" },
      { bold: "5", text: " Strong" },
      { bold: "6", text: " Severe" },
      { bold: "7", text: " Extreme" },
      { bold: "Center dot = ", text: "You" },
      { bold: "Arrows = ", text: "Wind direction" }
    ]
  },
  {
    value: "recommendations",
    title: "Get Your Recommendations",
    content: "Once all inputs are set, tap 'Enter' to confirm and get your personalized club recommendations:",
    image: "/webp/app-3.webp",
    details: ["Tap 'Enter' to confirm inputs", "Get three club recommendations", "See swing notes for each club", "Adjusted distance calculations included"]
  }
]

export default function Accordion() {
    const [activeImage, setActiveImage] = useState("/webp/app-3.webp") // Default to lie-adjustment image

    const handleAccordionChange = (value: string) => {
        const selectedItem = accordionData.find(item => item.value === value)
        if (selectedItem) {
            setActiveImage(selectedItem.image)
        }
    }

    return (
        <section className="w-full flex justify-center flex-col pt-12 pb-30 ">
            <Container>
                <div className="mx-auto w-full max-w-7xl">
                    <h2 className="text-caddi-blue text-4xl font-semibold mb-12">
                        Meet Your Caddie.
                    </h2>
                </div>

                <div className="w-full rounded-2xl bg-caddi-light py-10 flex flex-col items-center mx-auto relative max-w-7xl">
                    {/* Mobile Layout */}
                    {/* <div className="w-full lg:hidden"> */}
                        {/* Mobile: Heading */}
                        {/* <h2 className="text-caddi-blue px-4 xs:px-6 text-2xl xs:text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10 transition-all duration-300 ease-in-out">
                            Meet Your Caddie.
                        </h2> */}
                        
                        {/* Mobile: Accordion */}
                        {/* <div className="px-4 xs:px-6 mb-8">
                            <AccordionRoot type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
                                {accordionData.map((item) => (
                                    <AccordionItem key={item.value} value={item.value} className="border-b border-gray-200">
                                        <AccordionTrigger className="text-left text-caddi-blue font-semibold py-4 hover:no-underline">
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-black/50">
                                            <p className="mb-3">{item.content}</p>
                                                                                            {item.details && (
                                                    <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                                                        {item.details.map((detail, index) => (
                                                            <li key={index} className="text-sm">• {detail}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </AccordionRoot>
                        </div> */}
                        
                        {/* Mobile: Image */}
                        {/* <div className="flex justify-center items-center">
                            <div className="relative w-[260px] h-[460px] transition-all duration-300 ease-in-out">
                                <Image
                                    src={activeImage}
                                    alt="Forecaddie Caddie"
                                    fill
                                    className="object-contain transition-opacity duration-300 ease-in-out"
                                    priority
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex w-full gap-10 items-start max-w-6xl justify-between">
                        {/* Left: Accordion */}
                        <div className="flex-1 flex flex-col max-w-xl">
                            
                            {/* Accordion */}
                            <div className="">
                                <AccordionRoot type="single" collapsible className="w-full" defaultValue="lie-adjustment" onValueChange={handleAccordionChange}>
                                    {accordionData.map((item) => (
                                        <AccordionItem key={item.value} value={item.value} className="border-b border-gray-200">
                                            <AccordionTriggerLarge className="text-left text-caddi-blue font-semibold py-6 hover:no-underline text-xl">
                                                {item.title}
                                            </AccordionTriggerLarge>
                                            <AccordionContent className="text-black/50">
                                            <p className="mb-8 text-lg max-w-lg">{item.content}</p>
                                                {item.details && (                                                                       
                                                    <ul className="grid grid-cols-2 gap-x-8">
                                                    {item.details.map((detail, index) => (
                                                        <li key={index} className="text-base mb-4">
                                                            {typeof detail === 'string' ? (
                                                                <>• {detail}</>
                                                            ) : (
                                                                <>
                                                                    <span className="font-semibold text-black/60">{detail.bold}</span>
                                                                    {detail.text}
                                                                </>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </AccordionRoot>
                            </div>
                        </div>
                        
                        {/* Right: Image */}
                        <div className="relative w-[300px] h-[640px]">
                            <Image
                                src={activeImage}
                                alt="Forecaddie Caddie"
                                fill
                                className="object-contain transition-all duration-300 ease-in-out"
                                priority
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}