import { loadStripe } from "@stripe/stripe-js"

// This ensures we only create one instance of Stripe
// and reuse it across the application
let stripePromise: ReturnType<typeof loadStripe>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}