import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '@/lib/data'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// Helper function to calculate international shipping cost
function getInternationalShippingCost(subtotal: number, hasClothing: boolean, hasDivotTools: boolean): number {
  if (subtotal >= 200) {
    return 0 // Free shipping for orders over $200 (International)
  } else if (hasClothing) {
    return 14.99 // $14.99 if clothing is included (International)
  } else if (hasDivotTools) {
    return 9.99 // $9.99 for divot tools only (International)
  }
  return 0
}

// Helper function to get international shipping display name
function getInternationalShippingDisplayName(subtotal: number, hasClothing: boolean, hasDivotTools: boolean): string {
  const cost = getInternationalShippingCost(subtotal, hasClothing, hasDivotTools)
  return cost === 0 ? 'Free shipping (International)' : `Shipping - $${cost.toFixed(2)} (International)`
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  variantId?: number
  color?: string
  size?: string
  customBuildData?: {
    woodType: string
    showForecaddiLogo: boolean
    logoColor: 'black' | 'white' | 'neutral'
    customLogoFile?: File
    modelPath: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Calculate shipping cost based on cart contents
    const subtotal = items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
    let shippingCost = 0
    
    const hasClothing = items.some((item: CartItem) => {
      const product = getProductById(item.id)
      return product && (product.category_id === 1 || product.category_id === 2) // T-Shirt or Hoodie
    })
    const hasDivotTools = items.some((item: CartItem) => {
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

    // Create line items for Stripe
    const lineItems = items.map((item: CartItem) => {
      const metadata: Record<string, string> = {
        productId: item.id.toString(),
        variantId: item.variantId?.toString() || '',
        color: item.color || '',
        size: item.size || '',
      }
      
      // Add custom build data if present
      if (item.customBuildData) {
        metadata.customBuildData = JSON.stringify(item.customBuildData)
      }
      
      // Convert relative image URLs to absolute URLs for Stripe
      let imageUrl = item.image
      if (imageUrl.startsWith('/')) {
        imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`
      }
      
      return {
        price_data: {
          currency: 'cad',
          product_data: {
            name: item.name,
            images: [imageUrl],
            metadata,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }
    })

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'], // Canada and US for now, can expand
      },
      // Explicitly collect customer details including address
      customer_creation: 'always',
      shipping_options: [
        // Canadian shipping rates
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingCost * 100), // Convert to cents
              currency: 'cad',
            },
            display_name: shippingCost === 0 ? 'Free shipping (Canada)' : `Shipping - $${shippingCost.toFixed(2)} (Canada)`,
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
            tax_behavior: 'exclusive',
            metadata: {
              country: 'CA',
            },
          },
        },
        // International shipping rates
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(getInternationalShippingCost(subtotal, hasClothing, hasDivotTools) * 100), // Convert to cents
              currency: 'cad',
            },
            display_name: getInternationalShippingDisplayName(subtotal, hasClothing, hasDivotTools),
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 7,
              },
              maximum: {
                unit: 'business_day',
                value: 14,
              },
            },
            tax_behavior: 'exclusive',
            metadata: {
              country: 'INT',
            },
          },
        },
      ],
      metadata: {
        // Add any additional metadata you want to track
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 