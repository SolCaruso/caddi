import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Shop Golf Divot Tools & Apparel",
  description: "Browse our collection of handcrafted golf divot tools made from exotic hardwoods, premium golf apparel, and download the Forecaddie app for course management.",
  keywords: ["golf divot tools", "exotic hardwood", "golf apparel", "golf accessories", "premium golf tools", "handcrafted golf accessories"],
  openGraph: {
    title: "Shop Golf Divot Tools & Apparel",
    description: "Browse our collection of handcrafted golf divot tools made from exotic hardwoods, premium golf apparel, and download the Forecaddie app for course management.",
    url: 'https://caddi.ai/shop',
  },
  twitter: {
    title: "Shop Golf Divot Tools & Apparel",
    description: "Browse our collection of handcrafted golf divot tools made from exotic hardwoods, premium golf apparel, and download the Forecaddie app for course management.",
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
