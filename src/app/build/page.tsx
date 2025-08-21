import type { Metadata } from 'next'
import { Container } from "@/components/ui/container"
import BuildYourOwnClient from "@/components/pages/build/BuildYourOwnClient"
import { CartProvider } from "@/lib/cart"

export const metadata: Metadata = {
  title: "Build Your Own Custom Golf Divot Tool",
  description: "Design and customize your own premium golf divot tool. Choose from exotic hardwoods, add custom logos, and create a unique golf accessory tailored to your style.",
  keywords: ["custom golf divot tool", "build your own", "exotic hardwood", "custom logo", "personalized golf accessory", "golf divot tool design"],
  openGraph: {
    title: "Build Your Own Custom Golf Divot Tool",
    description: "Design and customize your own premium golf divot tool. Choose from exotic hardwoods, add custom logos, and create a unique golf accessory tailored to your style.",
    url: 'https://caddi.ai/build',
  },
  twitter: {
    title: "Build Your Own Custom Golf Divot Tool",
    description: "Design and customize your own premium golf divot tool. Choose from exotic hardwoods, add custom logos, and create a unique golf accessory tailored to your style.",
  },
}

interface BuildPageProps {
  searchParams: Promise<{
    wood?: string
    forecaddi?: string
    logoColor?: string
    model?: string
  }>
}

export default async function BuildYourOwnPage({ searchParams }: BuildPageProps) {
  const params = await searchParams
  
  return (
    <main className="">
      <Container className="mx-auto px-4 3xl:!max-w-8xl">
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
          <CartProvider>
            <BuildYourOwnClient
              modelPath={params.model || "/glb/divot-tool.obj"}
              initialSettings={params}
            />
          </CartProvider>
        </div>
      </Container>
    </main>
  )
} 