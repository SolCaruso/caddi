import { Container } from "@/components/ui/container"
import BuildYourOwnClient from "@/components/pages/build/BuildYourOwnClient"
import { CartProvider } from "@/lib/cart"

export default function BuildYourOwnPage() {
  // Available wood types (you can expand this list)
  const woodTypes = [
    {
      id: 'birds-eye-maple',
      name: 'Birds Eye Maple',
      texture: '/textures/birds-eye-maple.jpg',
      price: 149.99,
      description: 'Premium birds eye maple with distinctive swirled grain pattern'
    },
    // You can add more wood types here as textures become available
    {
      id: 'cherry',
      name: 'Cherry Wood',
      texture: '/textures/cherry-wood.jpg',
      price: 139.99,
      description: 'Rich cherry wood with warm reddish tones'
    },
    {
      id: 'walnut',
      name: 'Black Walnut',
      texture: '/textures/walnut-wood.jpg',
      price: 159.99,
      description: 'Luxurious black walnut with deep chocolate brown color'
    }
  ]

    return (
    <main className="bg-white">
      <Container className="mx-auto px-4 3xl:!max-w-8xl">
        <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
          <CartProvider>
            <BuildYourOwnClient
              modelPath="/glb/divot-tool.glb"
              woodTypes={woodTypes}
            />
          </CartProvider>
        </div>
      </Container>
    </main>
  )
} 