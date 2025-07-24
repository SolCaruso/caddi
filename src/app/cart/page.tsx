import { Container } from "@/components/ui/container"
import CartPageClient from "@/components/pages/cart/CartPageClient"
import { CartProvider } from "@/lib/cart"

export default function CartPage() {
  return (
    <main className="flex-1 bg-white">
      <Container className="mx-auto px-4">
        <CartProvider>
          <CartPageClient />
        </CartProvider>
      </Container>
    </main>
  )
} 