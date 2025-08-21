import type { Metadata } from 'next'
import Carousel from "@/components/pages/forecaddi/Carousel"
import Info from "@/components/pages/forecaddi/Clubs"
import Accordion from "@/components/pages/forecaddi/Accordion"
import Customize from "@/components/pages/forecaddi/Customize"
import Explore from "@/components/pages/forecaddi/Explore"
import ScrollHandler from "@/components/pages/forecaddi/ScrollHandler"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Forecaddie App - Golf Course Management & Scoring",
  description: "Download the Forecaddie app for advanced golf course management, real-time scoring, course information, and GPS navigation. Your personal caddie in your pocket.",
  keywords: ["forecaddie app", "golf app", "golf course management", "golf scoring", "golf gps", "golf caddie app", "golf course information"],
  openGraph: {
    title: "Forecaddie App - Golf Course Management & Scoring",
    description: "Download the Forecaddie app for advanced golf course management, real-time scoring, course information, and GPS navigation. Your personal caddie in your pocket.",
    url: 'https://caddi.ai/forecaddi',
  },
  twitter: {
    title: "Forecaddie App - Golf Course Management & Scoring",
    description: "Download the Forecaddie app for advanced golf course management, real-time scoring, course information, and GPS navigation. Your personal caddie in your pocket.",
  },
}

export default function Forecaddi() {
    return (
        <main className="flex-grow">
            <Suspense fallback={null}>
                <ScrollHandler />
            </Suspense>
            <h1 className="sr-only">Forecaddie Golf App - Your Personal Golf Caddie</h1>
            <Carousel />
            <Explore />
            <Info />
            <Accordion />
            <Customize />
        </main>
    )
}