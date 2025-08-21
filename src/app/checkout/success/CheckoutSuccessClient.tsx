'use client'

import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "@/lib/cart"

export function CheckoutSuccessClient() {
  const { clearCart } = useCart()
  
  useEffect(() => {
    const updateStock = async () => {
      try {
        // Get cart items from localStorage before clearing
        const cartItems = localStorage.getItem('cart')
        if (cartItems) {
          const items = JSON.parse(cartItems)
          
          // Call the stock update API
          const response = await fetch('/api/update-stock', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
          })

          const result = await response.json()
          
          if (result.success) {
            console.log('Stock updated successfully:', result)
          } else {
            console.error('Some stock updates failed:', result)
          }
        }
      } catch (error) {
        console.error('Error updating stock:', error)
      } finally {
        // Clear the cart after attempting stock update
        clearCart() // This will update both the context state and localStorage
      }
    }

    updateStock()
  }, [clearCart])

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
