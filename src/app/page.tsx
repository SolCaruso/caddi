import type { Metadata } from 'next'
import Hero from '@/components/header/Hero'
import HeroCards from '@/components/header/HeroCards'
import VerticalCards from '@/components/pages/home/VerticalCards'
import ForeCaddi from '@/components/pages/home/ForeCaddi'

export const metadata: Metadata = {
  title: "Caddi AI Inc. | Premium Golf Divot Tools & Forecaddie App",
  description: "Discover handcrafted golf divot tools made from exotic hardwoods. Download the Forecaddie app for advanced golf course management, scoring, and course information.",
  keywords: ["golf divot tools", "exotic hardwood", "golf accessories", "forecaddie app", "golf course management", "premium golf tools", "handcrafted golf accessories"],
  openGraph: {
    title: "Premium Golf Divot Tools & Forecaddie App",
    description: "Discover handcrafted golf divot tools made from exotic hardwoods. Download the Forecaddie app for advanced golf course management, scoring, and course information.",
    url: 'https://caddi.ai',
  },
  twitter: {
    title: "Premium Golf Divot Tools & Forecaddie App",
    description: "Discover handcrafted golf divot tools made from exotic hardwoods. Download the Forecaddie app for advanced golf course management, scoring, and course information.",
  },
}

export default function Home() {
  return (
    <main className='flex-1'>
      <Hero />
      <HeroCards />
      <VerticalCards />
      <ForeCaddi />
    </main>
  );
}
