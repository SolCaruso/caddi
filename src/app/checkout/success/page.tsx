
import type { Metadata } from 'next'
import { Container } from "@/components/ui/container"
import { CheckoutSuccessClient } from "./CheckoutSuccessClient"
import { CartProvider } from "@/lib/cart"

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Thank you for your order! Your purchase has been confirmed and you will receive a confirmation email shortly.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Order Confirmation',
    description: 'Thank you for your order! Your purchase has been confirmed and you will receive a confirmation email shortly.',
    url: 'https://caddi.ai/checkout/success',
  },
}

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