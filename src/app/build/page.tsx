import { Container } from "@/components/ui/container"
import BuildYourOwnClient from "@/components/pages/build/BuildYourOwnClient"
import { CartProvider } from "@/lib/cart"

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