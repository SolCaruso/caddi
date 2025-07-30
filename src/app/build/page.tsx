import { Container } from "@/components/ui/container"
import BuildYourOwnClient from "@/components/pages/build/BuildYourOwnClient"
import { CartProvider } from "@/lib/cart"

export default function BuildYourOwnPage() {
  // Available wood types - using MTL materials from Dimension export
  const woodTypes = [
    {
      id: 'material1',
      name: 'Wood Option 1',
      texture: 'material1', // This will correspond to first MTL material
      price: 149.99,
      description: 'First wood texture from Dimension export'
    },
    {
      id: 'material2', 
      name: 'Wood Option 2',
      texture: 'material2', // This will correspond to second MTL material
      price: 159.99,
      description: 'Second wood texture from Dimension export'
    }
  ]

    return (
    <main className="bg-white">
      <Container className="mx-auto px-4 3xl:!max-w-8xl">
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
          <CartProvider>
            <BuildYourOwnClient
              modelPath="/glb/divot-tool.obj"
              woodTypes={woodTypes}
            />
          </CartProvider>
        </div>
      </Container>
    </main>
  )
} 