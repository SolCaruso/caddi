
import { Container } from "@/components/ui/container"
import { CheckoutSuccessClient } from "./CheckoutSuccessClient"
import { CartProvider } from "@/lib/cart"

export default function CheckoutSuccessPage() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <Container className="text-center">
        <CartProvider>
          <CheckoutSuccessClient />
        </CartProvider>
      </Container>
    </main>
  )
} 