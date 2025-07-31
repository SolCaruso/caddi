"use client"

import { Container } from "@/components/ui/container"
import {
  Accordion as AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { useState } from "react"

const accordionData = [
  {
    value: "setting-distance",
    title: "Setting Your Distance",
    content: "Enter the distance to your target using the calculator interface. This is the foundation for all your shot recommendations.",
    image: "/webp/how-it-works.webp",
    details: ["Use the calculator interface", "Enter precise distance", "Set your target", "Get accurate recommendations"]
  },
  {
    value: "lie-adjustment",
    title: "Lie Adjustment",
    content: "Forecaddie assumes you're on a tee box or fairway unless you say otherwise. Choose the lie type that best describes your current position.",
    image: "/webp/environmental.webp",
    details: ["Light Rough", "Rough", "Heavy Rough", "Bunker", "Fescue", "Pine Straw"]
  },
  {
    value: "slope-adjustment",
    title: "Slope Adjustment",
    content: "Account for elevation changes that affect your shot. Uphill shots require more club, downhill shots require less.",
    image: "/webp/decision.webp",
    details: ["Uphill adjustments", "Downhill adjustments", "Elevation changes", "Club selection impact"]
  },
  {
    value: "wind-adjustment",
    title: "Wind Adjustment",
    content: "Factor in wind speed and direction to adjust your club selection and shot strategy accordingly.",
    image: "/webp/simplicity.webp",
    details: ["Wind speed", "Wind direction", "Club adjustments", "Shot strategy"]
  },
  {
    value: "recommendations",
    title: "Get Your Recommendations",
    content: "Based on all your inputs, Forecaddie will provide personalized club and shot recommendations to help you make the best decision.",
    image: "/webp/how-it-works.webp",
    details: ["Personalized recommendations", "Club selection", "Shot guidance", "Confidence boosting"]
  }
]

export default function Accordion() {
    const [activeImage, setActiveImage] = useState("/webp/how-it-works.webp")

    const handleAccordionChange = (value: string) => {
        const selectedItem = accordionData.find(item => item.value === value)
        if (selectedItem) {
            setActiveImage(selectedItem.image)
        }
    }

    return (
        <section className="w-full flex justify-center flex-col pt-12 pb-30 bg-white">
            <Container>
                <div className="mx-auto w-full">
                    <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8 uppercase">
                        Meet Your Caddie.
                    </h2>
                </div>

                <div className="w-full rounded-lg bg-caddi-light pt-6 pb-16 xs:pt-12 xs:pb-20 sm:pt-18 sm:pb-16 sm:px-8 lg:px-12 flex flex-col items-center mx-auto relative">
                    {/* Mobile Layout */}
                    <div className="w-full lg:hidden">
                        {/* Mobile: Heading */}
                        <h2 className="text-caddi-blue px-4 xs:px-6 text-2xl xs:text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10 transition-all duration-300 ease-in-out">
                            Meet Your Caddie.
                        </h2>
                        
                        {/* Mobile: Accordion */}
                        <div className="px-4 xs:px-6 mb-8">
                            <AccordionRoot type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
                                {accordionData.map((item) => (
                                    <AccordionItem key={item.value} value={item.value} className="border-b border-gray-200">
                                        <AccordionTrigger className="text-left text-caddi-blue font-semibold py-4 hover:no-underline">
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-black/50">
                                            <p className="mb-3">{item.content}</p>
                                            {item.details && (
                                                <ul className="space-y-1">
                                                    {item.details.map((detail, index) => (
                                                        <li key={index} className="text-sm">• {detail}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </AccordionRoot>
                        </div>
                        
                        {/* Mobile: Image */}
                        <div className="flex justify-center items-center">
                            <div className="relative w-[240px] h-[260px] xs:w-[400px] xs:h-[400px] sm:h-[460px] transition-all duration-300 ease-in-out">
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
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex w-full gap-10 items-start relative">
                        {/* Left: Accordion */}
                        <div className="flex-1 flex flex-col justify-center xl:pl-8 max-w-xl">
                            <h2 className="text-caddi-blue text-4xl xl:text-5xl font-semibold mb-10">Meet Your Caddie.</h2>
                            
                            {/* Accordion */}
                            <div className="mb-10 xl:mb-12">
                                <AccordionRoot type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
                                    {accordionData.map((item) => (
                                        <AccordionItem key={item.value} value={item.value} className="border-b border-gray-200">
                                            <AccordionTrigger className="text-left text-caddi-blue font-semibold py-4 hover:no-underline text-lg">
                                                {item.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-black/50">
                                                <p className="mb-3">{item.content}</p>
                                                {item.details && (
                                                    <ul className="space-y-1">
                                                        {item.details.map((detail, index) => (
                                                            <li key={index} className="text-sm">• {detail}</li>
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
                        <div className="flex-1 flex justify-center items-center">
                            <div className="relative w-[340px] h-[480px] md:w-[400px] md:h-[560px] lg:w-[440px] lg:h-[400px] xl:w-[680px] xl:h-[640px]">
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
                </div>
            </Container>
        </section>
    )
}