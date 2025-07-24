"use client"

import { useCart } from "@/lib/cart"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getAllProducts, getProductById } from "@/lib/data"
import RelatedProducts from "@/components/pages/shop/RelatedProducts"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CartPageClient() {
  const { state, removeItem, updateQuantity, getTotalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCheckout = async () => {
    if (state.items.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
        }),
      })

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        })
        
        if (error) {
          console.error('Error redirecting to checkout:', error)
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get related products for "You Might Also Like" section
  const allProducts = getAllProducts()
  let relatedProducts = allProducts
    .filter(product => !state.items.some(item => item.id === product.id))
    .slice(0, 3)
  
  // If cart has clothing items, prioritize showing clothing items
  const hasClothingInCart = state.items.some(item => {
    const product = allProducts.find(p => p.id === item.id)
    return product && (product.category_id === 1 || product.category_id === 2)
  })
  
  if (hasClothingInCart) {
    // Show most recent clothing items that aren't in cart
    relatedProducts = allProducts
      .filter(product => 
        !state.items.some(item => item.id === product.id) && 
        (product.category_id === 1 || product.category_id === 2)
      )
      .slice(0, 3)
  }

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)

  // Calculate shipping and tax
  const subtotal = getTotalPrice()
  const taxRate = 0.13 // 13%
  const estimatedTax = subtotal * taxRate
  
  // Determine shipping cost based on cart contents
  let shippingCost = 0
  const hasClothing = state.items.some(item => {
    const product = getProductById(item.id)
    return product && (product.category_id === 1 || product.category_id === 2) // T-Shirt or Hoodie
  })
  const hasDivotTools = state.items.some(item => {
    const product = getProductById(item.id)
    return product && product.category_id === 3 // Divot Tool
  })
  
  if (subtotal >= 100) {
    shippingCost = 0 // Free shipping for orders over $100
  } else if (hasClothing) {
    shippingCost = 9.99 // $9.99 if clothing is included
  } else if (hasDivotTools) {
    shippingCost = 4.99 // $4.99 for divot tools only
  }
  
  const total = subtotal + shippingCost + estimatedTax

  return (
    <div className="pt-12 lg:pt-32 pb-23 lg:pb-44">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">
          Bag
        </h1>
      </div>
      {isClient && totalItems > 0 && (
        <div className="mb-8">
          <p className="text-lg text-black/50">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'} | ${subtotal.toFixed(2)}
          </p>
        </div>
      )}

      {!isClient ? (
        <div className="text-center py-16">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : state.items.length === 0 ? (
        /* Empty Cart */
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your bag is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to get started</p>
          <Link 
            href="/shop" 
            className="inline-block bg-caddi-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* Cart with Items */
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Bag Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {state.items.map((item, index) => (
                <div key={`${item.id}-${item.variantId || 'default'}-${index}`} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    {(() => {
                      const product = getProductById(item.id)
                      const hasVariants = item.variantId !== undefined
                      
                      if (hasVariants) {
                        // For variants, show: "Product Name - Category"
                        return (
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.name} - {product?.categories?.name}
                          </h3>
                        )
                      } else {
                        // For non-variants, show tag if available
                        const displayName = product?.tag ? `${product.tag} ${item.name}` : item.name
                        return (
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {displayName}
                          </h3>
                        )
                      }
                    })()}
                    {item.color && (
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                    )}
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                    {(() => {
                      const product = getProductById(item.id)
                      const hasVariants = item.variantId !== undefined
                      
                      if (product?.subtitle) {
                        return <p className="text-sm text-gray-500">{product.subtitle}</p>
                      } else if (!hasVariants && product?.tag && product?.categories?.name) {
                        // For non-variants with tags, show "Tag Category"
                        return <p className="text-sm text-gray-500">{product.tag} {product.categories.name}</p>
                      }
                      return null
                    })()}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.variantId, Math.max(1, item.quantity - 1))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id, item.variantId)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {shippingCost === 0 
                  ? "Free shipping on orders over $100" 
                  : `Shipping: $${shippingCost.toFixed(2)} - Arrives by Thu, Jun 26`
                }
              </p>
            </div>
          </div>

          {/* Summary Section - Right Side */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-caddi-blue mb-6">Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Shipping & Handling</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4 px-6 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* You Might Also Like Section */}
      {isClient && <RelatedProducts relatedProducts={relatedProducts} />}
    </div>
  )
} 