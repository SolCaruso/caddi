'use client'

import Link from "next/link"
import { useEffect } from "react"

export function CheckoutSuccessClient() {
  useEffect(() => {
    // Clear the cart on successful checkout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
      // Also clear any cart state if you're using a state management solution
      // You might need to dispatch a clear cart action here
    }
  }, [])

  return (
    <div className="max-w-md mx-auto py-24">
      {/* Success Icon */}
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">
        Thank you for your order!
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Your order has been placed successfully. You&apos;ll receive a confirmation email shortly with your order details.
      </p>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link
          href="/shop"
          className="inline-block bg-caddi-blue text-white px-6 py-3 rounded-full font-medium hover:bg-caddi-blue/80 transition-colors"
        >
          Continue Shopping
        </Link>
        
        <div className="text-sm text-gray-500">
          <p>Questions about your order?</p>
          <Link href="/contact" className="text-caddi-blue hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
