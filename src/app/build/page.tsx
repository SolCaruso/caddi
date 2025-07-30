import { Container } from "@/components/ui/container"
import BuildYourOwnClient from "@/components/pages/build/BuildYourOwnClient"
import { CartProvider } from "@/lib/cart"

export default function BuildYourOwnPage() {
  return (
    <main className="bg-white">
      <Container className="mx-auto px-4 3xl:!max-w-8xl">
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
          <CartProvider>
            <BuildYourOwnClient
              modelPath="/glb/divot-tool.obj"
            />
          </CartProvider>
        </div>
      </Container>
    </main>
  )
} 