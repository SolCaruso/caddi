import type { Metadata } from 'next'
import { Container } from "@/components/ui/container"
import CartPageClient from "@/components/pages/cart/CartPageClient"
import { CartProvider } from "@/lib/cart"

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your golf divot tools and accessories. Complete your purchase of premium golf equipment and apparel.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Shopping Cart",
    description: "Review your golf divot tools and accessories. Complete your purchase of premium golf equipment and apparel.",
    url: 'https://caddi.ai/cart',
  },
}

export default function CartPage() {
  return (
    <main className="flex-1 ">
      <Container className="mx-auto px-4 3xl:!max-w-8xl">
        <CartProvider>
          <CartPageClient />
        </CartProvider>
      </Container>
    </main>
  )
} 